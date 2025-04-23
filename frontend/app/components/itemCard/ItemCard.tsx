import React from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { Product } from "../../types/items";
import { useCart } from "@/app/context/CartContext";
import { SvgUri } from "react-native-svg";
import * as Haptics from 'expo-haptics';
import styles from "./ItemCard.style";
import { useTranslation } from 'react-i18next';


type ItemCardProps = {
  product: Product;
};

const ItemCard = ({ product }: ItemCardProps) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = async () => {
    try {
      addToCart(product);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      Alert.alert("Error", "Failed to add product to cart");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
        <SvgUri
          width="60"
          height="60"
          uri="https://cafedashstorage.blob.core.windows.net/svgs/coffe-plus.svg"
        />
      </TouchableOpacity>
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
        defaultSource={require("@/app/assets/images/logo.png")}
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
};

export default ItemCard;
