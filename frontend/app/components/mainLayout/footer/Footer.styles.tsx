import { StyleSheet } from 'react-native';
import { theme } from '@/app/theme/theme';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    height: theme.sizes.tabBarHeight,
    paddingBottom: theme.spacing.xs,
  },
});

export default styles;