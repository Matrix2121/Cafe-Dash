import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Pressable, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./CommonHeader.style";
import theme from "@/app/theme/theme";

interface CommonHeaderProps {
  title: String;
}

const CommonHeader = ({ title }: CommonHeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        android_ripple={{ color: theme.colors.ripple }}
      >
        <MaterialIcons name="arrow-back" size={28} style={styles.backButton} />
      </Pressable>
    </View>
  );
};

export default CommonHeader;
