// src/screens/test/TestScreen.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigation';

import { View, Pressable } from 'react-native';
import styles from './TestScreen.style';
import { ScrollView } from 'react-native-gesture-handler';


const TestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleDetailPress = () => {
    navigation.navigate('CafeDetailScreen', {id: 1});
  };

  const handleMenuPress = () => {
    navigation.navigate('CafeMenuScreen', {id: 1});
  };

  const handleListPress = () => {
    navigation.navigate('CafesListScreen')
  }

  const handleHubPress = () => {
    navigation.navigate('MainHubScreen')
  }

  return (
    <ScrollView>
      <View>
          <Pressable 
            style={styles.testButton} 
            onPress={handleDetailPress}>CafeDetails</Pressable>

          <Pressable 
            style={styles.testButton} 
            onPress={handleMenuPress}>CafeMenu</Pressable>

          <Pressable 
            style={styles.testButton} 
            onPress={handleListPress}>CafeList</Pressable>

          <Pressable 
            style={styles.testButton} 
            onPress={handleHubPress}>HubScreen</Pressable>
          
      </View>
    </ScrollView>
  );
};

export default TestScreen;