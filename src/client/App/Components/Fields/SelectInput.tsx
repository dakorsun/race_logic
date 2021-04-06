import React, {
  // useEffect,
  useMemo, useState } from 'react';
import SlideToogleContent from '../SlideToogleContent';

interface SelectInputAttributes {
  name: string,
  // register: any,
  options: { value: any, label: string }[],
  setValue: (val: any) => void,
  error?: { type: string } | null,
  label?: string | null,
  half?: boolean
}

const SelectInput = ({
  name,
  // register,
  options,
  setValue,
  error,
  label,
  half,
}: SelectInputAttributes): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);
  const [localValue, setLocalValue] = useState(null);
  const inputLabel: string = label || name;
  const valueToLabelParser = useMemo(() => (~options.findIndex((option) => option.value === localValue)
    ? options.find((option) => option.value === localValue).label
    : ''), [localValue]);
  const errorFormatter = useMemo(() => {
    let resultMessage = '';
    if (error) {
      if (error.type === 'required') {
        resultMessage = `${name} is required`;
      }
    }
    return resultMessage;
  }, [error]);

  const toogling = () => setIsOpened(!isOpened);
  const onChange = (value: any) => {
    setLocalValue(value);
    setValue(value);
  };
  return (
    <div className={`input-wrapper select${half ? ' half' : ''}`}>
      <div
        className={`container${isOpened ? ' active' : ''}${localValue ? ' valued' : ''}`}
        onClick={toogling}
      >
        <div className="label">
          {inputLabel}
        </div>
        <div className="value">
          {
            localValue || isOpened
              ? (
                <span>
                  {valueToLabelParser}
                </span>
              )
              : (
                <div />
              )
          }
        </div>
        <SlideToogleContent isVisible={isOpened}>
          <div className="options">
            {options.map((option) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                className="option"
                onClick={(e) => {
                  e.preventDefault();
                  onChange(option.value);
                }}
              >
                <span>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </SlideToogleContent>
      </div>
      {error && <span>{errorFormatter}</span>}
    </div>
  );
};

SelectInput.defaultProps = {
  label: null,
  error: null,
  half: false,
};
export default SelectInput;
