// src/screens/createCafeteria/CreateCafeteriaScreen.tsx
import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Navigation';

const CreateCafeteriaScreen = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleCreateCafeteria = async () => {
    if (!name || !brand || !location || !phoneNumber) {
      setError('Please fill in all fields.');
      return;
    }

    const cafeteriaData = {
      id: null,
      name,
      brand,
      location,
      rating: 0.0,
      countReview: 0,
      phoneNumber,
    };

    setLoading(true);
    setError('');
    try {
      // Replace with your actual backend URL
      const response = await fetch('http://localhost:8080/api/cafeterias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cafeteriaData)
      });
      if (response.ok) {
        navigation.goBack();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
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
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Cafeteria</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#444444', background: '#CECECC' } }}
            />
            <TextInput
              label="Brand"
              value={brand}
              onChangeText={setBrand}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#444444', background: '#CECECC' } }}
            />
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#444444', background: '#CECECC' } }}
            />
            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#444444', background: '#CECECC' } }}
            />

            <Button
              mode="contained"
              onPress={handleCreateCafeteria}
              loading={loading}
              disabled={loading}
              style={styles.createButton}
              theme={{ colors: { primary: '#444444' } }}
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
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
    paddingTop: 50,
  },
  formContainer: {
    backgroundColor: 'rgba(142,129,129,0.4)',
    width: 340,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "white",
    borderBottomColor: '#CECECC',
    borderBottomWidth: 3,
    padding: 5,
    textAlign: 'center',
  },
  input: {
    width: 300,
    marginBottom: 10,
    backgroundColor: '#CECECC',
  },
  createButton: {
    marginTop: 30,
    width: 200,
    backgroundColor: '#444444',
  },
  errorText: {
    color: '#444444',
    marginBottom: 10,
  },
});

export default CreateCafeteriaScreen;
