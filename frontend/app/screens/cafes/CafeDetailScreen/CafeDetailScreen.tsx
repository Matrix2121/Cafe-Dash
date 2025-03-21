import React, {useEffect} from "react";
import {Image} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "@/app/navigation/Navigation";
import {View, Text, ScrollView} from "react-native";
import styles from "./CafeDetailScreen.style";
import useCafeImage from "@/app/hooks/useCafeImage";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import useCafes from "@/app/hooks/useCafes";

type CafeDetailRouteProp = RouteProp<RootStackParamList, "CafeDetailScreen">;

interface CafeDetailScreenProps {
    route: CafeDetailRouteProp;
}

const CafeDetailScreen: React.FC<CafeDetailScreenProps> = ({route}) => {
    const {cafeId} = route.params;
    const {cafe, loading, error} = useCafes(cafeId);
    const {
        imageUrl,
        loading: loadingImage,
        error: errorImage,
    } = useCafeImage(cafeId);

    const isLoading = loading || loadingImage;
    const combinedError = error || errorImage;
    const hasData = !!cafe && !!imageUrl;

    if (isLoading || combinedError || !hasData) {
        return (
            <LoadingErrorView
                loading={loading}
                error={error}
                dataAvailable={hasData}
            />
        );
    }

    const isValidTime = (time: string | null | undefined) => {
        return !!time && time !== "00:00:00";
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{cafe.name}</Text>
            <Image
                source={{uri: imageUrl}} // Use `uri` for network images
                style={styles.headerImage}
                resizeMode="cover"
                onError={() => console.log("Error loading image")}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Brand:</Text>
                <Text style={styles.value}>{cafe.brand}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{cafe.location}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Rating:</Text>
                <Text style={styles.value}>
                    {cafe.rating} ({cafe.countReview} Reviews)
                </Text>
            </View>
            {isValidTime(cafe.openingHour) && isValidTime(cafe.closingHour) && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Opening Hours:</Text>
                    <Text style={styles.value}>
                        {cafe.openingHour} - {cafe.closingHour}
                    </Text>
                </View>
            )}
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{cafe.phoneNumber}</Text>
            </View>
        </ScrollView>
    );
};

export default CafeDetailScreen;
