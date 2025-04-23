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
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const { t } = useTranslation();

  const { register } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    setFormErrors({});
    setApiError('');

    const errors: { [key: string]: string } = {};

    if (!username.trim()) {
      errors.username = "Username is required.";
    } else if (username.trim().length < 6) {
      errors.username = "Username must be at least 6 characters.";
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Enter a valid email address.";
      }
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      navigation.navigate("home");
    } catch (err: any) {
      setApiError(err.message);
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
              <Text style={styles.highlight}>{t('create-account')}</Text>Account
            </Text>

            {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

            <TextInput
              label={t('username')}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setFormErrors(prev => ({ ...prev, username: '' }));
              }}
              style={styles.input}
              mode="outlined"
            />
            {formErrors.username && (
              <Text style={styles.errorText}>{formErrors.username}</Text>
            )}

            <TextInput
              label={t('email')}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setFormErrors(prev => ({ ...prev, email: '' }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
            />
            {formErrors.email && (
              <Text style={styles.errorText}>{formErrors.email}</Text>
            )}

            <TextInput
              label={t('password')}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setFormErrors(prev => ({ ...prev, password: '' }));
              }}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />
            {formErrors.password && (
              <Text style={styles.errorText}>{formErrors.password}</Text>
            )}

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.registerButton}
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Registering...' : t('register-button')}
              </Button>

              <Button
                mode="contained"
                onPress={() => navigation.navigate("login")}
                style={styles.loginButton}
              >
                {t('back-to-login')}
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Register;
