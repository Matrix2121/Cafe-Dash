import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { sendPushToken } from "@/app/services/pushTokenService";

export const registerPushToken = async (userId: number) => {
  if (!userId) {
    console.log("No user available, skipping push token registration.");
    return;
  }

  let token: string | undefined;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.warn("Push notification permissions not granted.");
      return;
    }

    const expoPushToken = await Notifications.getExpoPushTokenAsync();
    token = expoPushToken.data;
    console.log("Expo Push Token:", token);
  } else {
    console.warn("Must use physical device for push notifications");
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (token) {
    await sendPushToken({ userId, pushToken: token });
  }
};
