import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Navigation';
import {View, Pressable} from 'react-native';
import styles from './Test.style';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import HasRoles from '@/app/utilComponents/HasRoles';
import {Cafe} from '@/app/types/items';
import {useAuth} from "@/app/context/AuthContext";

const Test = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {user} = useAuth();

    const navigateToScreen = <T extends keyof RootStackParamList>(
        screen: T,
        params?: RootStackParamList[T]
    ) => {
        navigation.navigate(screen, params as any);
    };

    const navigateToProfile = () => {
        if (!user?.id) {
            console.warn('No user with this name available');
            return;
        }
        navigateToScreen("profile", {userId: user.id});
    }

    const cafe: Cafe = {
        id: 1,
        name: "Morning Brew",
        brand: "Blue Bottle",
        location: "456 Market St, San Francisco",
        rating: 4.5,
        countReview: 128,
        phoneNumber: "+1 (415) 555-0192",
        imageUrl: "https://iili.io/3ugVhbI.jpg",
        openingHour: "08:00:00",
        closingHour: "20:00:00",
        isDeleted: false
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.rowContainer}>
                <Pressable
                    style={styles.testButton}
                    onPress={() => navigateToScreen("cafedetail", {cafe})}
                >
                    <Text style={styles.testButtonText}>{"CafeDetail"}</Text>
                </Pressable>

                <Pressable
                    style={styles.testButton}
                    onPress={() => navigateToScreen("cafemenu", {cafe})}
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
                    onPress={() => navigateToScreen("home")}
                >
                    <Text style={styles.testButtonText}>{"MainLayout"}</Text>
                </Pressable>
            </View>
            <View style={styles.rowContainer}>
                <Pressable
                    style={styles.testButton}
                    onPress={() => navigateToProfile()}
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
            <View style={styles.rowContainer}>
                <HasRoles roles={['admin', 'owner']}>
                    <Pressable
                        style={styles.testButton}
                        onPress={() => navigateToScreen("createuser")}
                    >
                        <Text style={styles.testButtonText}>{"Create User"}</Text>
                    </Pressable>
                </HasRoles>
                <Pressable
                    style={styles.testButton}
                    onPress={() => navigateToScreen("contact")}
                >
                    <Text style={styles.testButtonText}>{"Contact us"}</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default Test;
