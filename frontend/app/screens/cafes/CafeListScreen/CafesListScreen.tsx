import React from 'react';
import { View, ActivityIndicator, Text, FlatList, Pressable } from 'react-native';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import CafeCard from '../../../components/cafeCard/CafeCard';
import useCafesShort from '../../../hooks/useCafesShort';
import styles from './CafesListScreen.style'

const CafesListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePressCafe = (cafeId: number) => {
    navigation.navigate('CafeMenuScreen', { cafeId });
  };
  
  const { cafesShort, loading, error } = useCafesShort();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#444444" />
        <Text>Loading cafe details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!cafesShort) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No cafe data available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cafesShort}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePressCafe(item.id)}>
          <CafeCard
            id={item.id}
            name={item.name}
            location={item.location}
            rating={item.rating}
            reviewCount={item.reviewCount}
          />
        </Pressable>
      )}
    />
  );
};

export default CafesListScreen;