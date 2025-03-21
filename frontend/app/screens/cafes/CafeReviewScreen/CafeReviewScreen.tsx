import React from 'react';
import { ScrollView, View, ActivityIndicator, Text, FlatList } from 'react-native';
import ReviewCard from '@/app/components/reviewCard/ReviewCard';
import useReview from '@/app/hooks/useReviews';
import LoadingErrorView from '@/app/components/errorView/LoadingErrorView';
import styles from './CafeReviewScreen.style'

const CafeReviewScreen = ({ route }: { route: { params: { cafeId: number } } }) => {
    const { cafeId } = route.params;
    const { reviews, loading, error } = useReview(cafeId);

    const hasData = !!reviews && reviews.length > 0;

    if (loading || error) {
        return <LoadingErrorView loading={loading} error={error} dataAvailable={hasData} />;
    }

    if (!hasData){
        return <Text style={styles.noReviews}>No reviews yet for this café</Text>
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <FlatList data={reviews} renderItem={({ item }) => (
                <ReviewCard key={item.id} review={item} />
            )}/>
        </ScrollView>
    );
};

export default CafeReviewScreen;