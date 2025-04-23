import { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView, Alert} from 'react-native';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';
import Constants from "expo-constants";
import styles from "./ContactUs.style";
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const serviceKey = Constants.expoConfig?.extra?.serviceKey;
    const templateKey = Constants.expoConfig?.extra?.templateKey;
    const publicKey = Constants.expoConfig?.extra?.publicKey;
    const { t } = useTranslation();

    const onSubmit = async () => {
        if (!email || !name || !message) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        setIsLoading(true);

        try {
            await send(
                serviceKey,
                templateKey,
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                    reply_to: email
                },
                {
                    publicKey: publicKey
                }
            );

            Alert.alert('Success', 'Message sent successfully!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            let errorMessage = 'Failed to send message';
            if (err instanceof EmailJSResponseStatus) {
                errorMessage = err.text || errorMessage;
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{t("contact")}</Text>

            <TextInput
                style={styles.input}
                inputMode="email"
                keyboardType="email-address"
                placeholder={t("email")}
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder={t("username")}
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder={t("message")}
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
            />

            <Button
                title={isLoading ? 'Sending...' : t("submit")}
                onPress={onSubmit}
                disabled={isLoading}
                color="#966348"
            />
        </ScrollView>
    );
};
export default ContactUs;