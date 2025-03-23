import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { TextInput, Button, Text } from 'react-native-paper';
import styles from "./Register.style";
import { useAuth } from '@/app/context/AuthContext';
import logoSrc from "../../../assets/images/logo.png";
import loginBackground from "../../../assets/images/login-background.jpg";
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      await register(username, email, password);
      navigation.navigate("mainhub");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={loginBackground} style={styles.backgroundImage}>
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
              onPress={() => navigation.navigate("login")}
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

export default Register;
