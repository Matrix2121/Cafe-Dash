import React from 'react';
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { View, Image, Text, Pressable, ImageSourcePropType } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '@/app/context/AuthContext';
import styles from './Header.style';
import useCafeImage from '@/app/hooks/useCafeImage';
import { MaterialIcons } from '@expo/vector-icons';

const Header = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    logout();
    navigation.navigate("login");
  }

  const { user, logout } = useAuth();
  const { imageUrl, loading, error } = useCafeImage(1);

  return (
    <View style={styles.header}>
      {/* Left side - User info */}
      <View style={styles.userInfo}>
        <Image
          source={imageUrl as ImageSourcePropType}
          style={styles.image}
          defaultSource={require('@/app/assets/images/logo.png')}
        />
        {user && <Text style={styles.username}>Hi, {user.username}</Text>}
      </View>

      {/* Right side - Logout button */}
      <View style={styles.logoutContainer}>
        <Button 
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <MaterialIcons name="logout" size={24} color="#444444" />
        </Button>
      </View>
    </View>
  );
};

export default Header;