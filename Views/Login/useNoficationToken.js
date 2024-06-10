import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

const useNotificationToken = () => {
  const [token, setToken] = useState('Initializing...');

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus.status;

        if (existingStatus.status !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
          setToken('Permissions requested');
        }

        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          setToken('Failed to get push token: Permissions not granted');
          return;
        }

        try {
          const tokenData = await Notifications.getExpoPushTokenAsync();
          setToken(tokenData.data); // Actualiza el estado con el token obtenido
        } catch (error) {
          console.error('Error retrieving push token:', error);
          setToken(error);
        }
      } else {
        alert('Must use physical device for Push Notifications');
        setToken('Failed to get push token: Not a physical device');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  return token;
};

export default useNotificationToken;

