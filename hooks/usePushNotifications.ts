import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";

export interface PushNotificationState {
  expoPushToken?: string;
  notification?: Notifications.Notification;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: false,
  }),
});

export const usePushNotifications = (
  onNotificationResponse?: (response: Notifications.NotificationResponse) => void
): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  async function registerForPushNotificationsAsync() {
    let token: string | undefined;
    try {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          console.log("Failed to get push token for push notification");
          return;
        }

        const tokenResponse = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId,
        });
        token = tokenResponse.data;
      } else {
        console.log("Must be using a physical device for Push notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (error) {
      console.error("Error registering for push notifications:", error);
      return;
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
      })
      .catch((error) => {
        console.error("Unhandled error registering push notifications:", error);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        onNotificationResponse?.(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, [onNotificationResponse]);

  return {
    expoPushToken,
    notification,
  };
};