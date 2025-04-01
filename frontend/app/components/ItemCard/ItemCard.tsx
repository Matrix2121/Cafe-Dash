import React from 'react';
import {View, Text, TouchableOpacity, Alert, ImageSourcePropType, Image} from 'react-native';
import { Product } from '../../types/items';
import styles from './ItemCard.style';
import { useCart } from '@/app/context/CartContext';
import {SvgUri} from "react-native-svg";

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
                <SvgUri
                    width="60"
                    height="60"
                    uri = 'https://cafedashstorage.blob.core.windows.net/svgs/coffe-plus.svg'
                    />
            </TouchableOpacity>
            <Image
                source={{uri: product.imageUrl}}
                style={styles.image}
                defaultSource={require('@/app/assets/images/logo.png')}
            />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
    );
};

export default ItemCard;