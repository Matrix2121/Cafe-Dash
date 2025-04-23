import React from "react";
import Navigation from "@/app/navigation/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import {OrientationProvider} from "@/app/orientation/OrientationContext";
import { I18nextProvider } from 'react-i18next';
import i18n from "@/app/languages/i18n";

const App = () => {
  return (
    <GestureHandlerRootView>
        <OrientationProvider>
            <I18nextProvider i18n={i18n}>
                <AuthProvider>
                    <CartProvider>
                        <Navigation />
                    </CartProvider>
                </AuthProvider>
            </I18nextProvider>
        </OrientationProvider>
    </GestureHandlerRootView>
  );
};

export default App;
