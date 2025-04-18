import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: 50,
  },
  logo: {
    width: theme.components.login.logoSize,
    height: theme.components.login.logoSize,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.components.login.borderRadius,
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.components.login.overlay,
    width: theme.components.login.containerWidth,
    height: 460,
    borderRadius: theme.components.login.borderRadius,
    margin: theme.spacing.none,
  },
  title: {
    fontSize: theme.fontSizes.header + 4, 
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    color: theme.colors.surface,
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: theme.spacing.xs / 1.5,
    padding: theme.spacing.sm,
  },
  input: {
    width: theme.components.login.inputWidth,
    marginBottom: theme.spacing.sm,
    marginHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    color: theme.colors.textPrimary,
  },
  registerButton: {
    width: theme.components.login.buttonWidth,
    backgroundColor: theme.colors.primary,
  },
  loginButton: {
    width: theme.components.login.buttonWidth,
    borderColor: theme.colors.primary,
    borderWidth: theme.spacing.xs / 2,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
});

export default styles;