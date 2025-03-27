import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  cardStyle: {
    width: "49%",
    marginVertical: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.md,
    overflow: 'hidden',
  },
  cardContent: {
    padding: theme.spacing.md,
  },
  titleStyle: {
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  ratingStyle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  locationStyle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  ratingLocationStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  image: {
    width: '100%',
    height: theme.sizes.imageHeight,
    borderRadius: theme.components.cardImage.borderRadius,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  timeStyle: {
    fontSize: theme.fontSizes.subheader,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  }
});

export default styles;