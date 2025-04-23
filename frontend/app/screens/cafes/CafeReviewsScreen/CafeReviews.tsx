import React, { useEffect } from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import ReviewCard from "@/app/components/reviewCard/ReviewCard";
import useReviews from "@/app/hooks/useReviews";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import styles from "./CafeReviews.style";
import ReviewHeader from "@/app/components/headers/reviewsHeader/ReviewsHeader";
import useCafes from "@/app/hooks/useCafes";
import { useTranslation } from 'react-i18next';

type CafeReviewsRouteProp = RouteProp<RootStackParamList, "cafereviews">;

interface CafeReviewsProps {
  route: CafeReviewsRouteProp;
}

const CafeReviews = ({ route }: CafeReviewsProps) => {
  const { cafe } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { reviews, loading, error, fetchReviewsByCafeId } = useReviews(cafe.id);
  const { cafe: updatedCafe, refreshCafeteria } = useCafes(cafe.id);
  const { t } = useTranslation();

    useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchReviewsByCafeId(cafe.id);
      refreshCafeteria(cafe.id);
    });

    return unsubscribe;
  }, [navigation, cafe.id]);

  const hasData = Array.isArray(reviews) && reviews.length > 0;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        data={reviews}
        ListHeaderComponent={
          <>
            <ReviewHeader
              rating={updatedCafe?.rating ?? cafe.rating}
              totalReviews={updatedCafe?.countReview ?? cafe.countReview}
            />
            {loading || error ? (
              <LoadingErrorView
                loading={loading}
                error={error}
                dataAvailable={hasData}
              />
            ) : null}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <Text style={styles.noReviews}>No reviews yet for this cafe</Text>
          ) : null
        }
        renderItem={({ item }) => <ReviewCard key={item.id} review={item} />}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("leavereview", { cafe })}
      >
        <Text style={styles.floatingButtonText}>{t("review")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CafeReviews;