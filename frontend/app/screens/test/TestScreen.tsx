// src/screens/test/TestScreen.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigation';

import { View, Text, Pressable, GestureResponderEvent, Button } from 'react-native';
import styles from './TestScreen.style';

const TestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleDetailPress = () => {
    navigation.navigate('CafeDetailScreen');
  };

  const handleMenuPress = () => {
    navigation.navigate('CafeMenuScreen');
  };

  return (
    <View>
        <Pressable 
        style={styles.testButton} 
        onPress={handleMenuPress}/>
    </View>
  );
};

export default TestScreen;