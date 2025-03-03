import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen/RegisterScreen';
import TestScreen from '../screens/test/TestScreen';
import MainHubScreen from '../screens/main/MainHubScreen/MainHubScreen';
import CafesListScreen from '../screens/cafes/CafeListScreen/CafesListScreen';
import CafeDetailScreen from '../screens/cafes/CafeDetailScreen/CafeDetailScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainHubScreen: undefined;
  CafesListScreen: undefined;
  CafeDetailScreen: { cafeId: number };
  TestScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Sign Up' }}
        />
        
        <Stack.Screen
          name="MainHubScreen"
          component={MainHubScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="TestScreen"
          component={TestScreen}
        />

        <Stack.Screen
          name="CafesListScreen"
          component={CafesListScreen}
        />

        <Stack.Screen
          name ="CafeDetailScreen"
          component={CafeDetailScreen}
        />
      </Stack.Navigator>
  );
};

export default Navigation;