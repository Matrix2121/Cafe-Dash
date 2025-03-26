import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly",
    paddingVertical: theme.spacing.xs,
  },
  loadingErrorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
});

export default styles;