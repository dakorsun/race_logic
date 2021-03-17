import React
, { useEffect, useRef }
  from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { AUTH_TOKEN, EmailRegEx } from '../../../config/constants';
import { LOGIN_MUTATION } from './mutations';
import TextInput from '../Fields/TextInput';
import SubmitButton from '../Fields/SubmitButton';

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

  const formRef = useRef(null);
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
          submit={() => {
            formRef.current?.dispatchEvent(new Event('submit'));
          }}
        />
      </div>
    </form>
  );
};

export default LoginComponent;
