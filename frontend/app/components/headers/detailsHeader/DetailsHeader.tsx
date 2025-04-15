import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Pressable, Image } from "react-native";
import { SvgUri } from "react-native-svg";
import * as Haptics from 'expo-haptics';

import styles from "./DetailsHeader.style";
import theme from "@/app/theme/theme";

interface DetailsHeader {
  cafeName: string;
}

const DetailsHeader = ({ cafeName }: DetailsHeader) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{cafeName}</Text>
      <Pressable
        onPress={() => {
          navigation.goBack();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        style={styles.backButton}
        android_ripple={{ color: theme.colors.ripple }}
      >
        <SvgUri
          height={40}
          width={40}
          style={styles.backButton}
          uri={"https://cafedashstorage.blob.core.windows.net/svgs/coffe-bean.svg"}
        />
      </Pressable>
    </View>
  );
};

export default DetailsHeader;
