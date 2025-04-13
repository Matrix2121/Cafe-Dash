import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Review } from "@/app/types/items";
import HasRoles from "@/app/utilComponents/HasRoles";
import styles from "./UserReviewCard.style";

interface Props {
  review: Review;
}

const UserReviewCard = ({ review }: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topRow}>
        <View style={styles.reviewInfoContainer}>
          <Text style={styles.reviewTitle}>{review.title}</Text>
          <Text style={styles.reviewBody}>{review.body}</Text>
          <Text style={styles.reviewRating}>Rating: {review.rating}/5</Text>
        </View>

        <HasRoles roles={["admin"]}>
          <View style={styles.adminButtonContainer}>
            <Pressable
              style={[styles.adminButton, styles.editButton]}
              onPress={() => navigation.navigate("reviewedit", { reviewId: review.id })}
            >
              <Text style={styles.adminButtonText}>Edit</Text>
            </Pressable>
            <Pressable
              style={[styles.adminButton, styles.deleteButton]}
              onPress={() => {
                // implement delete logic
              }}
            >
              <Text style={styles.adminButtonText}>Delete</Text>
            </Pressable>
          </View>
        </HasRoles>
      </View>

      <View style={styles.bottomButtonContainer}>
        <Pressable
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate("cafereviews", { cafe: review.cafeteria })
          }
        >
          <Text style={styles.actionButtonText}>View Café</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserReviewCard;
