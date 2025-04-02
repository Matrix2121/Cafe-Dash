import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radii.md,
  },
  title: {
    fontSize: theme.fontSizes.header,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButton: {
    backgroundColor: theme.colors.transparent,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radii.md,
  },
  detailsButtonText: {
    fontSize: theme.fontSizes.header,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default styles;
