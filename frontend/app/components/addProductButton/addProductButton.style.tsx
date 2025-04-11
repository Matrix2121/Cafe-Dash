import { StyleSheet } from 'react-native';
import { theme } from '@/app/theme/theme';

const styles = StyleSheet.create({
  plusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
  },
});

export default styles;
