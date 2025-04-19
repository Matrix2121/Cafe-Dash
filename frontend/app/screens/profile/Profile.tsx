import styles from "@/app/screens/profile/Profile.style";
import {
    Image,
    ImageBackground,
    Modal,
    Pressable, ScrollView,
    Text,
    View,
} from "react-native";
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
import useAllUsers from "@/app/hooks/useAllUsers";
import {List} from "react-native-paper";
import HasRoles from "@/app/utilComponents/HasRoles";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";
import {ResponsiveLayout} from "@/app/orientation/ResponsiveLayout";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "profile">;

interface IProps {
    route: ProfileScreenRouteProp;
}

const Profile = ({route}: IProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {userId} = route.params;

    const {
        user,
        updateUser,
        loading: loadingUser,
        error: errorUser,
    } = useUser(userId);

    const {
        fetchAllUsers,
        users: allUsers,
        loading: loadingUsers,
        error: errorUsers,
    } = useAllUsers();

    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const handleSubmit = () => {
        if (!user || !user.id) return;

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
        setExpanded((prev) => {
            const next = !prev;
            if (next && allUsers.length === 0) {
                fetchAllUsers();
            }
            return next;
        });
    };

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const toggleUsernameEdit = () => setEditUsername((prev) => !prev);
    const toggleEmailEdit = () => setEditEmail((prev) => !prev);

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.profileContainer}>
                <CommonHeader title="Profile"/>

                <View style={styles.imageContainer}>
                    <Image source={profileBackground} style={styles.imageLogo}/>
                </View>

                <View style={styles.profileLogoContainer}>
                    <Pressable style={styles.circle}>
                        <Text style={styles.letterInsideTheLogo}>
                            {user?.username.charAt(0).toUpperCase()}
                        </Text>
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
                        <ImageBackground
                            source={updateImage}
                            style={styles.modalContainer}
                            resizeMode="cover"
                        >
                            <View style={styles.m}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.profileDetailsContainer}>
                                        <View style={styles.form}>
                                            <View style={styles.titleContainer}>
                                                <Text style={styles.title}>
                                                    <Text style={styles.highlight}>Edit </Text>Profile:
                                                </Text>
                                            </View>

                                            <View style={styles.editContainer}>
                                                {editUsername ? (
                                                    <TextInput
                                                        label={user?.username}
                                                        value={username}
                                                        onChangeText={setUsername}
                                                        style={styles.input}
                                                        mode="outlined"
                                                    />
                                                ) : (
                                                    <Text style={styles.editInput}>
                                                        Username: {user?.username}
                                                    </Text>
                                                )}
                                                <Pressable
                                                    onPress={toggleUsernameEdit}
                                                    style={styles.editButton}
                                                >
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
                                                    />
                                                ) : (
                                                    <Text style={styles.editInput}>
                                                        Email: {user?.email}
                                                    </Text>
                                                )}
                                                <Pressable
                                                    onPress={toggleEmailEdit}
                                                    style={styles.editButton}
                                                >
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
                        onPress={() => navigation.navigate("orders", {userId})}
                    >
                        <Image source={orders} style={styles.logo}/>
                        <Text style={styles.orderTextLogo}>Previous Orders</Text>
                    </Pressable>
                </View>

                <HasRoles roles={["admin"]}>
                    <View style={styles.accordion}>
                        <List.Section>
                            <List.Accordion
                                title="All Users"
                                expanded={expanded}
                                onPress={handlePress}
                                left={(props) => <List.Icon {...props} icon="account-group"/>}
                            >
                                {loadingUsers && <Text style={styles.loading}>Loading users...</Text>}
                                {errorUsers && <Text style={styles.error}>Error: {errorUsers}</Text>}
                                {!loadingUsers &&
                                    allUsers.map((u) => (
                                        <Pressable
                                            key={u.id}
                                            onPress={() => navigation.navigate("profile", {userId: u.id})}
                                        >
                                            <List.Item
                                                title={u.username}
                                                description={() => (
                                                    <View>
                                                        <Text>Email: {u.email}</Text>
                                                        <Text>Roles: {u.roles.map((r) => r.roleName).join(", ")}</Text>
                                                    </View>
                                                )}
                                                left={() => <List.Icon icon="account"/>}
                                            />
                                        </Pressable>
                                    ))}
                            </List.Accordion>
                        </List.Section>
                    </View>
                </HasRoles>
            </View>
        </ScrollView>
    );
};

export default Profile;
