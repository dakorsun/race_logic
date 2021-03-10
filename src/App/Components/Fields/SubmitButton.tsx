import React from 'react';

interface SubmitButtonAttributes {
  submit: () => void
  size?: 's' | 'm' | 'l'
  label?: string
}

const SubmitButton = ({ label, size, submit }: SubmitButtonAttributes):JSX.Element => (
  <div
    className={`button-wrapper submit ${size}`}
    onClick={(e) => {
      e.preventDefault();
      submit();
    }}
  >
    <div className="label">
      {label}
    </div>
  </div>
);

SubmitButton.defaultProps = {
  label: 'Submit',
  size: '',
};

export default SubmitButton;
