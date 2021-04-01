import React, { useMemo } from 'react';

interface PasswordInputAttributes {
  name: string,
  register: any,
  className?: string,
  error?: { type: 'required' }
  label?: string
}

const PasswordInput = ({
  name, label, register, error, className,
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
  return label ? (
    <label htmlFor={name} className={`${className} input-wrapper`}>
      {label}
      <input
        type="password"
        name={name}
        ref={register}
      />
      {error && <span>{errorFormatter}</span>}
    </label>
  )
    : (
      <div className={`${className} input-wrapper`}>
        <input
          type="password"
          name={name}
          id={name}
          ref={register}
        />
        {error && <span>{errorFormatter}</span>}
      </div>
    );
};

PasswordInput.defaultProps = {
  label: null,
  error: null,
  className: '',
};
export default PasswordInput;
