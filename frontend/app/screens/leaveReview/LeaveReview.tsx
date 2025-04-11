import React, { useState } from "react";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import styles from "./LeaveReview.style"
import theme from "@/app/theme/theme";
import useReviews from "@/app/hooks/useReviews";
import {useAuth} from "@/app/context/AuthContext";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";

type LeaveReviewRouteProp = RouteProp<RootStackParamList, "leavereview">;

interface LeaveReviewProps {
  route: LeaveReviewRouteProp;
}

const LeaveReview = ({ route }: LeaveReviewProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { cafe } = route.params;
  const cafeteriaId = cafe.id;
  const { postReview, loading, error } = useReviews(cafeteriaId);

  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [rating, setRating] = useState(0);
  const {user} = useAuth();

  const handleSubmitReview = async () => {
    if (!title || rating === 0) {
      Alert.alert("Invalid input", "Please fill out all required fields and provide a rating.");
      return;
    }

    if (!user) {
        Alert.alert("User id is not correct.");
        return;
    }

    const reviewData = {
      title,
      body: body?.trim() || undefined,
      rating,
      cafeteriaId,
      userId: user.id,
    };

    await postReview(reviewData)
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <CommonHeader title="Leave a Review"/>
      <View style={styles.formContainer}>

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
    </View>
  );
};

export default LeaveReview;