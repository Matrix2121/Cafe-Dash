import React from "react";
import {View, Text, Pressable} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import CafeCard from "@/app/components/cafeCard/CafeCard";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import useCafes from "../../../hooks/useCafes";
import {Cafeteria} from "@/app/types/items";
import styles from "./CafesList.style";
import {useAuth} from "@/app/context/AuthContext";
import {SvgUri} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/app/navigation/Navigation";
import HasRoles from "@/app/utilComponents/HasRoles";
import { Card } from "react-native-paper";

const CafesList = () => {
    const {cafes, loading, error} = useCafes();
    const {user} = useAuth();
    const hasData = Array.isArray(cafes) && cafes.length > 0;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    if (!user || !user.id) {
        console.error('User or user.id is undefined');
        return;
    }

    if (loading || error) {
        return (
            <View style={styles.loadingErrorContainer}>
                <LoadingErrorView
                    loading={loading}
                    error={error}
                    dataAvailable={hasData}
                />
            </View>
        );
    }

    if (!hasData) {
        return (
            <View style={styles.loadingErrorContainer}>
                <Text style={styles.noDataText}>No cafeterias available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.gridContainer}>
                    <HasRoles roles={['admin']}>
                        <Card>
                            <Pressable onPress={() => navigation.navigate("createcafeteria")}
                                       style={styles.addCafeteria}>
                                <SvgUri
                                    uri={'https://cafedashstorage.blob.core.windows.net/svgs/plus-white.svg'}
                                    width={80}
                                    height={80}
                                />
                            </Pressable>
                        </Card>
                    </HasRoles>
                    {cafes.map((cafe: Cafeteria) => (
                        <View key={cafe.id} style={styles.cardWrapper}>
                            <CafeCard cafe={cafe}/>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default CafesList;