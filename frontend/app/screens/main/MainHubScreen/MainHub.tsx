import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CafeListScreen from '../../cafes/CafeListScreen/CafesList';
import Cart from '../../orders/CartScreen/Cart';
import styles from './MainHub.style'
import logo from "../../../assets/images/logo.png";

const Tab = createBottomTabNavigator();

const MainHub = () => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#444444" />
          <Text style={styles.locationText}>Downtown Coffee District</Text>
        </View>
        <Image 
          source={logo}
          style={styles.profileImage}
        />
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