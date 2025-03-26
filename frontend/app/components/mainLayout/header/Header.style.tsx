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
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 'auto',
  },
  logoutButton: {
    backgroundColor: theme.colors.transparent,
  },
});

export default styles;