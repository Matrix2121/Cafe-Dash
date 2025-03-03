import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/Navigation';

import { View, Text, StyleSheet } from 'react-native';
import styles from './CafeDetailScreen.style'

type CafeDetailScreenRouteProp = RouteProp<RootStackParamList, 'CafeDetailScreen'>;

const CafeDetailScreen = ({ route }: { route: CafeDetailScreenRouteProp }) => {
  const { cafeId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cafe Details</Text>
      <Text>Cafe ID: {cafeId}</Text>
      {/* Add more details here */}
    </View>
  );
};

export default CafeDetailScreen;