import React from "react";
import { RootStackParamList } from '@/app/navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, Pressable, GestureResponderEvent, View } from "react-native";
import { Card } from "react-native-paper";
import styles from "./CafeCard.style";

const CafeCard = ({id, cafeName, cafeRating, whatToOffer}: {
  id: number;
  cafeName: string;
  cafeRating: string;
  whatToOffer: string;
}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const handlePress = (e: GestureResponderEvent) => {
    navigation.navigate('CafeDetailScreen', {cafeId: id});
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={styles.cardStyle}>
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
