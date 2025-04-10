import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      zIndex: 1000,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      height: 60
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
    backButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: "auto",
    },
  });
  
export default styles;