import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { View, Image, Text, Pressable } from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import styles from "./Header.style";
import { MaterialIcons } from "@expo/vector-icons";
import HasRoles from "@/app/utilComponents/HasRoles";
import { useTranslation } from 'react-i18next';

const Header = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

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
        onPress={() => navigation.navigate("profile", { userId })}
      >
        <View style={styles.userInfo}>
          <Image
            style={styles.image}
            source={require("@/app/assets/images/logo.png")}
          />
          {user && <Text style={styles.username}>{t('welcome-cafe')}, {user.username}</Text>}
        </View>
      </Pressable>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <HasRoles roles={["admin", "owner"]}>
          <Pressable onPress={() => navigation.navigate("test")} style={styles.adminButton}>
            <Text style={styles.adminButtonText}>{t('admin-page')}</Text>
          </Pressable>
        </HasRoles>

        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" color={"black"} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
