import React from "react";
import {View, Text, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {User, Role} from "@/app/types/items";
import HasRoles from "@/app/utilComponents/HasRoles";
import styles from "./UserCard.style";
import {useTranslation} from "react-i18next";

interface UserCardProps {
    user: User;
}

const UserCard = ({user}: UserCardProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { t } = useTranslation();

    return (
        <View style={styles.cardContainer}>
            <View style={styles.topRow}>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.email}>{user.email}</Text>

                    <HasRoles roles={["admin"]}>
                        <View style={styles.rolesContainer}>
                            <Text style={styles.rolesLabel}>{t("role")}:</Text>
                            {user.roles.length > 0 ? (
                                user.roles.map((role: Role, index: number) => (
                                    <Text key={index} style={styles.role}>
                                        {role.roleName}
                                    </Text>
                                ))
                            ) : (
                                <Text style={styles.role}>None</Text>
                            )}
                        </View>
                    </HasRoles>
                </View>

                <HasRoles roles={["admin"]}>
                    <View style={styles.adminButtonContainer}>
                        <Pressable
                            style={[styles.adminButton, styles.editButton]}
                            onPress={() => navigation.navigate("useredit", {userId: user.id})}
                        >
                            <Text style={styles.adminButtonText}>{t("edit")}</Text>
                        </Pressable>
                    </View>
                </HasRoles>
            </View>

            <View style={styles.bottomButtonContainer}>
                <Pressable
                    style={styles.actionButton}
                    onPress={() => navigation.navigate("orders", {userId: user.id})}
                >
                    <Text style={styles.actionButtonText}>{t("order")}</Text>
                </Pressable>
                <Pressable
                    style={styles.actionButton}
                    onPress={() => navigation.navigate("userreviews", {userId: user.id})}
                >
                    <Text style={styles.actionButtonText}>{t("reviews")}</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default UserCard;
