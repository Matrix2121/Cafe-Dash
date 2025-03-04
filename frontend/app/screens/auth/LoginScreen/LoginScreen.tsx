import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Navigation';
import { useAuth } from '@/app/context/AuthContext';

import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, Pressable, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import styles from "./LoginScreen.style";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
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
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/login-background.jpg')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Pressable 
            style={styles.testButton}
            onPress={() => navigation.navigate("TestScreen")}
          >
            <Text style={styles.testButtonText}>Test Area</Text>
          </Pressable>

          <Image source={require('../../../../assets/images/logo.png')} style={styles.logo}/>
          <Text style={styles.title}>Welcome to Cafe-Dash</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            mode="outlined" 
            theme={{ colors: { primary: '#444444', background: '#CECECC' } }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined" 
            theme={{ colors: { primary: '#444444', background: '#CECECC' } }}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            loading={loading}
            disabled={loading}
            theme={{ colors: { primary: '#444444' } }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("RegisterScren")}
            style={styles.registerButton}
            labelStyle={{ color: '#444444' }} 
            theme={{ colors: { primary: '#444444' } }}
          >
            Sign Up
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
