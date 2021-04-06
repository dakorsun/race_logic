import React, {
  useEffect,
  useRef, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment-timezone';
import TextInput from '../../Fields/TextInput';
import SubmitButton from '../../Fields/SubmitButton';
import DatePickerInput from '../../Fields/DatePicker';
import { useCreateEventMutation } from '../../../../apollo/mutations/event';
import { EventTypes, EventTypesLabels } from '../../../../../config/types';
import SelectInput from '../../Fields/SelectInput';

interface FormData {
  name: string
  dateFrom: Date
  dateTo: Date | null
  type: EventTypes | null
}

interface IPanelProps {

}

// eslint-disable-next-line no-empty-pattern
function Panel({ }: IPanelProps): JSX.Element {
  const [createEventMutation, {
    data: createEventMutationData, error: createEventMutationError, called, loading,
  }] = useCreateEventMutation();

  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    errors,
    setValue,
    getValues,
    setError,
  } = useForm<FormData & { common: string }>({
    defaultValues: { type: null },
  });
  const formRef = useRef(null);
  const nameRef = register({ required: true });
  register({ name: 'type', required: true });

  const [dateToMinDate, setDateToMinDate] = useState(undefined);
  const [dateToInitialValue, setDateToInitialValue] = useState(undefined);

  const typeOptions: { value: string | null, label: string }[] = [{
    value: null,
    label: 'None',
  }];
  Object.keys(EventTypes).forEach((key) => {
    typeOptions.push({
      value: key,
      label: EventTypesLabels[key],
    });
  });

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

  const onSubmit = async (data: FormData) => {
    console.log('form data: ', data);
    if (!data.dateFrom) {
      setError('dateFrom', { type: 'required' });
    } else if (!data.dateTo) {
      setError('dateTo', { type: 'required' });
    } else if (!data.type) {
      setError('type', { type: 'required' });
    } else {
      await createEventMutation({ variables: data });
    }
  };

  useEffect(() => {
    (async () => {
      if (called && !loading) {
        // do data update
      }
    })();
  }, [createEventMutationData]);

  useEffect(() => {
    if (createEventMutationError) {
      setError('common', { message: createEventMutationError.message });
    }
  }, [createEventMutationError]);

  return (
    <form
      className="create-form"
      onSubmit={handleSubmit(onSubmit)}
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
      <div className="form-block row">
        <TextInput register={nameRef} name="name" half error={errors.name} />
        <SelectInput
          name="type"
          label="Event type"
          setValue={(val) => {
            setValue('type', val);
          }}
          options={typeOptions}
          error={errors.type}
          half
        />
      </div>
      <div className="form-block row">
        <DatePickerInput
          name="dateFrom"
          label="Starting date"
          control={control}
          onChange={onDateFromChange}
          initialValue={new Date()}
          error={errors.dateFrom}
          half
        />
        <DatePickerInput
          name="dateTo"
          label="Ending date"
          control={control}
          minDate={dateToMinDate}
          initialValue={dateToInitialValue}
          error={errors.dateTo}
          half
        />
      </div>
      <div className="form-block row" />
      <div className="form-block">
        <SubmitButton
          label="Create"
          error={errors.common && errors.common.message}
          disabled={
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
