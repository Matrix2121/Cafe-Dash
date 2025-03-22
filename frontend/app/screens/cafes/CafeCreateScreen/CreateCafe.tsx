import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/Navigation';
import {url} from "@/app/common/constants";
import loginBackground from "../../../assets/images/login-background.jpg";
import styles from "@/app/screens/cafes/CafeCreateScreen/CreateCafe.style";

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
      const response = await fetch(`${url}api/cafeterias`, {
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
      source={loginBackground}
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
            />
            <TextInput
              label="Brand"
              value={brand}
              onChangeText={setBrand}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              mode="outlined"
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleCreateCafeteria}
              loading={loading}
              disabled={loading}
              style={styles.createButton}
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default CreateCafeteriaScreen;
