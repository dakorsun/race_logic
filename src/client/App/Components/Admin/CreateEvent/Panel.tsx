import React, {
  // useEffect,
  useRef, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment-timezone';
import TextInput from '../../Fields/TextInput';
import SubmitButton from '../../Fields/SubmitButton';
// import { useCreateEventMutation } from '../../../../apollo/mutations/event';
import DatePickerInput from '../../Fields/DatePicker';

interface FormData {
  name: string
  dateFrom: Date
  dateTo: Date | null
}

interface IPanelProps {

}

function Panel({}: IPanelProps): JSX.Element {
  // const [createEventMutation, {
  //   data, error, called, loading,
  // }] = useCreateEventMutation();

  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    errors,
    // setValue,
    getValues,
    // setError,
  } = useForm<FormData & { common: string }>();
  const formRef = useRef(null);
  const nameRef = register({ required: true });

  const [dateToMinDate, setDateToMinDate] = useState(undefined);
  const [dateToInitialValue, setDateToInitialValue] = useState(undefined);

  const onDateFromChange = (value: Date): void => {
    const dateFrom = moment(value || null);
    const dateTo = moment(getValues('dateTo') || null);
    console.log('dateFrom.toDate().getTime(): ', dateFrom.toDate().getTime());
    console.log('dateTo.toDate().getTime(): ', dateTo.toDate().getTime());
    if (!dateTo.toDate().getTime()) {
      setDateToInitialValue(value);
      // setValue('dateTo', value);
    } else if (dateFrom.toDate().getTime()) {
      if (dateFrom.toDate().getTime() > dateTo.toDate().getTime()) {
        setDateToInitialValue(value);
        // setValue('dateTo', value);
      }
    } else {
      // setValue('dateTo', null);
      setDateToInitialValue(undefined);
    }
    setDateToMinDate(value || undefined);
  };

  const clearAllErrors = () => {
    clearErrors();
  };
  return (
    <form
      className="create-form"
      // onSubmit={handleSubmit(onSubmit)}
      onSubmit={handleSubmit(() => {
        console.log('submit');
      })}
      onChange={() => {
        clearAllErrors();
      }}
      ref={formRef}
    >
      <div className="form-block">
        <h1>
          Create event
        </h1>
      </div>
      <div className="form-block">
        <TextInput register={nameRef} name="name" half error={errors.name} />
      </div>
      <div className="form-block row">
        <DatePickerInput
          control={control}
          onChange={onDateFromChange}
          initialValue={new Date()}
          name="dateFrom"
          label="Starting date"
          half
        />
        <DatePickerInput
          control={control}
          minDate={dateToMinDate}
          initialValue={dateToInitialValue}
          name="dateTo"
          label="Ending date"
          half
        />
      </div>
      <div className="form-block">
        <SubmitButton
          label="Create"
          error={errors.common && errors.common.message}
          disabled={
            // loading ||
            !!Object.keys(errors).length
          }
          submit={() => {
            formRef.current?.dispatchEvent(new Event('submit'));
          }}
        />
      </div>
    </form>
  );
}

Panel.defaultProps = {};

export default Panel;
