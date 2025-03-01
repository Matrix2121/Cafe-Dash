import React from "react";
import {
  Text,
  Pressable,
  GestureResponderEvent,
  View
} from "react-native";
import { Card } from "react-native-paper";
import styles from "./cafeCard.style";

const CafeCard = ({cafeName, cafeRating, whatToOffer,}: {
  cafeName: string;
  cafeRating: string;
  whatToOffer: string;
}) => {

  function onPress(e: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Pressable>
      <Card style={styles.cardStyle} onPress={onPress}>
        <Card.Cover
          source={require("../../../assets/images/logo.png")}
          style={styles.imageStyle}
        />

        <Card.Content>
            <Text style={styles.titleStyle}>{cafeName}</Text>
            <View style={styles.topTextContainer}>
                <Text style={styles.ratingStyle}>{cafeRating}</Text>
                <Text style={styles.whatToOfferStyle}>{whatToOffer}</Text>
            </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default CafeCard;
