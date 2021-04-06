import React, { useEffect, useMemo, useState } from 'react';
import { Controller, ControllerRenderProps, FieldError } from 'react-hook-form';
import { DatePicker } from '@blueprintjs/datetime';
import { capitalizeString, formatDateToResultString } from '../../../../utils/stringUtils';
import SlideToogleContent from '../SlideToogleContent';

interface IDatePickerInputProps {
  name: string,
  control: any,
  onChange?: (val: Date) => void,
  error?: FieldError | null
  label?: string
  half?: boolean
  minDate?: Date | undefined
  maxDate?: Date | undefined
  initialValue?: Date | undefined
}

const DatePickerInput = ({
  name,
  label,
  control,
  error,
  half,
  onChange: upperOnChange,
  minDate,
  maxDate,
  initialValue,
}: IDatePickerInputProps): JSX.Element => {
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
          className={`container ${name}${isOpened ? ' active' : ''}${value ? ' valued' : ''}`}
        >
          <span className="label">
            {inputLabel}
          </span>
          <div
            className={`value ${name}`}
            onClick={() => {
              setIsOpened(!isOpened);
            }}
          >
            {value

              ? (
                <span>
                  {formatDateToResultString(value)}
                </span>
              )
              : <div />}
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
DatePickerInput.defaultProps = {
  label: null,
  error: null,
  half: false,
  onChange: () => {
  },
  minDate: undefined,
  maxDate: undefined,
  initialValue: undefined,
};

export default DatePickerInput;
