// src/screens/test/TestScreen.tsx
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Navigation';

import {View, Pressable} from 'react-native';
import styles from './TestScreen.style';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';


const TestScreen = () => {
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
                <Pressable style={styles.testButton} onPress={() => navigateToScreen("CafeDetailScreen", {id: 1})}>
                    <Text style={styles.testButtonText}>{"CafeDetailScreen"}</Text>
                </Pressable>

                <Pressable style={styles.testButton} onPress={() => navigateToScreen("CafeMenuScreen", {id: 1})}>
                    <Text style={styles.testButtonText}>{("CafeMenuScreen")}</Text>
                </Pressable>
            </View>
            <View style={styles.rowContainer}>
                <Pressable style={styles.testButton} onPress={() => navigateToScreen("CafesListScreen")}>
                    <Text style={styles.testButtonText}>{"CafesListScreen"}</Text>
                </Pressable>

                <Pressable style={styles.testButton} onPress={() => navigateToScreen("MainHubScreen")}>
                    <Text style={styles.testButtonText}>{"MainHubScreen"}</Text>
                </Pressable>
            </View>
            <View style={styles.rowContainer}>
                <Pressable style={styles.testButton} onPress={() => navigateToScreen("ProfileScreen", { userRole: 'Customer', username: 'Angel',  age: 25})}>
                    <Text style={styles.testButtonText}>{"ProfileScreen"}</Text>
                </Pressable>
                <Pressable style={styles.testButton} onPress={() => navigateToScreen("CreateCafeteriaScreen")}>
                    <Text style={styles.testButtonText}>{("CreateCafeteriaScreen")}</Text>
                </Pressable>
            </View>
            
        </ScrollView>
    );
};

export default TestScreen;