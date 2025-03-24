import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { View, Pressable } from 'react-native';
import styles from './Test.style';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import HasRoles from '@/app/utilComponents/HasRoles';
const Test = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToScreen = <T extends keyof RootStackParamList>(
    screen: T,
    params?: RootStackParamList[T]
  ) => {
    navigation.navigate(screen, params as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.rowContainer}>
          <Pressable
            style={styles.testButton}
            onPress={() => navigateToScreen("cafedetail", { cafeId: 1 })}
          >
            <Text style={styles.testButtonText}>{"CafeDetail"}</Text>
          </Pressable>

        <Pressable
          style={styles.testButton}
          onPress={() => navigateToScreen("cafemenu", { cafeId: 1 })}
        >
          <Text style={styles.testButtonText}>{"CafeMenu"}</Text>
        </Pressable>
      </View>
      <View style={styles.rowContainer}>
        <Pressable
          style={styles.testButton}
          onPress={() => navigateToScreen("cafeslist")}
        >
          <Text style={styles.testButtonText}>{"CafesList"}</Text>
        </Pressable>
        <Pressable
          style={styles.testButton}
          onPress={() => navigateToScreen("mainhub")}
        >
          <Text style={styles.testButtonText}>{"MainHub"}</Text>
        </Pressable>
      </View>
      <View style={styles.rowContainer}>
        <Pressable
          style={styles.testButton}
          onPress={() => navigateToScreen("profile", { userId: 2 })}
        >
          <Text style={styles.testButtonText}>{"Profile"}</Text>
        </Pressable>
        <HasRoles roles={['admin']}>
            <Pressable
            style={styles.testButton}
            onPress={() => navigateToScreen("createcafeteria")}
            >
            <Text style={styles.testButtonText}>{"CreateCafeteria"}</Text>
            </Pressable>
        </HasRoles>
      </View>
    </ScrollView>
  );
};

export default Test;
