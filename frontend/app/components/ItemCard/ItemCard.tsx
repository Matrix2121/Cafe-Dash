import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Product} from '../../types/items';
import styles from './ItemCard.style';

type ItemCardProps = {
    product: Product;
};

const ItemCard = ({product}: ItemCardProps) => {
    const handleAddToCart = async () => {
        try {
            Alert.alert('Success', 'Item added to cart!');
        } catch (error) {
            Alert.alert('Error', 'Failed to add product to cart');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
    );
};

export default ItemCard;