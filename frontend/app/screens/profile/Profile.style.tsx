import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
    },

    profileLogoContainer: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 40,
    },

    profileTextLogo: {
        fontSize: 20,
        color: "black",
        textAlign: "center"
    },

    secondaryText: {
        fontSize: 14,
        color: "gray",
    },

    circle: {
        width: 88,
        height: 88,
        borderRadius: 88 / 2,
        backgroundColor: "#966348",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: -52,
    },

    letterInsideTheLogo: {
        fontSize: 36,
        color: "#fff",
    },

    imageLogo: {
        width: "100%",
        height: 200,
        position: "relative",
    },

    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    orderContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 20
    },

    input: {
        width: 300,
        fontSize: 20,
        fontWeight: 300,
        marginHorizontal: 0,
        paddingVertical: 4,
        backgroundColor: "rgba(0,0,0,0)",
    },

    editInput: {
        width: 300,
        height: 44,
        borderRadius: 4,
        color: "white",
        backgroundColor: "rgba(0,0,0,0)",
        paddingVertical: 4,
        fontSize: 20,
        fontWeight: 300,
    },

    m: {
        flex: 1,
    },

    titleContainer: {
        marginBottom: 20
    },

    title: {
        color: "black",
        fontSize: 28,
        fontWeight: "bold",
    },

    highlight: {
        color: "#CECECC",
        fontSize: 28,
        fontWeight: "bold",
    },

    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        resizeMode: 'stretch'
    },

    profileDetailsContainer: {
        backgroundColor: 'rgba(142,129,129,0.2)',
        borderRadius: 20,
        width: 380,
        height: 440,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        alignItems: 'center',
    },

    form: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        width: 200,
    },

    profileDetailsInput: {
        fontSize: 18,
    },

    profileDetailsInputHeader: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center"
    },

    pressableDetails: {
        backgroundColor: "#CECECC",
        borderRadius: 4,
        padding: 8,
    },

    pressableSubmit: {
        backgroundColor: '#444444',
        borderRadius: 4,
        padding: 8,
    },

    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },

    editButton: {
        marginLeft: 10,
        padding: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
    },

    usernameText: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        width: 280,
        fontSize: 16,
    },

    editLogo: {
        width: 24,
        height: 24,
    },

    buttonContainer: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
    },

    pressableText: {
        fontSize: 18,
        color: "white",
    },

    logo: {
        width: 30,
        height: 30,
        marginRight: 15,
    },

    orderTextLogo: {
        fontSize: 20,
        textAlign: "left",
        flex: 1
    },

    accordionContent: {
        paddingLeft: 10,
        paddingTop: 10,
    },

    userRow: {
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 6,
    },

    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    email: {
        fontSize: 14,
        color: 'gray',
    },

    loading: {
        padding: 10,
        fontStyle: 'italic'
    },

    error: {
        padding: 10,
        color: 'red'
    },

    accordion: {
        justifyContent: "center",
        alignItems: "center",
    }
})

export default styles