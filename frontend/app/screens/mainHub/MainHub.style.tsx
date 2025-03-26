import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    elevation: theme.elevation.sm,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radii.lg,
    overflow: 'hidden',
    padding: theme.spacing.xs,
  },
  profileImage: {
    width: theme.sizes.profileImage,
    height: theme.sizes.profileImage,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  username: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
  },
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    height: theme.sizes.tabBarHeight,
    paddingBottom: theme.spacing.xs,
  },
});

export default styles;