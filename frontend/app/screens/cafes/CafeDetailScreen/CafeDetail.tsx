import React from "react";
import { Image, Pressable } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, ScrollView } from "react-native";
import styles from "./CafeDetail.style";
import DetailsHeader from "@/app/components/headers/detailsHeader/DetailsHeader";
import { useTranslation } from 'react-i18next';

type CafeDetailRouteProp = RouteProp<RootStackParamList, "cafedetail">;

interface CafeDetailProps {
  route: CafeDetailRouteProp;
}

const CafeDetail = ({ route }: CafeDetailProps) => {
  const { cafe } = route.params;
  const { t } = useTranslation();

  const isValidTime = (time: string | null | undefined) => {
    return !!time && time !== "00:00:00";
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.pageContainer}>
      <DetailsHeader cafeName={cafe.name}/>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View>
          <Image
            source={{ uri: cafe.imageUrl }}
            style={styles.headerImage}
            resizeMode="cover"
            defaultSource={require("@/app/assets/images/logo.png")}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>{t("brand")}:</Text>
            <Text style={styles.value}>{cafe.brand}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>{t("address")}:</Text>
            <Text style={styles.value}>{cafe.location}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>{t("rating")}:</Text>
            <Text style={styles.value}>
              {cafe.rating.toFixed(1)} ({cafe.countReview} Reviews)
            </Text>
          </View>
        </View>
        {isValidTime(cafe.openingHour) && isValidTime(cafe.closingHour) && (
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>{t("hours")}:</Text>
            <Text style={styles.value}>
              {cafe.openingHour} - {cafe.closingHour}
            </Text>
          </View>
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>{t("phone")}:</Text>
          <Text style={styles.value}>{cafe.phoneNumber}</Text>
        </View>
      </ScrollView>
      <View style={styles.fixedBottomContainer}>
        <Pressable
          style={styles.contactButton}
          onPress={() => navigation.navigate("contact")}
        >
          <Text style={styles.navigationButtonText}>{t("contact")}</Text>
        </Pressable>
        <Pressable
          style={styles.navigationButton}
          onPress={() => navigation.navigate("cafereviews", { cafe })}
        >
          <Text style={styles.navigationButtonText}>
            {t("review")} ⭐
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CafeDetail;
