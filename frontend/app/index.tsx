import React from "react";
import Navigation from "./navigation/Navigation";
import { AuthProvider } from "./context/AuthContext";
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
