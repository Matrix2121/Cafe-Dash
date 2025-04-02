import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
    orderContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.md,
      margin: theme.spacing.md,
      padding: theme.spacing.md,
      elevation: theme.elevation.sm,
    },
    orderHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: theme.spacing.sm,
    },
    orderId: {
      fontSize: theme.fontSizes.title,
      fontWeight: "bold",
      color: theme.colors.textPrimary,
    },
    orderDate: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textSecondary,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: theme.spacing.sm,
    },
    statusText: {
      fontSize: theme.fontSizes.body,
      fontWeight: "500",
      color: theme.colors.textPrimary,
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: theme.spacing.xs,
    },
    itemName: {
      flex: 2,
      fontSize: theme.fontSizes.body,
      color: theme.colors.textPrimary,
    },
    itemQuantity: {
      flex: 1,
      textAlign: "left",
      fontSize: theme.fontSizes.body,
      color: theme.colors.textSecondary,
    },
    itemPrice: {
      flex: 1,
      textAlign: "right",
      fontSize: theme.fontSizes.body,
      color: theme.colors.textPrimary,
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: theme.spacing.sm,
    },
    totalLabel: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textPrimary,
      marginRight: theme.spacing.sm,
    },
    totalAmount: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textPrimary,
      fontWeight: "bold",
    },
});

export default styles;