import React, { useEffect, useMemo, useState } from 'react';
import { Controller, ControllerRenderProps, FieldError } from 'react-hook-form';
import { DatePicker } from '@blueprintjs/datetime';
import { capitalizeString, formatDateToResultString } from '../../../../utils/stringUtils';
import SlideToogleContent from '../SlideToogleContent';

interface IDatePickerFieldProps {
  name: string,
  control: any,
  onChange?: (val: Date) => void,
  error?: FieldError | null
  label?: string
  half?: boolean
  minDate?: Date | undefined
  maxDate?: Date | undefined
  initialValue?: Date | undefined
  notEditable?: boolean
}

const DatePickerField = ({
  name,
  label,
  control,
  error,
  half,
  onChange: upperOnChange,
  minDate,
  maxDate,
  initialValue,
  notEditable,
}: IDatePickerFieldProps): JSX.Element => {
  const inputLabel: string = label || capitalizeString(name);
  const errorFormatter = useMemo(() => {
    let resultMessage = 'Unknown validation fail';
    if (error) {
      if (error.type === 'pattern') {
        resultMessage = `${inputLabel} must be in corresponding format`;
      } else if (error.type === 'required') {
        resultMessage = `${inputLabel} is required`;
      }
    }
    return resultMessage;
  }, [error]);

  const ControllerRender = ({
    onChange: localOnChange,
    value,
  }: ControllerRenderProps) => {
    const [isOpened, setIsOpened] = useState(false);
    useEffect(() => {
      upperOnChange(value);
    }, [value]);

    return (
      <>
        <div
          className={`container 
          ${name}
          ${isOpened ? ' active' : ''}
          ${notEditable ? ' static' : ' editable'}
          ${value ? ' valued' : ''}`}
        >
          <span className="label">
            {inputLabel}
          </span>
          <div
            className={`value ${name}`}
            onClick={
              notEditable
                ? null
                : () => {
                  setIsOpened(!isOpened);
                }
            }
          >
            {
              value
                ? (
                  <span>
                    {formatDateToResultString(value)}
                  </span>
                )
                : notEditable ? (
                  <span className="empty">
                    Not set
                  </span>
                ) : (
                  <div />
                )
            }
          </div>
          <SlideToogleContent isVisible={isOpened}>
            <DatePicker
              dayPickerProps={{
                initialMonth: initialValue,
              }}
              className="internal_date_picker"
              onChange={localOnChange}
              maxDate={maxDate}
              minDate={minDate}
            />
          </SlideToogleContent>
        </div>
      </>
    );
  };

  return (
    <div className={`input-wrapper date${half ? ' half' : ''}`}>
      <Controller
        control={control}
        name={name}
        label={inputLabel}
        render={ControllerRender}
      />
      {error && <span className="input error">{errorFormatter}</span>}
    </div>
  );
};
DatePickerField.defaultProps = {
  label: null,
  error: null,
  half: false,
  onChange: () => {
  },
  minDate: undefined,
  maxDate: undefined,
  initialValue: undefined,
  notEditable: false,
};

export default DatePickerField;
