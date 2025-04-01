import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./DifferentCafeCartButton.style";

interface DifferentCafeCartButton {
  currentCafeteriaName: string;
  totalPrice: number;
  productsCount: number;
}

const DifferentCafeCartButton = ({currentCafeteriaName, totalPrice, productsCount} : DifferentCafeCartButton) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.Button}
      onPress={() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "home",
                params: {
                  screen: "Cart",
                },
              },
            ],
          })
        );
      }}
    >
      <View style={styles.cartInfoContainer}>
        <View style={styles.cafeteriaInfo}>
          <Text style={styles.cafeteriaName} numberOfLines={1}>
            You're currently ordering from: {currentCafeteriaName}
          </Text>
        </View>
        <View style={styles.cartSummary}>
          <Text style={styles.cartButtonText}>
            {productsCount} {productsCount === 1 ? "item" : "items"} in cart
          </Text>
          <Text style={styles.cartTotalText}>${totalPrice.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DifferentCafeCartButton;
