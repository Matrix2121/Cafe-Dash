import { StyleSheet } from 'react-native';
import { theme } from '@/app/theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radii.md,
  },
  title: {
    fontSize: theme.fontSizes.header,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  sectionHeader: {
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
    color: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radii.md,
  },
  itemContainer: {
    flex: 2,
    marginRight: theme.spacing.md,
  },
  itemList: {
    paddingHorizontal: theme.spacing.sm,
  },
  detailsButton: {
    backgroundColor: theme.colors.transparent,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radii.md,
  },
  detailsButtonText: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  cartButton: {
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
  cartButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
  },
  cartTotalText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
  },
});

export default styles;