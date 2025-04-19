import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import customAPI from "@/app/services/apiClient";
import styles from "./ResetPassword.style";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";
import { TextInput, Button } from "react-native-paper";

const ResetPassword = () => {
  const navigation = useNavigation();

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return null;
  };

  const handleReset = async () => {
    setMessage("");
    setError("");
    if (!token.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
      return;
    }
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await customAPI.post("/api/password/reset-password", {
        token,
        newPassword,
        confirmPassword,
      });
      setMessage(response.data);
    } catch (error: any) {
      const serverMessage =
        error?.response?.data?.message || error?.response?.data || null;

      if (serverMessage) {
        setError(serverMessage);
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <CommonHeader title="Reset Password" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Enter Reset Token and New Password</Text>

          <TextInput
          label="Reset Token"
          mode="outlined"
          style={styles.input}
          value={token}
          onChangeText={setToken}
        />
        <TextInput
          label="New Password"
          mode="outlined"
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          label="Confirm Password"
          mode="outlined"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button mode="contained" style={styles.button} onPress={handleReset}>
            Reset Password
          </Button>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
