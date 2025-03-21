import React, { useEffect } from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { FlatList, SectionList, View, Text, TouchableOpacity } from "react-native";
import ItemCard from "../../../components/ItemCard/ItemCard";
import useProducts from "@/app/hooks/useProducts";
import styles from "./CafeMenuScreen.style";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";

type CafeMenuScreenRouteProp = RouteProp<RootStackParamList, "CafeMenuScreen">;

interface IProps {
  route: CafeMenuScreenRouteProp;
}

const CafeMenuScreen = ({ route }: IProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { cafeId } = route.params;

    const handleShowReviews = (cafeId: number) => {
      navigation.navigate('CafeReviewScreen', { cafeId });
    };

    const handleShowDetails = (cafeId: number) => {
      navigation.navigate('CafeDetailScreen', { cafeId });
    };

    const { products, fetchAllProducts, loading, error } = useProducts();
      useEffect(() => {
        fetchAllProducts();
    }, []);

  const hasData = !!products && products.length > 0;
  if (loading || error || !hasData) {
    return (
      <LoadingErrorView
        loading={loading}
        error={error}
        dataAvailable={hasData}
      />
    );
  }

  const sections = [
    {
      title: "Drinkables",
      data: products.filter((item) => item.productType === "DRINKS"),
    },
    {
      title: "Promotion",
      data: products.filter((item) => item.productType === "PROMO"),
    },
    {
      title: "Eating",
      data: products.filter((item) => item.productType === "Eating"),
    },
  ];

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Menu</Text>

        <TouchableOpacity style={styles.detailsButton} onPress={() => handleShowReviews(cafeId)}>
          <Text style={styles.detailsButtonText}>Reviews</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailsButton} onPress={() => handleShowDetails(cafeId)}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
    </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({}) => null}
        renderSectionFooter={({ section }) => (
          <FlatList
            data={section.data}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <ItemCard product={item} />
              </View>
            )}
            contentContainerStyle={styles.itemList}
          />
        )}
      />
    </View>
  );
};

export default CafeMenuScreen;