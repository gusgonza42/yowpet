import { Formik } from 'formik';
import { AuthForm } from '@components/auth/AuthForm';

export const FormikAuthForm = ({
  isLogin,
  initialValues,
  validationSchema,
  handleSubmit,
  toggleVisibility,
  handleForgotPassword,
  fadeAnim,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}
    >
      {formikProps => (
        <AuthForm
          isLogin={isLogin}
          formikProps={formikProps}
          toggleVisibility={toggleVisibility}
          handleForgotPassword={handleForgotPassword}
          fadeAnim={fadeAnim}
        />
      )}
    </Formik>
  );
};
