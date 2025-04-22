import styles from "@/app/screens/profile/Profile.style";
import {
    Image,
    Pressable, ScrollView,
    Text,
    View,
} from "react-native";
import React, {useState} from "react";
import {RootStackParamList} from "@/app/navigation/Navigation";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import profileBackground from "../../assets/images/profileScreen/profileBackground.jpg";
import orders from "../../assets/images/profileScreen/orders.png";
import useUser from "@/app/hooks/useUser";
import useAllUsers from "@/app/hooks/useAllUsers";
import {List} from "react-native-paper";
import HasRoles from "@/app/utilComponents/HasRoles";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";

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

    const [expanded, setExpanded] = useState(false);

    const handlePress = () => {
        setExpanded((prev) => {
            const next = !prev;
            if (next && allUsers.length === 0) {
                fetchAllUsers();
            }
            return next;
        });
    };

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
