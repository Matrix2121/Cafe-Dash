import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CafeList from '@/app/screens/cafes/CafeListScreen/CafesList';
import Cart from '@/app/screens/cart/Cart';

import { MaterialIcons } from "@expo/vector-icons";
import theme from '@/app/theme/theme';
import styles from "./Footer.styles";

const Tab = createBottomTabNavigator();

const Footer = () => {

  return (
    <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.textPrimary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: styles.tabBar,
          headerShown: false
        }}
      >
        <Tab.Screen 
          name="cafeslist"
          component={CafeList}
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
          name="cart" 
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
  );
};

export default Footer;
