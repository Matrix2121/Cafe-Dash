import styles from "@/app/screens/profile/Profile.style";
import {Image, ImageBackground, Modal, Pressable, Text, View} from "react-native";
import React, {useState} from "react";
import {RootStackParamList} from "@/app/navigation/Navigation";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import profileImage from "../../assets/images/profileScreen/profile.png";
import editImage from "../../assets/images/profileScreen/edit.png";
import profileBackground from "../../assets/images/profileScreen/profileBackground.jpg";
import orders from "../../assets/images/profileScreen/orders.png";
import {TextInput} from "react-native-paper";
import updateImage from "../../assets/images/login-background.jpg";
import useUser from "@/app/hooks/useUser";
import { List } from 'react-native-paper';
import HasRoles from "@/app/utilComponents/HasRoles";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";


type ProfileScreenRouteProp = RouteProp<RootStackParamList, "profile">;

interface IProps {
    route: ProfileScreenRouteProp;
}

const Profile = ({route}: IProps) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {userId} = route.params;
    const {user, users, fetchAllUsers, updateUser, loading, error} = useUser(userId);
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [expanded, setExpanded] = useState(false);

    const handleSubmit = () => {
        if (!user || !user.id) {
            console.error('User or user.id is undefined');
            return;
        }
        const updatedUser = {
            id: user.id,
            username: username || user.username,
            email: email || user.email,
        };

        updateUser(updatedUser, user.id);
        setEditUsername(false);
        setEditEmail(false);
        setModalVisible(false);
    };

    const handlePress = () => {
        setExpanded(prev => {
            const next = !prev;
            if (next && users.length === 0) {
                fetchAllUsers();
            }
            return next;
        });
    };

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const [editUsername, setEditUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const toggleUsernameEdit = () => setEditUsername(prev => !prev);
    const toggleEmailEdit = () => setEditEmail(prev => !prev);

    return (
        <View style={styles.profileContainer}>
            <CommonHeader title="Profile"/>
            <View style={styles.imageContainer}>
                <Image source={profileBackground} style={styles.imageLogo}/>
            </View>

            <View style={styles.profileLogoContainer}>
                <Pressable style={styles.circle}>
                    <Text style={styles.letterInsideTheLogo}>{user?.username.charAt(0).toUpperCase()}</Text>
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
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.title}><Text style={styles.highlight}>Edit </Text>Profile:</Text>
                                        </View>
                                        <View style={styles.editContainer}>
                                            {editUsername ? (
                                                <TextInput
                                                    label={user?.username}
                                                    value={username}
                                                    onChangeText={setUsername}
                                                    style={styles.input}
                                                    mode="outlined"
                                                    editable={editUsername}
                                                />
                                            ) : (
                                                <Text style={styles.editInput}>Username: {user?.username}</Text>
                                            )}
                                            <Pressable onPress={toggleUsernameEdit} style={styles.editButton}>
                                                <Image source={editImage} style={styles.editLogo}/>
                                            </Pressable>
                                        </View>
                                        <View style={styles.editContainer}>
                                            {editEmail ? (
                                                <TextInput
                                                    label={user?.email}
                                                    value={email}
                                                    onChangeText={setEmail}
                                                    style={styles.input}
                                                    mode="outlined"
                                                    editable={editEmail}
                                                />
                                            ) : (
                                                <Text style={styles.editInput}>Email: {user?.email}</Text>
                                            )}
                                            <Pressable onPress={toggleEmailEdit} style={styles.editButton}>
                                                <Image source={editImage} style={styles.editLogo}/>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Pressable onPress={closeModal} style={styles.pressableDetails}>
                                            <Text style={styles.pressableText}>Close</Text>
                                        </Pressable>
                                        <Pressable onPress={handleSubmit} style={styles.pressableSubmit}>
                                            <Text style={styles.pressableText}>Submit</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </Modal>
            </View>
            <View style={styles.orderContainer}>
                <Pressable
                    style={styles.rowContainer}
                    onPress={() => navigation.navigate("orders")}
                >
                    <Image source={orders} style={styles.logo}/>
                    <Text style={styles.orderTextLogo}>Previous Orders</Text>
                </Pressable>
            </View>
            <HasRoles roles={['admin']}>
                <View style={styles.accordion}>
                    <List.Section>
                        <List.Accordion
                            title="All Users"
                            expanded={expanded}
                            onPress={handlePress}
                            left={props => <List.Icon {...props} icon="account-group" />}
                        >
                            {loading && <Text style={styles.loading}>Loading users...</Text>}
                            {error && <Text style={styles.error}>Error: {error}</Text>}
                            {!loading && users.map((user) => (
                                <Pressable onPress={() => navigation.navigate('profile', {userId: user.id})}>
                                    <List.Item
                                        key={user.id}
                                        title={user.username}
                                        description={() => (
                                            <View>
                                                <Text>Email: {user.email}</Text>
                                                <Text>Roles: {user.roles.map(role => role.roleName).join(', ')}</Text>
                                            </View>
                                        )}
                                        left={() => <List.Icon icon="account" />}
                                    />
                                </Pressable>
                            ))}
                        </List.Accordion>
                    </List.Section>
                </View>
            </HasRoles>
        </View>
    )
}

export default Profile;