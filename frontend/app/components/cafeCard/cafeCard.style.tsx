import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    marginVertical: theme.spacing.sm,
    padding: theme.spacing.xs,

    width: "49%",
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
  },
  ratingLocationStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  image: {
    width: '100%',        // Full width of container
    height: 240,          // Fixed height for consistency
    borderRadius: 8,      // Match your card border radius
    marginBottom: 16,     // Space between image and content
    backgroundColor: '#CECECC', // Secondary color for loading state
    shadowColor: '#000',  // Shadow to match your card style
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,         // Android shadow
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // background color
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // background color
  },
  errorText: {
    fontSize: theme.fontSizes.body,
    color: '#777777', // textSecondary
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  timeStyle: {
    fontSize: theme.fontSizes.subheader,
    color: theme.colors.textSecondary,
  }
});

export default styles;
