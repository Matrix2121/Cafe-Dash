import React from 'react';
import { View, Text, Pressable, GestureResponderEvent } from 'react-native'; // 🟢 Добавих импорт на Text
import CafeCard from '../components/cafeCard/cafeCard';

const TestScreen = () => {
  return (
    <View>
        <CafeCard cafeName="asd" cafeRating="asd" whatToOffer="asd"></CafeCard>
    </View>
  );
};

export default TestScreen;