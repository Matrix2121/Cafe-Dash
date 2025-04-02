import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { View, Image, Text, Pressable } from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import styles from "./Header.style";
import { MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user, logout } = useAuth();

    const handleLogout = async () => {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    };

    if (!user) return null;
    const userId = Number(user.id);

  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => navigation.navigate("profile", { userId: userId })}
      >
        <View style={styles.userInfo}>
          <Image
            style={styles.image}
            source={require("@/app/assets/images/logo.png")}
          />
          {user && <Text style={styles.username}>Hi, {user.username}</Text>}
        </View>
      </Pressable>
      <View>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" color={"black"} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
