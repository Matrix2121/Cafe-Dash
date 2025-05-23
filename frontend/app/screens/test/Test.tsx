import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Navigation';
import {View, Pressable} from 'react-native';
import styles from './Test.style';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import HasRoles from '@/app/utilComponents/HasRoles';
import {useAuth} from "@/app/context/AuthContext";
import {useTranslation} from "react-i18next";

const Test = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {user} = useAuth();
    const { t } = useTranslation();

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.rowContainer}>
                <Pressable
                    style={styles.testButton}
                    onPress={() => navigateToProfile()}
                >
                    <Text style={styles.testButtonText}>{"Profile"}</Text>
                </Pressable>
                <HasRoles roles={['admin', 'owner', 'employee']}>
                    <Pressable
                        style={styles.testButton}
                        onPress={() => navigateToScreen("editorder")}
                    >
                        <Text style={styles.testButtonText}>{t("edit-orders")}</Text>
                    </Pressable>
                </HasRoles>
            </View>
            <View style={styles.rowContainer}>
                <HasRoles roles={['admin', 'owner']}>
                    <Pressable
                        style={styles.testButton}
                        onPress={() => navigateToScreen("createuser")}
                    >
                        <Text style={styles.testButtonText}>{t("create-user")}</Text>
                    </Pressable>
                </HasRoles>
                <HasRoles roles={['admin', 'owner']}>
                    <Pressable
                        style={styles.testButton}
                        onPress={() => navigateToScreen("createcafeteria")}
                    >
                        <Text style={styles.testButtonText}>{t("create-cafeteria")}</Text>
                    </Pressable>
                </HasRoles>
            </View>
            <View style={styles.rowContainer}>
            <HasRoles roles={['admin', 'owner']}>
                    <Pressable
                        style={styles.testButton}
                        onPress={() => navigateToScreen("userslist")}
                    >
                        <Text style={styles.testButtonText}>{t("see-users")}</Text>
                    </Pressable>
                </HasRoles>
            </View>
        </ScrollView>
    );
};

export default Test;
