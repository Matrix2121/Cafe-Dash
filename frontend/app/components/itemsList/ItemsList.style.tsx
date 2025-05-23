import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
    color: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radii.md,
  },
  itemContainer: {
    flex: 2,
    marginHorizontal: theme.spacing.sm,
  },
  itemList: {
    paddingHorizontal: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: 210,
  },
});

export default styles;
