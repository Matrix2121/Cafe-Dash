import React from "react";
import { FlatList, View, Text } from "react-native";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";
import { User } from "@/app/types/items";
import UserCard from "@/app/components/userCard/UserCard";
import styles from "./UsersList.style";
import { useAuth } from "@/app/context/AuthContext";
import useAllUsers from "@/app/hooks/useAllUsers";

const UsersList = () => {
  const { users, loading, error } = useAllUsers();
  const { user } = useAuth();

  const filteredUsers = user ? users.filter(u => u.id !== user.id) : users;

  if (loading) {
    return (
      <LoadingErrorView
        loading={true}
        error={null}
        dataAvailable={false}
      />
    );
  }

  if (error) {
    return (
      <LoadingErrorView
        loading={false}
        error={error}
        dataAvailable={false}
      />
    );
  }

  if (filteredUsers.length <= 0) {
    return (
        <LoadingErrorView
        loading={false}
        error={"No users besides yourself"}
        dataAvailable={false}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <CommonHeader title="List of Users"/>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={filteredUsers}
        keyExtractor={(item: User) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </View>
  );
};

export default UsersList;
