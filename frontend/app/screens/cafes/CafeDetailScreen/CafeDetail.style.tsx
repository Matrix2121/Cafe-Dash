import {StyleSheet} from 'react-native';
import {theme} from '@/app/theme/theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background,
    },
    pageContainer: {
      flex: 1,
    },

    title: {
        fontSize: theme.fontSizes.header,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
        borderBottomWidth: 2,
        paddingBottom: 8,
        borderColor: theme.colors.textSecondary,
    },

    detailsContainer: {
        marginBottom: theme.spacing.md,
    },

    returnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    testButton: {
        width: 60,
        height: 60,
    },

    section: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: theme.radii.sm,
        elevation: theme.elevation.md,
    },

    sectionTitle: {
        fontSize: theme.fontSizes.title,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },

    label: {
        fontSize: theme.fontSizes.header,
        fontWeight: 'bold',
        color: theme.colors.textSecondary,
    },

    value: {
        fontSize: theme.fontSizes.title,
        color: theme.colors.textPrimary,
    },

    headerImage: {
        width: '100%',
        height: theme.components.cafeDetail.imageHeight,
        borderRadius: theme.radii.md,
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colors.secondary,
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: theme.radii.sm,
        elevation: theme.elevation.md,
    },

    navigationContainer: {
        flex: 1,
        gap: 5,
    },

    navigationButton: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: theme.colors.textSecondary,
        paddingVertical: theme.spacing.md,
        borderRadius: 12
    },

    contactButton: {
        backgroundColor: '#B3826C',
        paddingVertical: theme.spacing.md,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },

    navigationButtonText: {
        color: 'white',
        fontSize: theme.fontSizes.title,
        fontWeight: "bold",
    },

    fixedBottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background,
        gap: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
});