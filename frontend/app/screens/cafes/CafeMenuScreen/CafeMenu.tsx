import React, { useEffect } from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { View, Text } from "react-native";
import useProducts from "@/app/hooks/useProducts";
import styles from "./CafeMenu.style";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import { useCart } from "@/app/context/CartContext";
import CurrentCafeCartButton from "@/app/components/viewCafeButton/currentCafeCartButton/CurrentCafeCartButton";
import DifferentCafeCartButton from "@/app/components/viewCafeButton/differentCafeCartButton/DifferentCafeCartButton";
import MenuSubheader from "@/app/components/headers/menuHeaders/MenuSubHeader/MenuSubHeader";
import MenuHeader from "@/app/components/headers/menuHeaders/MenuHeader/MenuHeader";
import ItemsList from "@/app/components/itemsList/ItemsList";
import { StackNavigationProp } from "@react-navigation/stack";
import AddProductButton from "@/app/components/addProductButton/addProductButton";

type CafeMenuRouteProp = RouteProp<RootStackParamList, "cafemenu">;

interface CafeMenuProps {
  route: CafeMenuRouteProp;
}

const CafeMenu = ({ route }: CafeMenuProps) => {
  const { cafe } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { products, fetchAllProductByCafeteriaId, loading, error } =
    useProducts();
  const { productsCount, currentCafeteria, totalPrice } = useCart();

  const isDifferentCafeteria =
    currentCafeteria && currentCafeteria.id !== cafe.id;

  useEffect(() => {
    fetchAllProductByCafeteriaId(cafe.id);
  }, [cafe.id]);

  const hasData = Array.isArray(products) && products.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <MenuHeader />
        <View style={styles.menuContainer}>
          <MenuSubheader cafe={cafe} />
          {loading || error ? (
            <LoadingErrorView
              loading={loading}
              error={error}
              dataAvailable={hasData}
            />
          ) : !hasData ? (
            <>
              <AddProductButton cafe={cafe} />
              <Text style={styles.noDataText}>
                This cafeteria has no products yet.
              </Text>
            </>
          ) : (
            <>
              <AddProductButton cafe={cafe} />
              <ItemsList products={products} />
            </>
          )}
        </View>
      </View>

      {isDifferentCafeteria && productsCount > 0 && (
        <DifferentCafeCartButton
          currentCafeteriaName={currentCafeteria.name}
          totalPrice={totalPrice}
          productsCount={productsCount}
        />
      )}

      {!isDifferentCafeteria && productsCount > 0 && (
        <CurrentCafeCartButton
          totalPrice={totalPrice}
          productsCount={productsCount}
        />
      )}
    </View>
  );
};

export default CafeMenu;
