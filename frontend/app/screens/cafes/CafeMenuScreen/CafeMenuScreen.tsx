import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import ItemCard from '../../../components/ItemCard/ItemCard';
import useItem from '@/app/hooks/useItem';
import styles from './CafeMenuScreen.style';

const CafeMenuScreen = () => {
    const { items, loading, error } = useItem();

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cafe Menu</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display 2 items per row
        renderItem={({ item }) => <ItemCard item={item} />}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default CafeMenuScreen;