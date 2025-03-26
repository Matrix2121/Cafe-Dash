import React from 'react';
import { View } from 'react-native';
import Header from '@/app/components/mainLayout/header/Header';
import Footer from '@/app/components/mainLayout/footer/Footer';
import styles from './Home.style';
import ProtectedRoute from '@/app/navigation/ProtectedRoute';

const Home = () => {
  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Header/>
        <Footer/>
      </View>
    </ProtectedRoute>
  );
};

export default Home;