import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Cafe } from '../types/items';

import Login from '../screens/auth/LoginScreen/Login';
import Register from '../screens/auth/RegisterScreen/Register';
import Home from '../screens/home/Home';
import Profile from "../screens/profile/Profile";
import CafesList from '../screens/cafes/CafeListScreen/CafesList';
import CafeDetail from '../screens/cafes/CafeDetailScreen/CafeDetail';
import CafeMenu from '../screens/cafes/CafeMenuScreen/CafeMenu';
import CafeReviews from '../screens/cafes/CafeReviewsScreen/CafeReviews';
import LeaveReview from '../screens/leaveReview/LeaveReview';
import Cart from '../screens/cart/Cart'
import CreateCafeteria from '../screens/cafes/CafeCreateScreen/CreateCafe';
import CreateUser from '../screens/users/CreateUser';
import Test from '../screens/test/Test'
import ContactUs from "../screens/contact/ContactUs";

export type RootStackParamList = {
    login: undefined;
    register: undefined;
    home: undefined;
    profile: { userId: number };
    cafeslist: undefined;
    cafedetail: { cafe: Cafe };
    cafemenu: { cafe: Cafe };
    cafereviews: { cafe: Cafe };
    leavereview: { cafe: Cafe; goingBack: () => void }; //leavereview needs the goingBack function to reset the value of hasFetched to false in CafeReviews
    createcafeteria: undefined;
    cart: undefined;
    test: undefined;
    createuser: undefined;
    contact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="cafeslist" component={CafesList} />
            <Stack.Screen name="cafedetail" component={CafeDetail} />
            <Stack.Screen name="cafemenu" component={CafeMenu} />
            <Stack.Screen name="cafereviews" component={CafeReviews} />
            <Stack.Screen name="leavereview" component={LeaveReview} />
            <Stack.Screen name="createcafeteria" component={CreateCafeteria} />
            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="test" component={Test} />
            <Stack.Screen name="createuser" component={CreateUser} />
            <Stack.Screen name="contact" component={ContactUs} />
        </Stack.Navigator>
    );
};

export default Navigation;