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

  return (
    <Pressable onPress={() => navigation.navigate('CafeDetailScreen')}>
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