import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Pressable, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./ProfileHeader.style";
import theme from "@/app/theme/theme";

const ProfileHeader = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Profile</Text>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        android_ripple={{ color: theme.colors.ripple }}
      >
        <MaterialIcons name="arrow-back" size={28} style={styles.backButton}/>
      </Pressable>
    </View>
  );
};

export default ProfileHeader;
