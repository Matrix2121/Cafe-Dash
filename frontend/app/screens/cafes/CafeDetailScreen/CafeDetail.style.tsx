import { StyleSheet } from 'react-native';
import { theme } from '@/app/theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSizes.header,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  detailsContainer: {
    marginBottom: theme.spacing.md,
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
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
    fontSize: theme.fontSizes.subheader,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
  value: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
  },
  headerImage: {
    width: '100%',
    height: theme.components.cafeDetail.imageHeight,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.secondary,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: theme.radii.sm,
    elevation: theme.elevation.md,
  },
});