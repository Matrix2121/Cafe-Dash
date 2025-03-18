import styles from "@/app/screens/profile/ProfileScreen.style";
import {Image, Pressable, Text, View} from "react-native";
import React from "react";
import {RootStackParamList} from "@/app/navigation/navigation";
import {RouteProp} from "@react-navigation/native";
import profile from "../../assets/images/profileScreen/profile.png";
import profileBackground from "../../assets/images/profileScreen/profileBackground.jpg";
import orders from "../../assets/images/profileScreen/orders.png";

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
                    <Image source={profile} style={styles.logo} />
                    <Text style={styles.orderTextLogo}>Profile details</Text>
                </Pressable>
                <Pressable style={styles.rowContainer}>
                    <Image source={orders} style={styles.logo} />
                    <Text style={styles.orderTextLogo}>Previous Orders</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ProfileScreen;