import React from 'react';

interface SubmitButtonAttributes {
  submit: () => void
  size?: 's' | 'm' | 'l'
  label?: string
  error?: string
  disabled?: boolean
}

const SubmitButton = ({
  label, size, submit, error, disabled,
}: SubmitButtonAttributes): JSX.Element => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div
    className={`button-wrapper submit ${size}`}
    onClick={(e) => {
      e.preventDefault();
      if (!disabled) {
        submit();
      }
    }}
  >
    <div className={`container${disabled ? ' disabled' : ''}`}>
      <div className="label">
        {label}
      </div>
    </div>
    {error && <span className="error">{error}</span>}
  </div>
);

SubmitButton.defaultProps = {
  label: 'Submit',
  size: 'm',
  error: '',
  disabled: false,
};

export default SubmitButton;
