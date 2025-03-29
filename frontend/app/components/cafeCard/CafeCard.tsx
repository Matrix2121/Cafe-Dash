import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, ImageSourcePropType, Text, Pressable, View } from "react-native";
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
      onPress={() => navigation.navigate("cafedetail", { cafe })}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image
            source={cafe.imageUrl as ImageSourcePropType}
            style={styles.image}
            defaultSource={require('@/app/assets/images/logo.png')}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{cafe.name}</Text>
            {isValidTime(cafe.openingHour) && isValidTime(cafe.closingHour) && (
              <View>
                <Text style={styles.timeStyle}>Open Hours:</Text>
                <Text style={styles.timeStyle}>
                  {cafe.openingHour} - {cafe.closingHour}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.locationStyle}>{cafe.brand}</Text>
          <Text style={styles.locationStyle}>{cafe.location}</Text>
          <View style={styles.ratingLocationStyle}>
            <Text style={styles.ratingStyle}>
              ⭐ {cafe.rating.toFixed(1)} ({cafe.countReview} reviews)
            </Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default CafeCard;