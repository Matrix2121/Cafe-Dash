import { StyleSheet } from 'react-native';
import { theme } from '@/app/theme/theme';

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
        paddingTop: theme.spacing.xl * 2, // 50px equivalent
    },
    formContainer: {
        backgroundColor: theme.components.login.overlay,
        width: theme.components.login.containerWidth,
        padding: theme.spacing.lg,
        borderRadius: theme.components.login.borderRadius,
        alignItems: 'center',
    },
    title: {
        fontSize: theme.fontSizes.header + 4, // 28px
        fontWeight: 'bold',
        marginBottom: theme.spacing.lg,
        color: theme.colors.surface,
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: theme.spacing.xs / 1.5, // 3px
        padding: theme.spacing.sm,
        textAlign: 'center',
    },
    input: {
        width: theme.components.login.inputWidth,
        marginBottom: theme.spacing.sm,
        backgroundColor: theme.colors.secondary,
    },
    createButton: {
        marginTop: theme.spacing.xl,
        width: theme.components.login.buttonWidth,
        backgroundColor: theme.colors.primary,
    },
    errorText: {
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
});