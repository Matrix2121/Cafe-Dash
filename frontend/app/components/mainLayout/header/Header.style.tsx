import theme from '@/app/theme/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    width: "100%",
    height: 60,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
  },
  image: {
    width: theme.components.header.imageSize,
    height: theme.components.header.imageSize,
    borderRadius: theme.components.header.imageSize / 2,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  logoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    paddingRight: 10,
  },
  logoutButton: {
    backgroundColor: theme.colors.transparent,
    justifyContent: 'center',
  },
});

export default styles;