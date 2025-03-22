import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 15,
    },
    testButton: {
        width: "48%",
        height: 50,
        borderColor: "#444444",
        borderWidth: 2.5,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
    },
    testButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
});