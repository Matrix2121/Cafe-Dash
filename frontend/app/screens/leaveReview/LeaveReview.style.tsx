import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    formContainer: {
      padding: theme.spacing.md,
    },
    header: {
      fontSize: theme.fontSizes.header,
      fontWeight: "bold",
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.lg,
      textAlign: "center",
    },
    ratingContainer: {
      marginBottom: theme.spacing.md,
      alignItems: "center",
    },
    label: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      borderRadius: theme.radii.sm,
      padding: theme.spacing.sm,
      marginBottom: theme.spacing.md,
      fontSize: theme.fontSizes.body,
    },
    commentInput: {
      height: 120,
      textAlignVertical: "top",
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.radii.sm,
      alignItems: "center",
    },
    submitButtonText: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.surface,
      fontWeight: "bold",
    },
  });

export default styles;