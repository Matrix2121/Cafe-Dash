import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CafeListScreen from '../../cafes/CafeListScreen/CafesList';
import Cart from '../../orders/CartScreen/Cart';
import styles from './MainHub.style';
import logo from "../../../assets/images/logo.png";
import { useAuth } from '@/app/context/AuthContext';
import { Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/Navigation';
const Tab = createBottomTabNavigator();

const MainHub = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleLogout = () => {
    logout();
    navigation.navigate("login");
  }

  const { user, logout } = useAuth();
  return (
    <>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#444444" />
          <Text style={styles.locationText}>Downtown Coffee District</Text>
        </View>
        <View style={styles.userContainer}>
          {user && <Text style={styles.username}>Hi, {user.username}</Text>}
          <Image 
          source={logo}
          style={styles.profileImage}
        />
          <Button onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="#444444" />
          </Button>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#444444',
          tabBarInactiveTintColor: '#CECECC',
          tabBarStyle: styles.tabBar,
          headerShown: false
        }}
      >
        <Tab.Screen 
          name="Cafes"
          component={CafeListScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="local-cafe" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name="Cart" 
          component={Cart}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="shopping-cart" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainHub;