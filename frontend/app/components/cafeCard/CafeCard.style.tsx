import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  cardStyle: {
    width: "100%",
    marginVertical: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.md,
    height: 330,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  contentContainer: {
    height: 150,
    padding: theme.spacing.md,
  },
  titleStyle: {
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  infoRow: {
    justifyContent: "center",
    marginVertical: theme.spacing.xs / 2, //2px
  },
  brandStyle: {
    color: theme.colors.textPrimary,
    fontWeight: "600",
  },
  timeStyle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  locationStyle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  ratingStyle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
});

export default styles;