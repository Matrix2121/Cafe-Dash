import React, { useEffect } from "react";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { RouteProp } from "@react-navigation/native";

import { View } from "react-native";
import useProducts from "@/app/hooks/useProducts";
import styles from "./CafeMenu.style";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import { useCart } from "@/app/context/CartContext";
import CurrentCafeCartButton from "@/app/components/viewCafeButton/currentCafeCartButton/CurrentCafeCartButton";
import DifferentCafeCartButton from "@/app/components/viewCafeButton/differentCafeCartButton/DifferentCafeCartButton";
import MenuSubheader from "@/app/components/headers/menuHeaders/MenuSubHeader/MenuSubHeader";
import MenuHeader from "@/app/components/headers/menuHeaders/MenuHeader/MenuHeader";
import ItemsList from "@/app/components/itemsList/ItemsList";

type CafeMenuRouteProp = RouteProp<RootStackParamList, "cafemenu">;

interface CafeMenuProps {
  route: CafeMenuRouteProp;
}

const CafeMenu = ({ route }: CafeMenuProps) => {
  const { cafe } = route.params;
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
      <MenuHeader />
      <View style={styles.menuContainer}>
        <MenuSubheader cafe={cafe} />

        {loading || error || !hasData ? (
          <LoadingErrorView
            loading={loading}
            error={error}
            dataAvailable={hasData}
          />
        ) : (
          <ItemsList products={products} />
        )}
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
