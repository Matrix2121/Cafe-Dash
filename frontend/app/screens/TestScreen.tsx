import React from 'react';
import { View, Text, Pressable, GestureResponderEvent } from 'react-native'; // 🟢 Добавих импорт на Text
import CafeCard from '../components/cafeCard/cafeCard';

const TestScreen = () => {
  return (
    <View>
        <CafeCard cafeName="Zad ftori" cafeRating="5.0 (23)" whatToOffer="Coffee, Sandwiches"></CafeCard>
    </View>
  );
};

export default TestScreen;