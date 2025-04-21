import { View } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
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
    <ScreenContainer style={styles.auth.screenContainer}>
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
    </ScreenContainer>
  );
}
