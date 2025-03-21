import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Review } from '@/app/types/items';
import styles from './ReviewCard.style';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const { title, body, rating, createdAt } = review;
    const ratingStars = '⭐'.repeat(rating);
  
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            
            <View style={styles.starsWrapper}>
              <Text style={styles.rating}>{ratingStars}</Text>
            </View>
          </View>
  
          <Text style={styles.body}>{body}</Text>
          
          <View style={styles.footer}>
            <Text style={styles.date}>
              {new Date(createdAt).toLocaleDateString()}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };
  

export default ReviewCard;