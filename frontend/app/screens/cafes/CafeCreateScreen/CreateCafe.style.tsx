import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
        paddingTop: 50,
    },
    formContainer: {
        backgroundColor: 'rgba(142,129,129,0.4)',
        width: 340,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "white",
        borderBottomColor: '#CECECC',
        borderBottomWidth: 3,
        padding: 5,
        textAlign: 'center',
    },
    input: {
        width: 300,
        marginBottom: 10,
        backgroundColor: '#CECECC',
    },
    createButton: {
        marginTop: 30,
        width: 200,
        backgroundColor: '#444444',
    },
    errorText: {
        color: '#444444',
        marginBottom: 10,
    },
});

export default styles;