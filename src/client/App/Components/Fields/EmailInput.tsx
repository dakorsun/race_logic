import React, { useMemo } from 'react';

interface EmailInputAttributes {
  name: string,
  register: any,
  className?: string
  error?: { type: 'pattern' | 'required' },
  label?: string | null,
}

const EmailInput = ({
  name, label, register, error, className,
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
  return label ? (
    <label htmlFor={name} className={`${className} input-wrapper`}>
      {label}
      <input type="email" name={name} ref={register} />
      {error && <span>{errorFormatter}</span>}
    </label>
  )
    : (
      <div className={`${className} input-wrapper`}>
        <input type="email" name={name} id={name} ref={register} />
        {error && <span>{errorFormatter}</span>}
      </div>
    );
};

EmailInput.defaultProps = {
  label: null,
  error: null,
  className: '',
};
export default EmailInput;
