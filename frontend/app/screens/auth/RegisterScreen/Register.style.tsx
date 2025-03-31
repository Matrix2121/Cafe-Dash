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
  },
  logo: {
    width: theme.components.login.logoSize,
    height: theme.components.login.logoSize,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.components.login.borderRadius,
    elevation: theme.elevation.lg,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.5,
    shadowRadius: theme.spacing.md,
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.components.login.overlay,
    width: theme.components.login.containerWidth,
    height: 440,
    borderRadius: theme.components.login.borderRadius,
    margin: theme.spacing.none,
  },
  title: {
    fontSize: theme.fontSizes.header + 4, // 28px
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    color: theme.colors.surface,
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: theme.spacing.xs / 1.5, // 3px
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
    marginTop: theme.spacing.sm,
    width: theme.components.login.buttonWidth,
    borderColor: theme.colors.primary,
    borderWidth: theme.spacing.xs / 2, // 2px
    backgroundColor: theme.colors.secondary,
  },
  highlight: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  errorText: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
});

export default styles;