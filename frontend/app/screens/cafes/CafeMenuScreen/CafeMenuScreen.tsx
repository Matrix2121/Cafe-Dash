import React from 'react';
import { FlatList, SectionList, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ItemCard from '../../../components/ItemCard/ItemCard';
import useProducts from '@/app/hooks/useProducts';
import styles from './CafeMenuScreen.style';
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";

const CafeMenuScreen = ({ route }: { route: { params: { cafeId: number } } }) => {
    const { cafeId } = route.params; 
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
    const handleShowDetails = (cafeId: number) => {
      navigation.navigate('CafeDetailScreen', { cafeId });
    };

    const { products, loading, error } = useProducts();

    const hasData = !!products && products.length > 0;

    if (loading || error || !hasData) {
        return <LoadingErrorView loading={loading} error={error} dataAvailable={hasData} />;
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

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Cafe Menu</Text>
        <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleShowDetails(cafeId)}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
    </View>

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