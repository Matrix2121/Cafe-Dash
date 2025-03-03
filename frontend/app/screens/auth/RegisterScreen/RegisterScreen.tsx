import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Navigation';

import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styles from "./RegisterScreen.style";

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
        theme={{ colors: { primary: '#774936' } }}
      >
        Go to Login
      </Button>
    </View>
  );
};

export default RegisterScreen;