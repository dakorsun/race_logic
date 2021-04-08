import React, { useMemo } from 'react';
import { capitalizeString } from '../../../../utils/stringUtils';

interface TextInputAttributes {
  name: string,
  register: any,
  type?: string,
  error?: { type: string }
  label?: string
  half?: boolean
  notEditable?: boolean
  defaultValue?: string | null
}

const TextField = ({
  name, label, register, error, type, half, notEditable, defaultValue,
}:TextInputAttributes): JSX.Element => {
  const inputLabel: string = label || capitalizeString(name);
  const errorFormatter = useMemo(() => {
    let resultMessage = 'Unknown validation fail';
    if (error) {
      if (error.type === 'pattern') {
        resultMessage = `${inputLabel} must be in corresponding format`;
      } else
      if (error.type === 'required') {
        resultMessage = `${inputLabel} is required`;
      }
    }
    return resultMessage;
  }, [error]);
  return (
    <div className={`input-wrapper text ${half ? ' half' : ''}`}>
      <label
        htmlFor={name}
        className={`input 
          ${type}
          ${notEditable ? ' static' : ' editable'}
        `}
      >
        {notEditable
          ? (
            <span className={`input ${type} field`}>
              {defaultValue}
            </span>
          )
          : (
            <input
              className={`input ${type} field`}
              placeholder=" "
              type={type}
              name={name}
              ref={register}
              autoComplete="off"
            />
          )}
        <span className={`input${notEditable ? ' static' : ''} ${type} label`}>{inputLabel}</span>
        {error && <span className={`input ${type} error`}>{errorFormatter}</span>}
      </label>
    </div>
  ) as JSX.Element;
};

TextField.defaultProps = {
  label: null,
  error: null,
  type: 'text',
  half: false,
  notEditable: false,
  defaultValue: null,
};
export default TextField;
