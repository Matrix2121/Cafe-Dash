import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "@/app/navigation/navigation";
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
