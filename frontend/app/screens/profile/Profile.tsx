import styles from "@/app/screens/profile/Profile.style";
import {Image, ImageBackground, Modal, Pressable, Text, View} from "react-native";
import React, {useState} from "react";
import {RootStackParamList} from "@/app/navigation/Navigation";
import {RouteProp} from "@react-navigation/native";
import profileImage from "../../assets/images/profileScreen/profile.png";
import profileBackground from "../../assets/images/profileScreen/profileBackground.jpg";
import orders from "../../assets/images/profileScreen/orders.png";
import useUser from "@/app/hooks/useUser";
import {TextInput} from "react-native-paper";
import updateImage from "../../assets/images/login-background.jpg";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "profile">;

interface IProps {
    route: ProfileScreenRouteProp;
}

const Profile = ({route}: IProps) => {
    const {userId} = route.params;
    const {user} = useUser(userId);
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
                <Image source={profileBackground} style={styles.imageLogo}/>
            </View>
            <View style={styles.profileLogoContainer}>
                <Pressable style={styles.circle}>
                    <Text style={styles.letterInsideTheLogo}>{user?.username.charAt(0)}</Text>
                </Pressable>
                <Text style={styles.profileTextLogo}>{user?.username}</Text>
                <Text style={styles.secondaryText}>{user?.email}</Text>

                <View style={styles.orderContainer}>
                    <Pressable style={styles.rowContainer} onPress={openModal}>
                        <Image source={profileImage} style={styles.logo}/>
                        <Text style={styles.orderTextLogo}>Profile details</Text>
                    </Pressable>
                </View>
                <Modal
                    visible={modalVisible}
                    onRequestClose={closeModal}
                    transparent={true}
                    animationType={"slide"}
                >
                    <ImageBackground source={updateImage}
                                     style={styles.modalContainer}
                                     resizeMode="cover">
                        <View style={styles.m}>
                            <View style={styles.modalContainer}>
                                <View style={styles.profileDetailsContainer}>
                                    <View style={styles.form}>
                                        <TextInput
                                            label="Username"
                                            value={username}
                                            onChangeText={setUsername}
                                            style={styles.input}
                                            mode="outlined"
                                            theme={{colors: {primary: '#774936', background: '#CECECC'}}}
                                        />

                                        <TextInput
                                            label="Email"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            style={styles.input}
                                            mode="outlined"
                                            theme={{colors: {primary: '#774936', background: '#CECECC'}}}
                                        />
                                    </View>
                                    <View>
                                        <Pressable onPress={closeModal} style={styles.pressableDetails}>
                                            <Text style={styles.pressableText}>Close</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </Modal>
            </View>
            <View style={styles.orderContainer}>
                <Pressable style={styles.rowContainer}>
                    <Image source={orders} style={styles.logo}/>
                    <Text style={styles.orderTextLogo}>Previous Orders</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Profile;