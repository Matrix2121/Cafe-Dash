import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: theme.elevation.sm,
    height: 60
  },
  title: {
    fontSize: theme.fontSizes.header,
    color: theme.colors.textPrimary,
    fontWeight: "bold",
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "auto",
  },
});

export default styles;
