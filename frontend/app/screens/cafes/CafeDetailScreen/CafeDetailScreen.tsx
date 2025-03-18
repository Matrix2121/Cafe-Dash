import React from 'react';

import { ActivityIndicator, Image, ImageSourcePropType } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { View, Text, ScrollView } from 'react-native';
import styles from './CafeDetailScreen.style';
import useCafeLong from '@/app/hooks/useCafeLong';
import useCafeImage from '@/app/hooks/useCafeImage';
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";

type CafeDetailRouteProp = RouteProp<RootStackParamList, 'CafeDetailScreen'>;

interface CafeDetailScreenProps {
  route: CafeDetailRouteProp;
}

const CafeDetailScreen : React.FC<CafeDetailScreenProps> = ({route}) => {
  const { id } = route.params;
  const { cafeLong, loading, error } = useCafeLong(id);
  const { imageUrl, loading: loadingImage, error: errorImage } = useCafeImage(id);

  const isLoading = loading || loadingImage;
  const combinedError = error || errorImage;
  const hasData = !!cafeLong && !!imageUrl;


  if (isLoading || combinedError || !hasData) {
    return <LoadingErrorView loading={loading} error={error} dataAvailable={hasData} />;
  }
  
  const sections = [
    {
      title: 'General Information',
      data: [
        { label: 'Opening Hours', value: cafeLong.openingHours },
        { label: 'Address', value: cafeLong.location },
        { label: 'Phone', value: cafeLong.phone },
      ],
    },
    {
      title: 'Ratings & Reviews',
      data: [
        { label: 'Rating', value: `${cafeLong.rating} ⭐` },
        { label: 'Reviews', value: `${cafeLong.reviewCount} reviews` },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cafeLong.name}</Text>
        {/*IMAGE SHOULD NOT BE any or ImageSourcePropType*/}
      <Image
        source={imageUrl as ImageSourcePropType}
        style={styles.headerImage}
        resizeMode="cover"
        onError={() => console.log('Error loading image')}
      />
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.data.map((item, idx) => (
            <View key={idx} style={styles.itemContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default CafeDetailScreen;