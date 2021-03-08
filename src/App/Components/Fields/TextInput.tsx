import React, { useMemo } from 'react';

interface TextInputAttributes {
  name: string,
  register: any,
  error?: { type: string }
  label?: string
}

const TextInput = ({
  name, label, register, error,
}:TextInputAttributes) => {
  const errorFormatter = useMemo(() => {
    let resultMessage = '';
    if (error) {
      if (error.type === 'required') {
        resultMessage = 'Required';
      }
    }
    return resultMessage;
  }, [error]);
  return (
    <div>
      {label ? (
        <label htmlFor={name}>
          {label}
          <input type="text" name={name} ref={register} />
          {error && <span>{errorFormatter}</span>}
        </label>
      )
        : (
          <>
            <input type="text" name={name} id={name} ref={register} />
            {error && <span>{errorFormatter}</span>}
          </>
        )}
    </div>
  );
};

TextInput.defaultProps = {
  label: null,
  error: null,
};
export default TextInput;
