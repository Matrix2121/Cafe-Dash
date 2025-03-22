import {useEffect, useState} from 'react';
import {User} from '../types/items';
import axios from "axios";
import {url} from "@/app/common/constants";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/app/navigation/Navigation";
import CryptoJS from "crypto-js";
import useValidation from "@/app/hooks/validation/useValidation";

const useRegister = (id?: number) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const {emailValidation, emptyParams} = useValidation();

    const handleRegister = async () => {
        if (!emptyParams(username, email, password)) return;
        if (!emailValidation(email)) return;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${url}api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    passwordHash: CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex),
                    roles: [],
                }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }
            navigation.navigate("Login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {handleRegister, setUsername, setEmail, setPassword, username, email, password, loading, error, navigation};
};

export default useRegister;