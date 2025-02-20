import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigation';

const RegisterScreen = () => {

  interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]  = useState('');
  const [email, setEmail]        = useState('');
  const [phone, setPhone]        = useState('');
  const [errors, setErrors]      = useState<Errors>({});
  const [loading, setLoading]    = useState(false);

  const validate = () => {
    const newErrors: Errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Please enter your first name.';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Please enter your last name.';
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim() || !/^\d{10,}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number with at least 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    // Create the payload with registration data.
    const payload = {
      firstName,
      lastName,
      email,
      phone,
    };

    setLoading(true);

    try {
      // this does not work now
      // we will have api enpoint for this
      // and also we will store jwt in the client
      // jwt will be used for auth and storing roles and premissions of users
      const response = await fetch('http://api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Registration Failed', errorData.message || 'An error occurred.');
      } else {
        Alert.alert('Registration Successful', 'You can now log in.');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Registration Error', 'An error occurred while registering.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>

      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#774936', background: '#EDC4B3' } }}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#774936', background: '#EDC4B3' } }}
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#774936', background: '#EDC4B3' } }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}


      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#774936', background: '#EDC4B3' } }}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        loading={loading}
        disabled={loading}
        theme={{ colors: { primary: '#774936' } }}
      >
        Create account
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={[styles.button, { marginTop: 10 }]}
        theme={{ colors: { primary: '#774936' } }}
      >
        Go to Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDC4B3',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#774936',
  },
  input: {
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#EDC4B3',
  },
  button: {
    width: '90%',
    backgroundColor: '#774936',
  },
  errorText: {
    width: '90%',
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
