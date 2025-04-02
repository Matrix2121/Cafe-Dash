import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "100%",
    marginBottom: theme.spacing.md,
  },
  addCafeteria: {
    width: "100%",
    backgroundColor: '#cdcbcb',
    borderRadius: theme.radii.md,
    alignItems: "center",
    justifyContent: "center",
    height: 330
  },
  loadingErrorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default styles;