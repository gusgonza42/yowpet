import { TouchableOpacity, View } from 'react-native';
import { styles } from '@components/auth/styles';
import { AntDesign } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

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
          <AntDesign
            name="facebook-square"
            size={24}
            color={YowPetTheme.brand.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.SocialButtons.socialButton}>
          <AntDesign
            name="twitter"
            size={24}
            color={YowPetTheme.brand.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.SocialButtons.socialButton}>
          <AntDesign
            name="google"
            size={24}
            color={YowPetTheme.brand.primary}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
