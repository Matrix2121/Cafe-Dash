// src/screens/test/TestScreen.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigation';

import { View, Pressable } from 'react-native';
import styles from './TestScreen.style';
import CafeCard from '@/app/components/CafeCard/CafeCard';
import ItemCard from '@/app/components/ItemCard/ItemCard';
import { ScrollView } from 'react-native-gesture-handler';


const TestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleDetailPress = () => {
    navigation.navigate('CafeDetailScreen', {id: 1});
  };

  const handleMenuPress = () => {
    navigation.navigate('CafeMenuScreen');
  };

  const handleListPress = () => {
    navigation.navigate('CafesListScreen')
  }

  const handleHubPress = () => {
    navigation.navigate('MainHubScreen')
  }

  const item = {
    id: 1,
    name: 'latte',
    price: 5,
    productType: "DRINKABLE",
  };

  return (
    <ScrollView>
      <View>
          <Pressable 
            style={styles.testButton} 
            onPress={handleDetailPress}/>

          <Pressable 
            style={styles.testButton} 
            onPress={handleMenuPress}/>

          <Pressable 
            style={styles.testButton} 
            onPress={handleListPress}/>

          <Pressable 
            style={styles.testButton} 
            onPress={handleHubPress}/>
          
          <CafeCard
            id={1}
            name={"asd"}
            location='lokaciq 2'
            rating={4.2}
            reviewCount={123}/>

          <CafeCard
            id={1}
            name={"dasd"}
            location='lokaciq 1'
            rating={2}
            reviewCount={31}/>

          <ItemCard
            item={item}/>

          <ItemCard
            item={item}/>

          <ItemCard
            item={item}/>

          <ItemCard
            item={item}/>

      </View>
    </ScrollView>
  );
};

export default TestScreen;