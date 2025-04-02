import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Pressable, Image } from "react-native";

import styles from "./OrdersHeader.style";
import theme from "@/app/theme/theme";

const MenuHeader = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Orders</Text>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        android_ripple={{ color: theme.colors.ripple }}
      >
        <Image
          style={styles.backButton}
          source={require("@/app/assets/images/navigation.png")}
        />
      </Pressable>
    </View>
  );
};

export default MenuHeader;
