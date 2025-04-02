import React from "react";
import {RootStackParamList} from "@/app/navigation/Navigation";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Cafeteria} from "@/app/types/items"
import {TouchableOpacity, View, Text} from "react-native";
import styles from "./MenuHeader.style";
import {SvgUri} from "react-native-svg";

interface MenuHeader {
    cafe: Cafeteria;
}

const MenuHeader = ({cafe}: MenuHeader) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <View style={styles.headerContainer}>
            <View style={styles.detailsContainer}>
                <SvgUri uri={'https://cafedashstorage.blob.core.windows.net/svgs/coffe-bean.svg'} height={30} width={30} />
                <Text style={styles.detailsButtonText}>Menu</Text>
            </View>
            <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate("cafedetail", {cafe})}
            >
                <View style={styles.detailsContainer}>
                    <SvgUri uri={'https://cafedashstorage.blob.core.windows.net/svgs/shop.svg'} height={30} width={30} />
                    <Text style={styles.detailsButtonText}>Details</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MenuHeader;
