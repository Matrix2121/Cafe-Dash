import { StyleSheet } from 'react-native';
import { theme } from '@/app/theme/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    marginVertical: theme.spacing.md,
    padding: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: theme.radii.sm,
    elevation: theme.elevation.md,
    width: '100%'
  },
  image: {
    width: '100%',
    height: theme.sizes.imageHeight,
    borderRadius: theme.components.cardImage.borderRadius,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  cafeteriaContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  addButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.full,
    width: theme.sizes.addButtonSize,
    height: theme.sizes.addButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  addButtonIcon: {
    height: 60,
    width: 60,
  },
  addButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 1,
  },
  name: {
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
    color: theme.colors.textPrimary,
  },
  productType: {
    fontSize: theme.fontSizes.subheader,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    lineHeight: theme.fontSizes.body + 4,
  },
  price: {
    fontSize: theme.fontSizes.body + 2,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
});

export default styles;