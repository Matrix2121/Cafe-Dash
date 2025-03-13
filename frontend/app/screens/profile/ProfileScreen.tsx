import styles from "@/app/screens/profile/ProfileScreen.style";
import {Text, TouchableHighlight, View} from "react-native";

const ProfileScreen = () => {
    return (
        <View style={styles.profileContainer}>
            <View style={styles.profileLogoContainer}>
                <Text style={styles.profileTextLogo}>"Hello"</Text>
                <TouchableHighlight style={styles.circle}>
                    <Text style={styles.letterInsideTheLogo}>A</Text>
                </TouchableHighlight>
            </View>
            <Text>"Hello"</Text>
        </View>
    )
}

export default ProfileScreen;