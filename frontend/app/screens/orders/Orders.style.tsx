import { StyleSheet } from 'react-native';
import theme from '@/app/theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gridContainer: {
    paddingBottom: theme.spacing.xl,
  },
  cardWrapper: {
    flex: 1,
  },
  loadingErrorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
});

export default styles;