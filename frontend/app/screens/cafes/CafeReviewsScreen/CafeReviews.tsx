import React, { useState, useCallback } from 'react';
import { RootStackParamList } from "@/app/navigation/Navigation";
import { RouteProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, FlatList, View } from 'react-native';
import ReviewCard from '@/app/components/reviewCard/ReviewCard';
import useReviews from '@/app/hooks/useReviews';
import LoadingErrorView from '@/app/components/errorView/LoadingErrorView';
import styles from './CafeReviews.style'
import ReviewHeader from '@/app/components/headers/reviewsHeader/ReviewsHeader';

type CafeReviewsRouteProp = RouteProp<RootStackParamList, "cafereviews">;

interface CafeReviewsProps {
    route: CafeReviewsRouteProp;
}

const CafeReviews = ({ route }: CafeReviewsProps) => {
    const { cafe } = route.params;
    const { reviews, loading, error, postReview, fetchReviewsByCafeId } = useReviews(cafe.id);

    const hasData = Array.isArray(reviews) && reviews.length > 0;

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    //hasFetched is used as a flag to check if the data is fetched when the screen comes into focus
    const [hasFetched, setHasFetched] = useState(false);
    
    //useFocusEffect is called every time the screen come into focus
    useFocusEffect(
        useCallback(() => {
            if(!hasFetched){
                fetchReviewsByCafeId(cafe.id);
                setHasFetched(true)
            }
        }, [hasFetched])
    );
    

    const handleLeaveReview = () => {
        navigation.navigate('leavereview', { 
            cafe,
            goingBack: () => setHasFetched(false), }); //sets the goingBack logic for when it is called in LeaveReview
    };

    return (
        <View style={styles.container}>
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
        </View>
    );
    
};

export default CafeReviews;