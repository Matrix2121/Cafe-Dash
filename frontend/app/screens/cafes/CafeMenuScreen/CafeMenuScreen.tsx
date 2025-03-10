import React from 'react';
import { FlatList, SectionList, View, Text, ActivityIndicator } from 'react-native';
import ItemCard from '../../../components/ItemCard/ItemCard';
import useProducts from '@/app/hooks/useProducts';
import styles from './CafeMenuScreen.style';

const CafeMenuScreen = () => {
    const { products, loading, error } = useProducts();

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#444444" />
          <Text>Loading cafe details...</Text>
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }
  
    if (!products) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No cafe data available.</Text>
        </View>
      );
    }

    const drinkables = products.filter(item => item.productType === 'DRINKABLE');
    const edibles = products.filter(item => item.productType === 'EDIBLE');

    const sections = [
      {
        title: 'Drinkables',
        data: drinkables,
      },
      {
        title: 'Edibles',
        data: edibles,
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
      renderItem={() => null} // Don't render anything directly for SectionList items
      contentContainerStyle={styles.container}
      renderSectionFooter={({ section }) => (
        <FlatList
          data={section.data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Display 2 items per row
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <ItemCard item={item} />
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