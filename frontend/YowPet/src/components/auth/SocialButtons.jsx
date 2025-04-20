import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@components/auth/styles';

export const SocialButtons = () => {
  return (
    <>
      <View style={styles.SocialButtons.separator}>
        <View style={styles.SocialButtons.line} />
        <View style={styles.SocialButtons.circle} />
        <View style={styles.SocialButtons.line} />
      </View>
      <View style={styles.SocialButtons.socialButtonsContainer}>
        <TouchableOpacity style={styles.SocialButtons.socialButton}>
          <Text style={styles.SocialButtons.socialButtonText}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SocialButtons.socialButton}>
          <Text style={styles.SocialButtons.socialButtonText}>t</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SocialButtons.socialButton}>
          <Text style={styles.SocialButtons.socialButtonText}>G</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
