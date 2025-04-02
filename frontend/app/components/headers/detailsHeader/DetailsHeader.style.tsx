import theme from "@/app/theme/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: theme.elevation.sm,
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.fontSizes.header,
    color: theme.colors.textPrimary,
    fontWeight: "bold",
  },
  backButton: {
    marginLeft: "auto",
    marginRight: -4,
    height: 50,
    width: 50,
  },
});

export default styles;
