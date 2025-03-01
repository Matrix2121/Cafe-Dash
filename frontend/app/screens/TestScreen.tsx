import React from 'react';
import { View, Text, Pressable, GestureResponderEvent, Button } from 'react-native';
import CafeCard from '../components/cafeCard/cafeCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import navigation, { RootStackParamList } from '../navigation/navigation';
import styles from './TestScreen.style'

const TestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View>
        <Pressable style={styles.testButton} onPress={() => navigation.navigate("MainMenu")}/>
    </View>
  );
};

export default TestScreen;