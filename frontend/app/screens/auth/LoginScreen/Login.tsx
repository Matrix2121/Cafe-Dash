import React, { useState, useEffect } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useAuth } from "@/app/context/AuthContext";
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, View, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import styles from "./Login.style";
import logo from "../../../assets/images/logo.png";
import usePushNotificationToken from "@/app/services/pushNotificationToken";
import customAPI from "@/app/services/apiClient";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const pushToken = usePushNotificationToken();
  const [isPushTokenReady, setIsPushTokenReady] = useState(false);

  useEffect(() => {
    if (pushToken) {
      setIsPushTokenReady(true);
    } else {
      setIsPushTokenReady(false); // Reset if token becomes null
    }
  }, [pushToken]);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await login(username, password);
      // Login was successful, now send push token if it's ready
      //to be revisioned
      if (isPushTokenReady && pushToken) {
        try {
          if (user?.id) {
            await customAPI.post('api/users/update-token', {
              userId: user.id,
              pushToken: pushToken,
            });
            console.log('Push token sent to server:', pushToken);
            navigation.navigate("home");
          } else {
            console.warn('User ID not found after login, cannot send push token.');
            navigation.navigate("home");
          }
        } catch (err) {
          console.error('Error sending push token:', err);
          Alert.alert('Error', 'Failed to register push notifications. You can still use the app.');
          navigation.navigate("home");
        }
      } else {
        console.log('Push token not yet available, or still loading.');
        navigation.navigate("home"); // Decide if you want to navigate even if token isn't ready
        // You could potentially add logic to retry sending the token later
      }
    } catch (err: any) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://iili.io/3IoPfjI.jpg" }}
      style={styles.backgroundImage}
    >
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.testButton}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "home",
                    params: {
                      screen: "Cafes",
                    },
                  },
                ],
              })
            );
          }}
        >
          <Image
            style={styles.testButton}
            source={require("@/app/assets/images/navigation.png")}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.loginContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>
              <Text style={styles.highlight}>Welcome to </Text>Cafe-Dash
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              loading={loading}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Button
              mode="contained"
              onPress={() => navigation.navigate("register")}
              style={styles.registerButton}
            >
              Sign Up
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;