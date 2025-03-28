import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing.xl * 2,
    },
    logo: {
        width: theme.components.login.logoSize,
        height: theme.components.login.logoSize,
        marginBottom: theme.spacing.lg,
        borderRadius: theme.components.login.borderRadius,
        elevation: theme.elevation.lg,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.5,
        shadowRadius: theme.spacing.md,
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.components.login.overlay,
        width: theme.components.login.containerWidth,
        height: theme.components.login.containerHeight,
        borderRadius: theme.components.login.borderRadius,
        margin: theme.spacing.none,
    },
    title: {
        fontSize: theme.fontSizes.header + 4,
        fontWeight: 'bold',
        marginBottom: theme.spacing.lg,
        color: theme.colors.surface,
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: theme.spacing.xs / 1.5,
        padding: theme.spacing.sm,
    },
    input: {
        width: theme.components.login.inputWidth,
        marginBottom: theme.spacing.sm,
        marginHorizontal: theme.spacing.xl,
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.primary,
    },
    loginButton: {
        marginTop: theme.spacing.xl,
        width: theme.components.login.buttonWidth,
        backgroundColor: theme.colors.primary,
    },
    registerButton: {
        marginTop: theme.spacing.sm,
        width: theme.components.login.buttonWidth,
        borderColor: theme.colors.primary,
        borderWidth: theme.spacing.xs / 2,
        backgroundColor: theme.colors.secondary,
    },
    highlight: {
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    errorText: {
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
    navigationContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: theme.spacing.md,
        marginRight: theme.spacing.md,
    },
    testButton: {
        width: 80,
        height: 80,
    },
    testButtonText: {
        color: theme.colors.surface,
        fontSize: theme.fontSizes.header + 6,
    }
});