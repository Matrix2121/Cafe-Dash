import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Space for floating button
  },
  noReviews: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.lg,
    paddingBottom: 100, // Extra space when no reviews
  },
  floatingButton: {
    position: "absolute",
    bottom: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    justifyContent: "center",
    alignItems: "center",
    elevation: theme.elevation.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
  },
});

export default styles;
