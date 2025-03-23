import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Image, ImageSourcePropType } from "react-native";
import { Text, Pressable, View } from "react-native";
import { Card } from "react-native-paper";
import useCafeImage from "@/app/hooks/useCafeImage";
import styles from "./cafeCard.style";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import { Cafe } from "@/app/types/items";

interface CafeCardProps {
  cafe: Cafe;
}

const CafeCard = ({ cafe }: CafeCardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { imageUrl, loading, error } = useCafeImage(cafe.id);
  const hasData = !!imageUrl;

  if (loading || error || !hasData) {
    return (
      <LoadingErrorView
        loading={loading}
        error={error}
        dataAvailable={hasData}
      />
    );
  }

  const isValidTime = (time: string | null | undefined) => {
    return !!time && time !== "00:00:00";
  };

  return (
    <Pressable
      style={styles.cardStyle}
      onPress={() => navigation.navigate("CafeMenuScreen", { cafe })}
    >
      <Card>
        <Card.Content>
          {/* IMAGE SHOULD NOT BE AS ANY or ImageSourcePropType*/}
          <Image
            source={imageUrl as ImageSourcePropType}
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{cafe.name}</Text>
              {isValidTime(cafe.openingHour) && isValidTime(cafe.closingHour) && (
                  <View>
                    <Text style={styles.timeStyle}>Opening Hours:</Text>
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
              ⭐ {cafe.rating} ({cafe.countReview} reviews)
            </Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default CafeCard;
