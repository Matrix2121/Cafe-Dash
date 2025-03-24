import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.md,
      marginBottom: theme.spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    averageRating: {
      fontSize: theme.fontSizes.header,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      marginRight: theme.spacing.sm,
    },
    ratingText: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textSecondary,
      marginRight: theme.spacing.sm,
    },
    totalReviews: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textSecondary,
    },
    leaveReviewButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radii.sm,
    },
    leaveReviewButtonText: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.surface,
      fontWeight: 'bold',
    },
  });
  
export default styles;