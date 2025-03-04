// src/navigation/ProtectedRoute.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';

import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    navigation.navigate("LoginScreen");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;