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
  });

export default styles;