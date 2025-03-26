import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CafeListScreen from '../cafes/CafeListScreen/CafesList';
import Cart from '../cart/Cart';
import styles from './MainHub.style';
import logo from "../../assets/images/logo.png";
import { useAuth } from '@/app/context/AuthContext';
import { Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { theme } from '@/app/theme/theme';

const Tab = createBottomTabNavigator();

const MainHub = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate("login");
  };

  const handleProfilePress = () => {
    navigation.navigate("profile", { userId: 1 });
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Pressable 
          onPress={handleProfilePress}
          style={styles.profileContainer}
          android_ripple={{ color: theme.colors.ripple }}
        >
          <Image 
            source={logo}
            style={styles.profileImage}
          />
          {user && (
            <Text style={styles.username}>
              Hi, {user.username}!
            </Text>
          )}
        </Pressable>
        <Button 
          onPress={handleLogout}
          textColor={theme.colors.textSecondary}
        >
          <MaterialIcons 
            name="logout" 
            size={theme.iconSizes.md} 
            color={theme.colors.textSecondary} 
          />
        </Button>
      </View>

      {/* Main Content */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.textPrimary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: styles.tabBar,
          headerShown: false
        }}
      >
        <Tab.Screen 
          name="Cafes"
          component={CafeListScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons 
                name="local-cafe" 
                size={theme.iconSizes.md} 
                color={color} 
              />
            )
          }}
        />
        <Tab.Screen 
          name="Cart" 
          component={Cart}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons 
                name="shopping-cart" 
                size={theme.iconSizes.md} 
                color={color} 
              />
            )
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainHub;