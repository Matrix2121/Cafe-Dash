import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {Image, ImageSourcePropType} from "react-native";
import { CafeShort } from "@/app/types/items";
import { Text, Pressable, View } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import useCafeImage from "@/app/hooks/useCafeImage";
import styles from "../cafeCard/cafeCard.style";

const CafeCard = ({ id, name, location, rating, reviewCount }: CafeShort) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
    <Pressable onPress={() => navigation.navigate("CafeMenuScreen", { id })}>
      <Card style={styles.cardStyle}>
        <Card.Content>
          {/* IMAGE SHOULD NOT BE AS ANY or ImageSourcePropType*/}
          <Image source={imageUrl as ImageSourcePropType} style={styles.image} />
          <Text style={styles.titleStyle}>{name}</Text>
          <View style={styles.ratingLocationStyle}>
            <Text style={styles.locationStyle}>{location}</Text>
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
