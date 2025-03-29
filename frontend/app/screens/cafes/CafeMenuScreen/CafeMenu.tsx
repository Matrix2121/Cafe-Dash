import React, {useEffect} from "react";
import {RootStackParamList} from "@/app/navigation/Navigation";
import {RouteProp, useNavigation, CommonActions} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import {FlatList, SectionList, View, Text, TouchableOpacity} from "react-native";
import ItemCard from "../../../components/ItemCard/ItemCard";
import useProducts from "@/app/hooks/useProducts";
import styles from "./CafeMenu.style";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import {useCart} from "@/app/context/CartContext";

type CafeMenuRouteProp = RouteProp<RootStackParamList, "cafemenu">;

interface CafeMenuProps {
    route: CafeMenuRouteProp;
}

const CafeMenu = ({route}: CafeMenuProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {cafe} = route.params;

    const {products, fetchAllProductByCafeteriaId, loading, error} = useProducts();
    const {productsCount, totalPrice} = useCart();

    useEffect(() => {
        fetchAllProductByCafeteriaId(cafe.id);
    }, [cafe.id]);

    const hasData = Array.isArray(products) && products.length > 0;

    const sections = [
        {
            title: "Drinks",
            data: Array.isArray(products) ? products.filter((item) => item.productType === "DRINKS") : [],
        },
        {
            title: "Promotion",
            data: Array.isArray(products) ? products.filter((item) => item.productType === "PROMO") : [],
        },
        {
            title: "Eating",
            data: Array.isArray(products) ? products.filter((item) => item.productType === "Eating") : [],
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Menu</Text>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('cafereviews', {cafe})}>
                    <Text style={styles.detailsButtonText}>Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('cafedetail', {cafe})}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
            </View>

            {(loading || error || !hasData) ? (
                <LoadingErrorView
                    loading={loading}
                    error={error}
                    dataAvailable={hasData}
                />
            ) : (
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id.toString()}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    renderItem={({}) => null}
                    renderSectionFooter={({section}) => (
                        <FlatList
                            data={section.data}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            renderItem={({item}) => (
                                <View style={styles.itemContainer}>
                                    <ItemCard product={item}/>
                                </View>
                            )}
                            contentContainerStyle={styles.itemList}
                        />
                    )}
                />
            )}
            {productsCount > 0 && (
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: 'home',
                                        params: {
                                            screen: 'cart'
                                        }
                                    }
                                ],
                            })
                        );
                    }}
                >
                    <Text style={styles.cartButtonText}>View Cart</Text>
                    <Text style={styles.cartTotalText}>${totalPrice.toFixed(2)}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CafeMenu;