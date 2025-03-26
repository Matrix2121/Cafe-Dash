import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/LoginScreen/Login';
import Register from '../screens/auth/RegisterScreen/Register';
import Test from '../screens/test/Test';
import MainHub from '../screens/main/MainHubScreen/MainHub';
import CafesList from '../screens/cafes/CafeListScreen/CafesList';
import CafeDetail from '../screens/cafes/CafeDetailScreen/CafeDetail';
import CafeMenu from '../screens/cafes/CafeMenuScreen/CafeMenu';
import CafeReviews from '../screens/cafes/CafeReviewsScreen/CafeReviews';
import LeaveReview from '../screens/leaveReview/LeaveReview';
import CreateCafeteria from '../screens/cafes/CafeCreateScreen/CreateCafe';
import Profile from "../screens/profile/Profile";
import CreateUser from '../screens/users/CreateUser';
import { Cafe } from '../types/items';

export type RootStackParamList = {
    login: undefined;
    register: undefined;
    mainhub: undefined;
    profile: { userId: number };
    cafeslist: { cafe: Cafe };
    cafedetail: { cafe: Cafe };
    cafemenu: { cafe: Cafe };
    cafereviews: { cafe: Cafe };
    leavereview: { cafe: Cafe; goingBack: () => void }; //leavereview needs the goingBack function to reset the value of hasFetched to false in CafeReviews
    test: undefined;
    createcafeteria: undefined;
    createuser: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="mainhub" component={MainHub} />
            <Stack.Screen name="test" component={Test} />
            <Stack.Screen name="cafeslist" component={CafesList} />
            <Stack.Screen name="cafedetail" component={CafeDetail} />
            <Stack.Screen name="cafemenu" component={CafeMenu} />
            <Stack.Screen name="cafereviews" component={CafeReviews} />
            <Stack.Screen name="leavereview" component={LeaveReview} />
            <Stack.Screen name="createcafeteria" component={CreateCafeteria} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="createuser" component={CreateUser} />
        </Stack.Navigator>
    );
};

export default Navigation;