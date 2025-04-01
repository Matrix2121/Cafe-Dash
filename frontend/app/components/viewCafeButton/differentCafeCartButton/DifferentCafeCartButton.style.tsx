import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  Button: {
    position: "absolute",
    bottom: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: theme.elevation.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cartInfoContainer: {
    flexDirection: "column",
    width: "100%",
  },
  cafeteriaInfo: {
    marginBottom: 8,
  },
  cafeteriaName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  cartButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
  },
  cartTotalText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
  },
  cartSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default styles;
