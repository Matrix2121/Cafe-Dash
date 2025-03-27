import theme from "@/app/theme/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  cafeHeader: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  cafeHeaderText: {
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  cafeLocationText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemInfo: {
    flex: 2,
  },
  itemName: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
  },
  itemPrice: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  quantityButton: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radii.sm,
  },
  quantityText: {
    marginHorizontal: theme.spacing.sm,
  },
  removeButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  removeText: {
    color: theme.colors.textSecondary,
  },
  summaryContainer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  totalText: {
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: theme.spacing.md,
  },
  checkoutButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearButton: {
    padding: theme.spacing.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  clearText: {
    color: theme.colors.textSecondary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    fontSize: theme.fontSizes.title,
    color: theme.colors.textSecondary,
  },
});
export default styles;