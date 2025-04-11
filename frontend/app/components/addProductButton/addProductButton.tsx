import React from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable } from "react-native";
import styles from "./addProductButton.style";
import HasRoles from "@/app/utilComponents/HasRoles";
import { Card } from "react-native-paper";
import { SvgUri } from "react-native-svg";
import { Cafeteria } from "@/app/types/items";

interface CurrentCafeCartButtonProps {
  cafe: Cafeteria;
}

const AddProductButton = ({cafe}: CurrentCafeCartButtonProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <HasRoles roles={['admin']}>
      <Card>
        <Pressable style={styles.plusContainer} onPress={() => navigation.navigate("createproduct", {cafe})} >
          <SvgUri
              uri={'https://cafedashstorage.blob.core.windows.net/svgs/plus-white.svg'}
              width={80}
              height={80}
          />
        </Pressable>
      </Card>
    </HasRoles>
  );
};

export default AddProductButton;
