// pushNotificationToken.ts
import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const usePushNotificationToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      let finalToken: string | null = null; // Explicitly type finalToken

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus === 'granted') {
          try {
            const { data } = await Notifications.getExpoPushTokenAsync();
            console.log("TOKEN: ", data);
            finalToken = data;
          } catch (e) {
            console.log("❌ Error getting push token", e);
          }
        } else {
          alert('Failed to get push token for push notification!');
          return null; // Explicitly return null when permission is denied
        }
      } else {
        alert('Must use physical device for Push Notifications');
        return null; // Explicitly return null when not on a device
      }

      return finalToken;
    };

    registerForPushNotificationsAsync().then(setToken);
  }, []);

  return token;
};

export default usePushNotificationToken;