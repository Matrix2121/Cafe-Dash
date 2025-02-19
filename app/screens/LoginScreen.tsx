import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigation';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
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

    setTimeout(() => {
      setLoading(false);
      console.log('Logging in with', email, password);
    }, 2000);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/login-background.jpg')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
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
            onPress={handleLogin}
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // Adjust the image to cover the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#444444',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444444',
    backgroundColor: '#CECECC',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#444444',
    padding: 5,
  },
  input: {
    width: '130%',
    marginBottom: 10,
    backgroundColor: '#CECECC',
  },
  loginButton: {
    marginTop: 30,
    width: '100%',
    backgroundColor: '#444444',
  },
  registerButton: {
    marginTop: 10,
    width: '100%',
    borderColor: '#444444',
    borderWidth: 2.5,
    backgroundColor: '#CECECC',
  },
  errorText: {
    color: '#444444',
    marginBottom: 10,
  },
});

export default LoginScreen;