import { ImageBackground, SafeAreaView, View } from 'react-native';
import { CustomHeader } from '@components/auth/CustomHeader';
import { AuthTabs } from '@components/auth/AuthTabs';
import { SocialButtons } from '@components/auth/SocialButtons';
import { FormikAuthForm } from '@components/auth/FormikAuthForm';
import { styles } from '@components/auth/styles';
import { useAuthForm } from '@hooks/auth/useAuthForm';

export default function Auth() {
  const {
    isLogin,
    fadeAnim,
    initialValues,
    validationSchema,
    handleSubmit,
    handleModeChange,
    toggleVisibility,
    handleForgotPassword,
  } = useAuthForm();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/ilustrationYowpetV1/Ilustration_paws.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.auth.container}>
            <CustomHeader />
            <View style={styles.auth.authContainer}>
              <AuthTabs isLogin={isLogin} onModeChange={handleModeChange} />
              <FormikAuthForm
                isLogin={isLogin}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                toggleVisibility={toggleVisibility}
                handleForgotPassword={handleForgotPassword}
                fadeAnim={fadeAnim}
              />
              <SocialButtons />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
