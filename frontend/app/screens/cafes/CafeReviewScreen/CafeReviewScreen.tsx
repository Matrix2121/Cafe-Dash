import React from 'react';
import { RootStackParamList } from "@/app/navigation/Navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { ScrollView, Text, FlatList } from 'react-native';
import ReviewCard from '@/app/components/reviewCard/ReviewCard';
import useReviews from '@/app/hooks/useReviews';
import LoadingErrorView from '@/app/components/errorView/LoadingErrorView';
import styles from './CafeReviewScreen.style'
import ReviewHeader from '@/app/components/reviewsHeader/ReviewsHeader';

const CafeReviewScreen = ({ route }: { route: { params: { cafeId: number } } }) => {
    const { cafeId } = route.params;
    const { reviews, loading, error } = useReviews(cafeId);

    const hasData = Array.isArray(reviews) && reviews.length > 0;

    if (loading || error) {
        return <LoadingErrorView loading={loading} error={error} dataAvailable={hasData} />;
    }

    if (!hasData){
        return <Text style={styles.noReviews}>No reviews yet for this cafe</Text>
    }
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLeaveReview = () => {
        navigation.navigate('LeaveReviewScreen', { cafeId });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ReviewHeader
                averageRating={averageRating}
                totalReviews={totalReviews}
                onLeaveReview={handleLeaveReview}
            />
            <FlatList data={reviews} renderItem={({ item }) => (
                <ReviewCard key={item.id} review={item} />
            )}/>
        </ScrollView>
    );
};

export default CafeReviewScreen;