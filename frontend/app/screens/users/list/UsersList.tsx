import React from "react";
import { FlatList, View, Text } from "react-native";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";
import { User } from "@/app/types/items";
import UserCard from "@/app/components/userCard/UserCard";
import styles from "./UsersList.style";
import { useAuth } from "@/app/context/AuthContext";
import useAllUsers from "@/app/hooks/useAllUsers";
import {useTranslation} from "react-i18next";

const UsersList = () => {
  const { users } = useAllUsers();
  const { user } = useAuth();

  const filteredUsers = user ? users.filter(u => u.id !== user.id) : users;
  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <CommonHeader title={t("see-users")}/>
      {users && <FlatList
        contentContainerStyle={styles.listContainer}
        data={filteredUsers}
        keyExtractor={(item: User) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
      />}
    </View>
  );
};

export default UsersList;
