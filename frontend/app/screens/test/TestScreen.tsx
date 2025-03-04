import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigation';

import { View, Text, Pressable, GestureResponderEvent, Button } from 'react-native';
import styles from './TestScreen.style';

const TestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    // Pass dummy data directly
    navigation.navigate('CafeDetailScreen', {
      cafe: {
        id: 1,
        name: 'Coffee Haven',
        description: 'A cozy cafe with great coffee.',
        openingHours: '8:00 AM - 8:00 PM',
        address: '123 Main St, Cityville',
        phone: '+1234567890',
        rating: 4.5,
        reviewCount: 120,
        specialties: ['Latte', 'Cappuccino', 'Espresso'],
      },
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.testButton} onPress={handlePress}>
        <Text style={styles.testButtonText}>Go to Cafe Detail Screen</Text>
      </Pressable>
    </View>
  );
};

export default TestScreen;