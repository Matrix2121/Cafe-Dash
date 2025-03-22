import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { useAuth } from '@/app/context/AuthContext';

import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, Pressable, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import styles from "./Login.style";
import loginBackground from "../../../assets/images/login-background.jpg";
import logo from "../../../assets/images/logo.png";

const Login = () => {
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
      source={loginBackground}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Pressable 
            style={styles.testButton}
            onPress={() => navigation.navigate("test")}
          >
            <Text style={styles.testButtonText}>Test Area</Text>
          </Pressable>

          <View style={styles.loginContainer}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.title}><Text style={styles.highlight}>Welcome to </Text>Cafe-Dash</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
              onPress={handleLogin}
              style={styles.loginButton}
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
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
