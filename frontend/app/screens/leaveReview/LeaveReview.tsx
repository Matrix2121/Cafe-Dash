import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { AirbnbRating } from "react-native-ratings"; // Install this package: npm install react-native-ratings

import styles from "./LeaveReview.style"
import theme from "@/app/theme/theme";
import useReviews from "@/app/hooks/useReviews";

type LeaveReviewRouteProp = RouteProp<RootStackParamList, "leavereview">;

interface LeaveReviewProps {
  route: LeaveReviewRouteProp;
}

const LeaveReview = ({ route }: LeaveReviewProps) => {
  const { cafeteriaId } = route.params
  const { postReview } = useReviews(cafeteriaId);

  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmitReview = async () => {
    if (!title || rating === 0) {
      Alert.alert("Error", "Please fill out all required fields and provide a rating.");
      return;
    }

    const reviewData = {
      title,
      body: body?.trim() || undefined,
      rating,
      cafeteriaId,
      userId: 1,
    };

    postReview(reviewData);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leave a Review</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.label}>Rating:</Text>
        <AirbnbRating
          defaultRating={rating}
          onFinishRating={(newRating: number) => setRating(newRating)}
          size={32}
          showRating={false}
          selectedColor={theme.colors.primary}
        />
      </View>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a title for your review (required)"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Comment:</Text>
      <TextInput
        style={[styles.input, styles.commentInput]}
        placeholder="Write your review here... (optional)"
        value={body}
        onChangeText={setbody}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LeaveReview;