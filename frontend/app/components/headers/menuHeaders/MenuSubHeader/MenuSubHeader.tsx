import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Cafeteria } from "@/app/types/items"
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./MenuSubHeader.style";

interface MenuSubheader {
    cafe: Cafeteria;
}

const MenuSubheader = ({cafe} : MenuSubheader) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{cafe.name}</Text>
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

export default MenuSubheader;
