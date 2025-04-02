import React, {useState, useCallback, useEffect} from 'react';
import { RootStackParamList } from "@/app/navigation/Navigation";
import { RouteProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, FlatList, View } from 'react-native';
import ReviewCard from '@/app/components/reviewCard/ReviewCard';
import useReviews from '@/app/hooks/useReviews';
import LoadingErrorView from '@/app/components/errorView/LoadingErrorView';
import styles from './CafeReviews.style'
import ReviewHeader from '@/app/components/headers/reviewsHeader/ReviewsHeader';
import useCafes from "@/app/hooks/useCafes";

type CafeReviewsRouteProp = RouteProp<RootStackParamList, "cafereviews">;

interface CafeReviewsProps {
    route: CafeReviewsRouteProp;
}

const CafeReviews = ({ route }: CafeReviewsProps) => {
    const { cafe } = route.params;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { reviews, loading, error, fetchReviewsByCafeId } = useReviews(cafe.id);
    const [shouldRefetch, setShouldRefetch] = useState(true);
    const {refreshCafeteria} = useCafes(cafe.id);

    useEffect(() => {
        if (shouldRefetch) {
            fetchReviewsByCafeId(cafe.id);
            // refreshCafeteria(cafe.id);
            setShouldRefetch(false);
        }
    }, [shouldRefetch]);

    const handleLeaveReview = () => {
        navigation.navigate('leavereview', {
            cafe,
            goingBack: () => setShouldRefetch(true),
        });
    };

    const hasData = Array.isArray(reviews) && reviews.length > 0;
    console.log(cafe);

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