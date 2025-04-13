import React from "react";
import { FlatList, View, Text } from "react-native";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import useUserReviews from "@/app/hooks/useUserReviews";
import ReviewCard from "@/app/components/reviewCard/ReviewCard";
import styles from "./UserReviewsList.style";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/Navigation";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "userreviews">;

interface IProps {
  route: ProfileScreenRouteProp;
}

const UserReviewsList = ({ route }: IProps) => {
  const { userId } = route.params;
  const { reviews, loading, error } = useUserReviews(userId);

  const hasReviews = reviews.length > 0;

  return (
    <View style={styles.mainContainer}>
      <CommonHeader title="User Reviews" />

      {loading || error ? (
        <LoadingErrorView
          loading={loading}
          error={error}
          dataAvailable={hasReviews}
        />
      ) : !hasReviews ? (
        <Text style={styles.noReviews}>No reviews</Text> // 👈 custom message
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReviewCard review={item} />}
        />
      )}
    </View>
  );
};

export default UserReviewsList;
