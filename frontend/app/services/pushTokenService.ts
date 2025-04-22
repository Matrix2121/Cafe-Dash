import customAPI from "@/app/services/apiClient";
import { PushTokenUpdateRequest } from "../types/items";

export const sendPushToken = async (payload: PushTokenUpdateRequest) => {
  try {
    console.log("Sending push token to backend:", payload);
    const response = await customAPI.post("/api/users/update-token", payload);
    console.log("Push token updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending push token:", error);
    throw error;
  }
};