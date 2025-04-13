import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing.lg,
  },
  registerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.components.login.overlay,
    width: theme.components.login.containerWidth,
    minHeight: theme.components.login.containerHeight,
    borderRadius: theme.components.login.borderRadius,
    margin: 0,
    paddingVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.header,
    fontWeight: "bold",
    marginBottom: theme.spacing.lg,
    color: theme.colors.surface,
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
    padding: theme.spacing.sm,
    textAlign: "center",
  },
  input: {
    width: theme.components.login.inputWidth,
    marginBottom: theme.spacing.sm,
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    color: "#774936",
  },
  registerButton: {
    width: theme.components.login.buttonWidth,
    backgroundColor: theme.colors.primary,
  },
  loginButton: {
    marginTop: theme.spacing.sm,
    width: theme.components.login.buttonWidth,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    backgroundColor: theme.colors.secondary,
  },
  highlight: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  errorText: {
    color: theme.colors.textValidationError,
    marginBottom: theme.spacing.sm,
  },
  selectRolesContainer: {
    marginVertical: theme.spacing.sm,
    width: "100%",
    alignItems: "center",
  },
  selectRolesLabel: {
    textAlign: "center",
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    fontSize: theme.fontSizes.title,
    fontWeight: "600",
  },
  roleButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  roleButton: {
    margin: theme.spacing.xs,
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
  },
  selectedRoleButton: {
    backgroundColor: theme.colors.primary,
  },
  roleButtonText: {
    color: theme.colors.textPrimary,
  },
  selectedRoleButtonText: {
    color: theme.colors.surface,
  },
});
