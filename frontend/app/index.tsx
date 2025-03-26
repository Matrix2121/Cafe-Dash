import React from "react";
import Navigation from "@/app/navigation/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <CartProvider>
          <Navigation />
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
