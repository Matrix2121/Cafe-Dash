import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen/RegisterScreen";
import TestScreen from "../screens/test/TestScreen";
import MainHubScreen from "../screens/main/MainHubScreen/MainHubScreen";
import CafesListScreen from "../screens/cafes/CafeListScreen/CafesListScreen";
import CafeDetailScreen from "../screens/cafes/CafeDetailScreen/CafeDetailScreen";
import CafeMenuScreen from "../screens/cafes/CafeMenuScreen/CafeMenuScreen";
import CafeReviewsScreen from "../screens/cafes/CafeReviewsScreen/CafeReviewsScreen";
import LeaveReviewScreen from "../screens/leaveReview/LeaveReviewScreen";
import ProtectedRoute from "./ProtectedRoute";
import CreateCafeteriaScreen from "../screens/cafes/CafeCreateScreen/CreateCafeScreen";
import ProfileScreen from "@/app/screens/profile/ProfileScreen";
import { Cafe } from "../types/items";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  MainHubScreen: undefined;
  ProfileScreen: { userId: number };
  CafesListScreen: undefined;
  CafeDetailScreen: { cafe: Cafe };
  CafeMenuScreen: { cafe: Cafe };
  CafeReviewsScreen: { cafe: Cafe };
  LeaveReviewScreen: { cafeteriaId: number };
  TestScreen: undefined;
  AdminCreateCafeteria: undefined;
  CreateCafeteriaScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: "Sign Up" }}
      />

      <Stack.Screen name="MainHubScreen" options={{ headerShown: false }}>
        {() => (
          //<ProtectedRoute>
          <MainHubScreen />
          //</ProtectedRoute>
        )}
      </Stack.Screen>

      <Stack.Screen name="TestScreen" component={TestScreen} />

      <Stack.Screen name="CafesListScreen" component={CafesListScreen} />

      <Stack.Screen name="CafeDetailScreen" component={CafeDetailScreen} />

      <Stack.Screen name="CafeMenuScreen" component={CafeMenuScreen} />

      <Stack.Screen name="CafeReviewsScreen" component={CafeReviewsScreen} />

      <Stack.Screen name="LeaveReviewScreen" component={LeaveReviewScreen} />

      <Stack.Screen
        name="CreateCafeteriaScreen"
        component={CreateCafeteriaScreen}
      />

      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
