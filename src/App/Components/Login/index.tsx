import React
, { useEffect }
  from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import EmailInput from '../Fields/EmailInput';
import PasswordInput from '../Fields/PasswordInput';
import { AUTH_TOKEN, EmailRegEx } from '../../../config/constants';
import { LOGIN_MUTATION } from './mutations';

interface FormData {
  email: string,
  password: string
}

const LoginComponent = (): JSX.Element => {
  const history = useHistory();
  const [login, { data: loginMutationData, error: loginError }] = useMutation(LOGIN_MUTATION);
  const {
    register, handleSubmit, errors, setError, clearErrors,
  } = useForm();

  const emailRef = register({
    required: true,
    pattern: EmailRegEx,
  });
  const passwordRef = register({ required: true });

  const onSubmit = async (data: FormData) => {
    await login({ variables: data });
  };

  const clearAllErrors = () => {
    clearErrors();
  };

  useEffect(() => {
    if (loginMutationData && loginMutationData.login.token) {
      localStorage.setItem(AUTH_TOKEN, loginMutationData.login.token);
      history.push('/');
    }
  }, [loginMutationData]);
  useEffect(() => {
    if (loginError) {
      setError('common', { message: loginError.message });
      console.log('loginError: ', loginError);
    }
  }, [loginError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        clearAllErrors();
      }}
    >
      <h1>Login</h1>
      <div>
        <EmailInput
          name="email"
          register={emailRef}
          error={errors.email}
        />
        <PasswordInput
          name="password"
          register={passwordRef}
          error={errors.password}
        />
      </div>
      <div>
        <input
          type="submit"
        />
        {errors.common && errors.common.message && <span>{errors.common.message}</span>}
      </div>
    </form>
  );
};

export default LoginComponent;
