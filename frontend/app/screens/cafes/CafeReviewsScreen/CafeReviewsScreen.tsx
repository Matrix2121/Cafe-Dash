import React from 'react';
import { RootStackParamList } from "@/app/navigation/Navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { ScrollView, Text, FlatList } from 'react-native';
import ReviewCard from '@/app/components/reviewCard/ReviewCard';
import useReviews from '@/app/hooks/useReviews';
import LoadingErrorView from '@/app/components/errorView/LoadingErrorView';
import styles from './CafeReviewsScreen.style'
import ReviewHeader from '@/app/components/reviewsHeader/ReviewsHeader';

type CafeReviewsRouteProp = RouteProp<RootStackParamList, "CafeReviewsScreen">;

interface CafeReviewsScreenProps {
    route: CafeReviewsRouteProp;
}

const CafeReviewsScreen = ({ route }: CafeReviewsScreenProps) => {
    const { cafe } = route.params;
    const { reviews, loading, error } = useReviews(cafe.id);

    const hasData = Array.isArray(reviews) && reviews.length > 0;

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLeaveReview = () => {
        navigation.navigate('LeaveReviewScreen', { cafeteriaId : cafe.id });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ReviewHeader
                rating={cafe.rating}
                totalReviews={cafe.countReview}
                onLeaveReview={handleLeaveReview}
            />
    
            {loading || error ? (
                <LoadingErrorView loading={loading} error={error} dataAvailable={hasData} />
            ) : !hasData ? (
                <Text style={styles.noReviews}>No reviews yet for this cafe</Text>
            ) : (
                <FlatList 
                    data={reviews} 
                    renderItem={({ item }) => <ReviewCard key={item.id} review={item} />} 
                />
            )}
        </ScrollView>
    );
    
};

export default CafeReviewsScreen;