import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Cafeteria } from "@/app/types/items"
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./MenuHeader.style";

interface MenuHeader {
    cafe: Cafeteria;
}

const MenuHeader = ({cafe} : MenuHeader) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Menu</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate("cafereviews", { cafe })}
      >
        <Text style={styles.detailsButtonText}>Reviews</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate("cafedetail", { cafe })}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuHeader;
