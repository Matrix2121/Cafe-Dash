import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    zIndex: 1000,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
