import React from "react";
import {Button, Image, ImageSourcePropType, Pressable} from "react-native";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/app/navigation/Navigation";
import {View, Text, ScrollView} from "react-native";
import styles from "./CafeDetail.style";
import {StackNavigationProp} from "@react-navigation/stack";

type CafeDetailRouteProp = RouteProp<RootStackParamList, "cafedetail">;

interface CafeDetailProps {
    route: CafeDetailRouteProp;
}

const CafeDetail = ({route}: CafeDetailProps) => {
    const {cafe} = route.params;

    const isValidTime = (time: string | null | undefined) => {
        return !!time && time !== "00:00:00";
    };
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.pageContainer}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{paddingBottom: 120}}
            >
                <View>
                    <View style={styles.returnContainer}>
                        <Text style={styles.title}>{cafe.name}:</Text>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image
                                style={styles.testButton}
                                source={require('@/app/assets/images/navigation.png')}
                            />
                        </Pressable>
                    </View>
                    <Image
                        source={cafe.imageUrl as ImageSourcePropType}
                        style={styles.headerImage}
                        resizeMode="cover"
                        defaultSource={require('@/app/assets/images/logo.png')}
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
                            {cafe.rating.toFixed(1)} ({cafe.countReview} Reviews)
                        </Text>
                    </View>
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
            <View style={styles.fixedBottomContainer}>
                <Pressable
                    style={styles.contactButton}
                    onPress={() => navigation.navigate('contact')}
                >
                    <Text style={styles.navigationButtonText}>Contact us here</Text>
                </Pressable>
                <Pressable
                    style={styles.navigationButton}
                    onPress={() => navigation.navigate('cafemenu', {cafe})}
                >
                    <Text style={styles.navigationButtonText}>Check {cafe.name} products</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default CafeDetail;
