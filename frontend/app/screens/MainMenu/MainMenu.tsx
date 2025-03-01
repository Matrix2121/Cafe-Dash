import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './MainMenu.style'
import CafeScreen from '../CafesScreen/CafesScreen';
import OrderScreen from '../OrderScreen/OrderScreen';

const Tab = createBottomTabNavigator();

const MainMenu = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#444444" />
          <Text style={styles.locationText}>Downtown Coffee District</Text>
        </View>
        <Image 
          source={require('../../../assets/images/logo.png')} 
          style={styles.profileImage}
        />
      </View>

      {/* Bottom Tab Navigation */}
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
          component={CafeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="local-cafe" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name="Order" 
          component={OrderScreen}
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

export default MainMenu;