import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import api from '../../../services/apiClient';
import CafeItem from '../../../components/CafeItem/CafeItem';
import styles from './CafeDetailScreen.style';

type CafeDetailRouteProp = RouteProp<RootStackParamList, 'CafeDetailScreen'>;

type CafeDetails = {
  id: number;
  name: string;
  description: string;
  openingHours: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
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

  // Organize cafe details into sections
  const sections = [
    {
      title: 'General Information',
      data: [
        { label: 'Description', value: cafe.description },
        { label: 'Opening Hours', value: cafe.openingHours },
        { label: 'Address', value: cafe.address },
        { label: 'Phone', value: cafe.phone },
      ],
    },
    {
      title: 'Ratings & Reviews',
      data: [
        { label: 'Rating', value: `${cafe.rating} ⭐` },
        { label: 'Reviews', value: `${cafe.reviewCount} reviews` },
      ],
    },
    {
      title: 'Specialties',
      data: [{ label: 'Specialties', value: cafe.specialties.join(', ') }],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cafe.name}</Text>

      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.data.map((item, idx) => (
            <CafeItem key={idx} label={item.label} value={item.value} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default CafeDetailScreen;