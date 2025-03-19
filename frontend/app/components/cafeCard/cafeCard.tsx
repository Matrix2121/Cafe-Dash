import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Image, ImageSourcePropType } from "react-native";
import { Text, Pressable, View } from "react-native";
import {Button, Card} from "react-native-paper";
import useCafeImage from "@/app/hooks/useCafeImage";
import styles from "../cafeCard/cafeCard.style";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import { Cafe } from "@/app/types/items";

const CafeCard = ({
  id,
  name,
  brand,
  location,
  rating,
  countReview,
  openingHour,
  closingHour,
  isDeleted,
}: Cafe) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { imageUrl, loading, error } = useCafeImage(id);
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
      onPress={() => navigation.navigate("CafeMenuScreen", { cafeId: id })}
    >
      <Card>
        <Card.Content>
          {/* IMAGE SHOULD NOT BE AS ANY or ImageSourcePropType*/}
          <Image
            source={imageUrl as ImageSourcePropType}
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{name}</Text>
              {isValidTime(openingHour) && isValidTime(closingHour) && (
                  <View>
                    <Text style={styles.timeStyle}>Opening Hours:</Text>
                    <Text style={styles.timeStyle}>
                      {openingHour} - {closingHour}
                    </Text>
                  </View>
              )}
          </View>
          <Text style={styles.locationStyle}>{brand}</Text>
          <Text style={styles.locationStyle}>{location}</Text>
          <View style={styles.ratingLocationStyle}>
            <Text style={styles.ratingStyle}>
              ⭐ {rating} ({countReview} reviews)
            </Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default CafeCard;
