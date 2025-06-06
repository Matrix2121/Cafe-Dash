import React from "react";
import {RootStackParamList} from "@/app/navigation/Navigation";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Cafeteria} from "@/app/types/items"
import {TouchableOpacity, View, Text} from "react-native";
import styles from "./CafeMenuSubheader.style";
import {SvgUri} from "react-native-svg";
import { useTranslation } from 'react-i18next';

interface MenuSubheader {
    cafe: Cafeteria;
}

const MenuSubheader = ({cafe}: MenuSubheader) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { t } = useTranslation();
    return (
        <View style={styles.header}>
            <View style={styles.detailsContainer}>
                <SvgUri uri={'https://cafedashstorage.blob.core.windows.net/svgs/coffe-bean.svg'} height={30} width={30} />
                <Text style={styles.detailsButtonText}>{cafe.name}</Text>
            </View>
            <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate("cafedetail", {cafe})}
            >
                <View style={styles.detailsContainer}>
                    <SvgUri uri={'https://cafedashstorage.blob.core.windows.net/svgs/shop.svg'} height={30} width={30} />
                    <Text style={styles.detailsButtonText}>{t("details")}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MenuSubheader;
