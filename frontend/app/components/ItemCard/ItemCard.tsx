import React from 'react';
import {View, Text, TouchableOpacity, Alert, ImageSourcePropType, Image} from 'react-native';
import { Product } from '../../types/items';
import styles from './ItemCard.style';
import { useCart } from '@/app/context/CartContext';

type ItemCardProps = {
    product: Product;
};

const ItemCard = ({product}: ItemCardProps) => {
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        try {
            addToCart(product);
        } catch (error) {
            Alert.alert('Error', 'Failed to add product to cart');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <Image
                source={product.imageUrl as ImageSourcePropType}
                style={styles.image}
                defaultSource={require('@/app/assets/images/logo.png')}
            />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
    );
};

export default ItemCard;