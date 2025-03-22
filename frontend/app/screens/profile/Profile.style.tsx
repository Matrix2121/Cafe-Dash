import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
    },
    profileLogoContainer: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 40
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
        backgroundColor: "#000000",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: -52,
    },
    letterInsideTheLogo: {
        fontSize: 18,
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
        marginBottom: 10,
        marginHorizontal: 30,
        backgroundColor: '#CECECC',
        borderColor: '#444444',
    },
    m: {
        flex: 1,
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
        width: 360,
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
        backgroundColor: "black",
        borderRadius: 4,
        padding: 8,
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
})

export default styles