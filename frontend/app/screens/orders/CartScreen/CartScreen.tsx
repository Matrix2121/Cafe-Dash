import React from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';
import styles from './CartScreen.styles';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Current Order</List.Subheader>
        <List.Item
          title="Cappuccino"
          description="Medium size"
          right={() => <Text style={styles.price}>$4.50</Text>}
        />
        <List.Item
          title="Croissant"
          description="Butter"
          right={() => <Text style={styles.price}>$3.00</Text>}
        />
      </List.Section>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: $7.50</Text>
      </View>
    </View>
  );
};

export default CartScreen;