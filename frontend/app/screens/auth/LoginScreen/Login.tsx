import React, { useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useAuth } from "@/app/context/AuthContext";
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, View, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import styles from "./Login.style";
import logo from "../../../assets/images/logo.png";
import { useTranslation } from 'react-i18next';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await login(username, password);
      navigation.navigate("home");
    } catch (err) {
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.loginContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>
              <Text style={styles.highlight}>{t('welcome')}</Text>Cafe-Dash
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
              label={t('username')}
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label={t('password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                loading={loading}
                disabled={loading}
              >
                {loading ? "Logging in..." : t('login-button')}
              </Button>

              <Button
                mode="contained"
                onPress={() => navigation.navigate("register")}
                style={styles.registerButton}
                labelStyle={styles.registerButtonLabel}
              >
                {t('sign-up')}
              </Button>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("forgotpassword")}>
              <Text>{t('forgot-password')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;
