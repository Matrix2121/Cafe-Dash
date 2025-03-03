import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';

import { View, Text, Pressable, GestureResponderEvent, Button } from 'react-native';
import styles from './TestScreen.style';

const TestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('MainHubScreen');
  };

  return (
    <View>
        <Pressable 
        style={styles.testButton} 
        onPress={handlePress}/>
    </View>
  );
};

export default TestScreen;