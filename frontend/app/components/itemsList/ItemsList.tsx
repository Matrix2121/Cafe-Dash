import React from "react";
import { FlatList, SectionList, View, Text } from "react-native";
import ItemCard from "@/app/components/itemCard/ItemCard";
import { Product } from "@/app/types/items";
import styles from "./ItemsList.style";
import { useTranslation } from 'react-i18next';

interface ItemsList {
  products: Product[];
}

const ItemsList = ({ products }: ItemsList) => {
    const { t } = useTranslation();
    const sections = [
    {
      title: t('drinks'),
      data: Array.isArray(products)
        ? products.filter((item) => item.productType === "DRINKS")
        : [],
    },
    {
      title: t('promo'),
      data: Array.isArray(products)
        ? products.filter((item) => item.productType === "PROMO")
        : [],
    },
    {
      title: t('eating'),
      data: Array.isArray(products)
        ? products.filter((item) => item.productType === "EATING")
        : [],
    },
  ].filter((section) => section.data.length > 0);

  return (
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
      contentContainerStyle={styles.listContent}
    />
  );
};
export default ItemsList;
