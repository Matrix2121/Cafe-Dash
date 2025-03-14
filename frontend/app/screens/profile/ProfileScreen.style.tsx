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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    orderTextLogo: {
        fontSize: 20,
    },
    notificationLogo: {
        width: 30,
        height: 30,
        marginRight: 5
    }
})

export default styles