import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ReviewsHeader.style"

interface ReviewHeaderProps {
  rating: number;
  totalReviews: number;
  onLeaveReview: () => void;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ rating, totalReviews, onLeaveReview }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.averageRating}>{rating.toFixed(1)}</Text>
        <Text style={styles.ratingText}>out of 5</Text>
        <Text style={styles.totalReviews}>({totalReviews} reviews)</Text>
      </View>

      <TouchableOpacity style={styles.leaveReviewButton} onPress={onLeaveReview}>
        <Text style={styles.leaveReviewButtonText}>Leave a Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewHeader;