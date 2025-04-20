import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@components/auth/styles';

export const AuthTabs = ({ isLogin, onModeChange }) => {
  return (
    <View style={styles.authTabs.tabContainer}>
      <TouchableOpacity
        style={[styles.authTabs.tab, isLogin && styles.authTabs.activeTab]}
        onPress={() => onModeChange('login')}
      >
        <Text
          style={[
            styles.authTabs.tabText,
            isLogin && styles.authTabs.activeTabText,
          ]}
        >
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.authTabs.tab, !isLogin && styles.authTabs.activeTab]}
        onPress={() => onModeChange('register')}
      >
        <Text
          style={[
            styles.authTabs.tabText,
            !isLogin && styles.authTabs.activeTabText,
          ]}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};
