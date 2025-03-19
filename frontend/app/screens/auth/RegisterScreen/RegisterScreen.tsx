import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Navigation';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import CryptoJS from 'crypto-js';
import styles from "./RegisterScreen.style";

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sending data as per the new RegisterUserDTO structure:
        body: JSON.stringify({
          username: username,
          email: email,
          passwordHash: CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex),
          roles: [],
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }
      navigation.navigate("LoginScreen");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
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
              theme={{ colors: { primary: '#774936', background: '#CECECC' } }}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: '#774936', background: '#CECECC' } }}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: '#774936', background: '#CECECC' } }}
            />

            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              loading={loading}
              disabled={loading}
              theme={{ colors: { primary: '#774936' } }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <Button
              mode="contained"
              onPress={() => navigation.navigate("LoginScreen")}
              style={styles.loginButton}
              labelStyle={{ color: '#774936' }}
              theme={{ colors: { primary: '#774936' } }}
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
