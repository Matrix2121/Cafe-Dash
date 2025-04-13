import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    width: "100%",
    height: 60,
  },
  title: {
    fontSize: theme.fontSizes.header,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
});

export default styles;
