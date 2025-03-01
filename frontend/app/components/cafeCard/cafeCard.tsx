import React from 'react';
import { Text, Pressable, GestureResponderEvent, ImageBackground } from 'react-native';
import { Button, Card } from 'react-native-paper';
import styles from "./cafeCard.style";
import CardCover from 'react-native-paper/lib/typescript/components/Card/CardCover';

const CafeCard = ({ cafeName, cafeRating, whatToOffer }: { 
    cafeName: string; 
    cafeRating: string; 
    whatToOffer: string; 
  }) => {  

    function onPress(e: GestureResponderEvent): void {
        throw new Error('Function not implemented.');
    }

  return (
    <Pressable>
        <Card style={styles.card} onPress={onPress}>
            <Card.Cover 
                source={require("../../../assets/images/logo.png")}
                style={styles.image}/>

                <Card.Content>
                    <Text>{cafeName}</Text>
                    <Text>{cafeRating}</Text>
                    <Text>{whatToOffer}</Text>
                </Card.Content>
        </Card>
    </Pressable>
  );
};

export default CafeCard;