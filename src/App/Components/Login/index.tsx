import React
, { useEffect, useRef }
  from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EmailRegEx } from '../../../config/constants';
import TextInput from '../Fields/TextInput';
import SubmitButton from '../Fields/SubmitButton';
// eslint-disable-next-line import/no-cycle
import { useLoginMutation } from '../../../apollo/mutations/user';
import { useAuthToken } from '../../Middlewares/AuthGate';

interface FormData {
  email: string,
  password: string
}

const LoginComponent = (): JSX.Element => {
  const history = useHistory();
  const [, setAuthToken] = useAuthToken();
  const [loginMutation, { data: loginMutationData, error: loginMutationError, loading }] = useLoginMutation();
  const {
    register, handleSubmit, errors,
    setError,
    clearErrors,
  } = useForm();

  const formRef = useRef(null);
  const emailRef = register({
    required: true,
    pattern: EmailRegEx,
  });
  const passwordRef = register({ required: true });

  const onSubmit = async (data: FormData) => {
    await loginMutation({ variables: data });
  };

  const clearAllErrors = () => {
    clearErrors();
  };

  useEffect(() => {
    if (loginMutationData && loginMutationData.login.token) {
      setAuthToken(loginMutationData.login.token);
      history.push('/');
    }
  }, [loginMutationData]);
  useEffect(() => {
    if (loginMutationError) {
      setError('common', { message: loginMutationError.message });
      console.log('loginError: ', loginMutationError);
    }
  }, [loginMutationError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        clearAllErrors();
      }}
      ref={formRef}
    >
      <div className="form-block">
        <h1 className="form-element">Login</h1>
      </div>
      <div className="form-block">
        <TextInput
          type="email"
          name="email"
          register={emailRef}
          error={errors.email}
        />
        <TextInput
          type="password"
          name="password"
          register={passwordRef}
          error={errors.password}
        />
      </div>
      <div className="form-block central">
        <SubmitButton
          label="Go"
          error={errors.common && errors.common.message}
          disabled={
            loading
            || !!Object.keys(errors).length
          }
          submit={() => {
            formRef.current?.dispatchEvent(new Event('submit'));
          }}
        />
      </div>
    </form>
  );
};

export default LoginComponent;
