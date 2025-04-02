import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, Text, Pressable, View } from "react-native";
import { Card } from "react-native-paper";
import styles from "./CafeCard.style";
import { Cafeteria } from "@/app/types/items";

interface CafeCardProps {
  cafe: Cafeteria;
}

const CafeCard = ({ cafe }: CafeCardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const isValidTime = (time: string | null | undefined) => {
    return !!time && time !== "00:00:00";
  };

  return (
    <Pressable
      style={styles.cardStyle}
      onPress={() => navigation.navigate("cafemenu", { cafe })}
    >
      <Card style={styles.card}>

        <Image
          source={{ uri: cafe.imageUrl }}
          style={styles.image}
          defaultSource={require("@/app/assets/images/logo.png")}
        />

        <View style={styles.contentContainer}>

          <Text
            style={styles.titleStyle}
            ellipsizeMode="tail"
          >
            {cafe.name}
          </Text>

          <View style={styles.infoRow}>
            <Text
              style={styles.brandStyle}
              ellipsizeMode="tail"
            >
              {cafe.brand}
            </Text>
          </View>

          <View style={styles.infoRow}>
            {isValidTime(cafe.openingHour) && isValidTime(cafe.closingHour) && (
              <Text style={styles.timeStyle}>
                {cafe.openingHour} - {cafe.closingHour}
              </Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text
              style={styles.locationStyle}
              ellipsizeMode="tail"
            >
              {cafe.location}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.ratingStyle} numberOfLines={1}>
              ⭐ {cafe.rating.toFixed(1)} ({cafe.countReview} reviews)
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default CafeCard;
