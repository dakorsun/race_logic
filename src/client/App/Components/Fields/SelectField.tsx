import React, {
  useMemo, useState,
} from 'react';
import SlideToogleContent from '../SlideToogleContent';

interface SelectInputAttributes {
  name: string,
  options: { value: any, label: string }[],
  setValue: (val: any) => void,
  error?: { type: string } | null,
  label?: string | null,
  half?: boolean
  notEditable?: boolean
  defaultValue?: any | null
}

const SelectField = ({
  name,
  options,
  setValue,
  error,
  label,
  half,
  notEditable,
  defaultValue,
}: SelectInputAttributes): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);
  const [localValue, setLocalValue] = useState(defaultValue);
  const inputLabel: string = label || name;
  const valueToLabelParser = useMemo(() => (
    ~options.findIndex(
      (option) => option.value === localValue,
    )
      ? options.find(
        (option) => option.value === localValue,
      ).label
      : ' '
  ), [localValue]);
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
    if (value === localValue) {
      setLocalValue(null);
      setValue(null);
    } else {
      setLocalValue(value);
      setValue(value);
    }
  };
  const isValued = useMemo(() => !!localValue, [localValue]);
  return (
    <div className={`input-wrapper select${half ? ' half' : ''}`}>
      <div
        className={`container
        ${isOpened ? ' active' : ''}
        ${isValued ? ' valued' : ''}
        ${notEditable ? ' static' : ' editable'}
        `}
        onClick={toogling}
      >
        <div className="label">
          {inputLabel}
        </div>
        <div className="value">
          {
            notEditable
              ? (
                <span className={`${!defaultValue ? ' empty' : ''}`}>
                  {defaultValue || 'Not set'}
                </span>
              )
              : localValue || isOpened
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
        {!notEditable
        && (
          <SlideToogleContent isVisible={isOpened}>
            <div className="options">
              {options.map((option) => (
                <div
                  className="option"
                  onClick={
                    notEditable
                      ? null
                      : (e) => {
                        e.preventDefault();
                        onChange(option.value);
                      }
                  }
                >
                  <span>
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </SlideToogleContent>
        )}
      </div>
      {error && <span>{errorFormatter}</span>}
    </div>
  );
};

SelectField.defaultProps = {
  label: null,
  error: null,
  half: false,
  notEditable: false,
  defaultValue: null,
};
export default SelectField;
