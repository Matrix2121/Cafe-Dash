import React from 'react';
import {RootStackParamList} from "@/app/navigation/Navigation";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import {View, Image, Text, Pressable} from 'react-native';
import {Button} from 'react-native-paper';
import {useAuth} from '@/app/context/AuthContext';
import styles from './Header.style';
import {MaterialIcons} from '@expo/vector-icons';

const Header = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLogout = () => {
        logout();
        navigation.navigate("login");
    }
    const {user, logout} = useAuth();

    return (
        <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate("profile")}>
                <View style={styles.userInfo}>
                    <Image
                        style={styles.image}
                        defaultSource={require('@/app/assets/images/logo.png')}
                    />
                    {user && <Text style={styles.username}>Hi, {user.username}</Text>}
                </View>
            </Pressable>
            <View style={styles.logoutContainer}>
                <Button
                    onPress={handleLogout}
                    style={styles.logoutButton}
                >
                    <MaterialIcons name="logout" color={'black'} size={24}/>
                </Button>
            </View>
        </View>
    );
};

export default Header;