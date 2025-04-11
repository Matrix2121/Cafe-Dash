import { StyleSheet } from 'react-native';
import { theme } from '@/app/theme/theme';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    noReviews: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.lg,
    },
    Button: {
      position: 'absolute',
      bottom: theme.spacing.md,
      left: theme.spacing.md,
      right: theme.spacing.md,
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.radii.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: theme.elevation.md,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    ButtonText: {
      color: theme.colors.surface,
      fontSize: theme.fontSizes.title,
      fontWeight: 'bold',
    },
  });

export default styles;