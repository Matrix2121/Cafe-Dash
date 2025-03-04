import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/Navigation';

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../../services/apiClient';
import styles from './CafeDetailScreen.style'

type CafeDetailRouteProp = RouteProp<RootStackParamList, 'CafeDetailScreen'>;

type CafeDetails = {
  id: number;
  name: string;
  description: string;
  openingHours: string;
  address: string;
  phone: string;
};

const CafeDetailScreen = ({ route }: { route: CafeDetailRouteProp }) => {
  const { cafeId } = route.params;
  const [cafe, setCafe] = useState<CafeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCafeDetails = async () => {
      try {
        const response = await api.get(`/cafes/${cafeId}`);
        setCafe(response.data);
      } catch (err) {
        setError('Failed to fetch cafe details');
      } finally {
        setLoading(false);
      }
    };

    fetchCafeDetails();
  }, [cafeId]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;
  if (!cafe) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cafe.name}</Text>
      <Text style={styles.description}>{cafe.description}</Text>
      <Text style={styles.detail}>⏰ {cafe.openingHours}</Text>
      <Text style={styles.detail}>📍 {cafe.address}</Text>
      <Text style={styles.detail}>📞 {cafe.phone}</Text>
    </View>
  );
};

export default CafeDetailScreen;