import React from "react";
import { RootStackParamList } from '@/app/navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, Pressable } from "react-native";
import { Card } from "react-native-paper";
import styles from "./CafeCard.style";

type Props = {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
};

const CafeCard = ({ id, name, rating, reviewCount, specialties }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    // Mock data for missing fields
    const cafeDetails = {
      id,
      name,
      rating,
      reviewCount,
      specialties,
      description: 'A cozy cafe with great coffee.', // Mock data
      openingHours: '8:00 AM - 8:00 PM', // Mock data
      address: '123 Main St, Cityville', // Mock data
      phone: '+1234567890', // Mock data
    };

    navigation.navigate('CafeDetailScreen', { cafe: cafeDetails });
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={styles.cardStyle}>
        <Card.Content>
          <Text style={styles.titleStyle}>{name}</Text>
          <Text style={styles.ratingStyle}>
            ⭐ {rating} ({reviewCount} reviews)
          </Text>
          <Text style={styles.titleStyle}>
            {specialties.join(', ')}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default CafeCard;