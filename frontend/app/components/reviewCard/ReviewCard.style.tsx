import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.md,
      marginVertical: theme.spacing.sm,
      padding: theme.spacing.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sm,
    },
    textContainer: {
      flex: 1,
      minWidth: '70%',
    },
    title: {
      fontSize: theme.fontSizes.body,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      flexWrap: 'wrap',
    },
    starsWrapper: {
      marginLeft: 'auto',
      paddingLeft: theme.spacing.sm,
      flexShrink: 0,
    },
    rating: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textSecondary,
    },
    body: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
      lineHeight: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    date: {
      fontSize: theme.fontSizes.body - 2,
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
    },
  });

export default styles;