import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Navigation";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigation.navigate("login");
    }
  }, [user, loading, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;