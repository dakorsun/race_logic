import React, { useMemo } from 'react';

interface PasswordInputAttributes {
  name: string,
  register: any,
  error?: { type: 'required' }
  label?: string
}

const PasswordInput = ({
  name, label, register, error,
}:PasswordInputAttributes) => {
  const errorFormatter = useMemo(() => {
    let resultMessage = '';
    if (error) {
      if (error.type === 'required') {
        resultMessage = 'Password is required';
      }
    }
    return resultMessage;
  }, [error]);
  return (
    <div>
      {label ? (
        <label htmlFor={name}>
          {label}
          <input type="password" name={name} ref={register} />
          {error && <span>{errorFormatter}</span>}
        </label>
      )
        : (
          <>
            <input type="password" name={name} id={name} ref={register} />
            {error && <span>{errorFormatter}</span>}
          </>
        )}
    </div>
  );
};

PasswordInput.defaultProps = {
  label: null,
  error: null,
};
export default PasswordInput;
