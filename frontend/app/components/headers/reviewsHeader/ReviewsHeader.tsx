import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Pressable } from "react-native";
import styles from "./ReviewsHeader.style"
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import theme from "@/app/theme/theme";

interface ReviewHeaderProps {
  rating: number;
  totalReviews: number;
}

const ReviewHeader = ({ rating, totalReviews }: ReviewHeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.averageRating}>{rating.toFixed(1)}</Text>
        <Text style={styles.ratingText}>out of 5</Text>
        <Text style={styles.totalReviews}>({totalReviews} reviews)</Text>
      </View>

      <Pressable
        onPress={() => {
          navigation.goBack();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        style={styles.backButton}
        android_ripple={{ color: theme.colors.ripple }}
      >
        <MaterialIcons name="arrow-back" size={28} style={styles.backButton}/>
      </Pressable>
    </View>
  );
};

export default ReviewHeader;