import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import styles from "./RegisterScreen.style";
import useRegister from "@/app/hooks/useRegister";
import logoSrc from "../../../assets/images/logo.png";

const RegisterScreen = () => {
  const {handleRegister, setUsername, setEmail, setPassword, username, email, password, loading, error, navigation} = useRegister();

  return (
    <ImageBackground
      source={require('../../../assets/images/login-background.jpg')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.registerContainer}>
            <Image source={logoSrc} style={styles.logo} />
            <Text style={styles.title}>
              <Text style={styles.highlight}>Create Your </Text>Account
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
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
              onPress={handleRegister}
              style={styles.registerButton}
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <Button
              mode="contained"
              onPress={() => navigation.navigate("LoginScreen")}
              style={styles.loginButton}
            >
              Back To Login
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;
