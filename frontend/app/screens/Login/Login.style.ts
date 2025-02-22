import {StyleSheet} from "react-native";

export default StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#444444',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#444444',
        backgroundColor: '#CECECC',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#444444',
        padding: 5,
    },
    input: {
        width: '130%',
        marginBottom: 10,
        backgroundColor: '#CECECC',
    },
    loginButton: {
        marginTop: 30,
        width: '100%',
        backgroundColor: '#444444',
    },
    registerButton: {
        marginTop: 10,
        width: '100%',
        borderColor: '#444444',
        borderWidth: 2.5,
        backgroundColor: '#CECECC',
    },
    errorText: {
        color: '#444444',
        marginBottom: 10,
    },
});
