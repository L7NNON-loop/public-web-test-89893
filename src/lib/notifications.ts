import { initializeFCM } from './firebase';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    await initializeFCM();
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await initializeFCM();
      return true;
    }
  }

  return false;
};

export const sendNotification = (title: string, body: string, icon?: string) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: icon || "/favicon.ico",
      badge: "/favicon.ico",
    });
  }
};

export const getNotificationPermissionStatus = (): NotificationPermission => {
  if (!("Notification" in window)) {
    return "denied";
  }
  return Notification.permission;
};
