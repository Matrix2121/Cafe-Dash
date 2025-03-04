import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './CafeItem.style'

type CafeItemProps = {
  label: string;
  value: string;
};

const CafeItem = ({ label, value }: CafeItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default CafeItem