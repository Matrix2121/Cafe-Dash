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
        borderRadius: 88/2,
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

    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: 10,
        width: 200,
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