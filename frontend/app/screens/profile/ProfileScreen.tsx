import styles from "@/app/screens/profile/ProfileScreen.style";
import {Image, Pressable, Text, View} from "react-native";
import React from "react";
import {RootStackParamList} from "@/app/navigation/navigation";
import {RouteProp} from "@react-navigation/native";
import logout from "../../assets/images/logout.png";
import profileBackground from "../../assets/images/profileBackground.jpg";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

interface IProps {
    route: ProfileScreenRouteProp;
}

const ProfileScreen = ({ route } : IProps) => {
    const {username, age, userRole} = route.params;
    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
                <Image source={profileBackground} style={styles.imageLogo}/>
            </View>
            <View style={styles.profileLogoContainer}>
                <Pressable style={styles.circle}>
                    <Text style={styles.letterInsideTheLogo}>{username.charAt(0)}</Text>
                </Pressable>
                <Text style={styles.profileTextLogo}>{username}</Text>
                <Text style={styles.secondaryText}>{userRole}</Text>
            </View>
            <View style={styles.orderContainer}>
                <Pressable style={styles.rowContainer}>
                    <Image source={logout} style={styles.notificationLogo} />
                    <Text style={styles.orderTextLogo}>Logout</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ProfileScreen;