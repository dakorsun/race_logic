import React, { useMemo } from 'react';

interface EmailInputAttributes {
  name: string,
  register: any,
  error?: { type: 'pattern' | 'required' },
  label?: string | null,
}

const EmailInput = ({
  name, label, register, error,
}:EmailInputAttributes): JSX.Element => {
  const errorFormatter = useMemo(() => {
    let resultMessage = '';
    if (error) {
      if (error.type === 'pattern') {
        resultMessage = 'Email must be in corresponding format';
      }
      if (error.type === 'required') {
        resultMessage = 'Email is required';
      }
    }
    return resultMessage;
  }, [error]);
  return (
    <div>
      {label ? (
        <label htmlFor={name}>
          {label}
          <input type="email" name={name} ref={register} />
          {error && <span>{errorFormatter}</span>}
        </label>
      )
        : (
          <>
            <input type="email" name={name} id={name} ref={register} />
            {error && <span>{errorFormatter}</span>}
          </>
        )}
    </div>
  );
};

EmailInput.defaultProps = {
  label: null,
  error: null,
};
export default EmailInput;
