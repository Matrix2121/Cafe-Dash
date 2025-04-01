import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./CurrentCafeCartButton.style";

interface CurrentCafeCartButtonProps {
  totalPrice: number;
  productsCount: number;
}

const CurrentCafeCartButton = ({totalPrice, productsCount} : CurrentCafeCartButtonProps) => {
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
      <Text style={styles.ButtonText}>
        {productsCount} {productsCount === 1 ? "item" : "items"}
      </Text>
      <Text style={styles.ButtonText}>View Cart</Text>
      <Text style={styles.TotalText}>${totalPrice.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

export default CurrentCafeCartButton;
