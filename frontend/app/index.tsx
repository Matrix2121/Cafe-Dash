import React from "react";
import Navigation from "@/app/navigation/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import {OrientationProvider} from "@/app/orientation/OrientationContext";

const App = () => {
  return (
    <GestureHandlerRootView>
        <OrientationProvider>
            <AuthProvider>
                <CartProvider>
                    <Navigation />
                </CartProvider>
            </AuthProvider>
        </OrientationProvider>
    </GestureHandlerRootView>
  );
};

export default App;
