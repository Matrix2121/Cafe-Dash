import React from "react";

import { Image } from 'react-native';
import { CafeShort } from "@/app/types/items";
import { Text, Pressable, View } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import styles from "./CafeCard.style";
import useCafeImage from "@/app/hooks/useCafeImage";

const CafeCard = ({ id, name, location, rating, reviewCount }: CafeShort) => {

  const { imageUrl, loading, error } = useCafeImage(id);

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

  if (!imageUrl) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No cafe data available.</Text>
      </View>
    );
  }

  return (
    <Card style={styles.cardStyle}>
      <Card.Content>
      <Image
        source={imageUrl}
        style={styles.image}/>
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
  );
};

export default CafeCard;