import { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView, Alert} from 'react-native';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';
import Constants from "expo-constants";

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const serviceKey = Constants.expoConfig?.extra?.serviceKey;
    const templateKey = Constants.expoConfig?.extra?.templateKey;
    const publicKey = Constants.expoConfig?.extra?.publicKey;


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
            <Text style={styles.title}>Contact Us</Text>

            <TextInput
                style={styles.input}
                inputMode="email"
                keyboardType="email-address"
                placeholder="Email*"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Name*"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Your Message*"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
            />

            <Button
                title={isLoading ? 'Sending...' : 'Submit'}
                onPress={onSubmit}
                disabled={isLoading}
                color="#0066cc"
            />
        </ScrollView>
    );
};
export default ContactUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    messageInput: {
        height: 120,
        textAlignVertical: 'top',
        paddingTop: 15,
    },
});