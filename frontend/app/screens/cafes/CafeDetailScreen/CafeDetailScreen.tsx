import React from 'react';
import {ActivityIndicator} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { View, Text, ScrollView } from 'react-native';
import styles from './CafeDetailScreen.style';
import useCafeLong from '@/app/hooks/useCafeLong';

type CafeDetailRouteProp = RouteProp<RootStackParamList, 'CafeDetailScreen'>;

const CafeDetailScreen = ({ route }: { route: CafeDetailRouteProp }) => {
  const { id } = route.params;
  const { cafeLong, loading, error } = useCafeLong(id);

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

  if (!cafeLong) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No cafe data available.</Text>
      </View>
    );
  }
  
  const sections = [
    {
      title: 'General Information',
      data: [
        { label: 'Opening Hours', value: cafeLong.openingHours },
        { label: 'Address', value: cafeLong.location },
        { label: 'Phone', value: cafeLong.phone },
      ],
    },
    {
      title: 'Ratings & Reviews',
      data: [
        { label: 'Rating', value: `${cafeLong.rating} ⭐` },
        { label: 'Reviews', value: `${cafeLong.reviewCount} reviews` },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cafeLong.name}</Text>

      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.data.map((item, idx) => (
            <View key={idx} style={styles.itemContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default CafeDetailScreen;