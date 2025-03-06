import React from "react";
import { RootStackParamList } from '@/app/navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { CafeShort } from "@/app/types/items";
import { Text, Pressable, View } from "react-native";
import { Card } from "react-native-paper";
import styles from "./CafeCard.style";

const CafeCard = ({ id, name, location, rating, reviewCount }: CafeShort) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.navigate('CafeDetailScreen', {id})}>
      <Card style={styles.cardStyle}>
        <Card.Content>
          <Text style={styles.titleStyle}>{name}</Text>
          <View style={styles.ratingLocationStyle}>
            <Text style={styles.locationStyle}>
              {location}
            </Text>
            <Text style={styles.ratingStyle}>
              ⭐ {rating} ({reviewCount} reviews)
            </Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default CafeCard;