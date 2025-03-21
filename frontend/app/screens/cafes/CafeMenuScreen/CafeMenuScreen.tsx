import React, { useEffect } from "react";
import { FlatList, SectionList, View, Text } from "react-native";
import ItemCard from "../../../components/ItemCard/ItemCard";
import useProducts from "@/app/hooks/useProducts";
import styles from "./CafeMenuScreen.style";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";

const CafeMenuScreen = () => {
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
      <Text style={styles.title}>Cafe Menu</Text>
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
