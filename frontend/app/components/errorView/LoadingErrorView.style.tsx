import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
    },
    loadingText: {
        marginTop: theme.spacing.md,
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.body,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
    },
    errorText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.body,
        textAlign: "center",
        marginTop: theme.spacing.md,
    },
    goBackButton: {
        marginTop: theme.spacing.xl,
        width: theme.components.login.buttonWidth,
        backgroundColor: theme.colors.primary,
    }
});

export default styles;