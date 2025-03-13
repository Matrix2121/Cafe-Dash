import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    profileContainer: {

    },
    profileLogoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bd2f2f",
    },
    profileTextLogo:{
      fontSize: 20,
    },
    circle: {
        width: 44,
        height: 44,
        borderRadius: 44/2,
        backgroundColor: "#000000",
        justifyContent: 'center',
        alignItems: 'center'
    },
    letterInsideTheLogo: {
        fontSize: 18,
        color: "#fff",
    }
})

export default styles