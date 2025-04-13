import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  noReviews: {
    fontSize: theme.fontSizes.title,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing.lg,
  },
  listContainer: {
    paddingBottom: theme.spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  errorText: {
    fontSize: theme.fontSizes.body,
    color: "#777777",
  },
});

export default styles;
