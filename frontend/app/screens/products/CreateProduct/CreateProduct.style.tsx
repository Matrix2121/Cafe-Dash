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
        paddingTop: theme.spacing.xl * 2,
    },
    formContainer: {
        backgroundColor: theme.components.login.overlay,
        width: theme.components.login.containerWidth,
        padding: theme.spacing.lg,
        borderRadius: theme.components.login.borderRadius,
        alignItems: 'center',
    },
    title: {
        fontSize: theme.fontSizes.header + 4,
        fontWeight: 'bold',
        marginBottom: theme.spacing.lg,
        color: theme.colors.surface,
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: theme.spacing.xs / 1.5,
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
        color: theme.colors.textValidationError
    },
    secondaryContainer: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        width: theme.components.login.inputWidth,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});