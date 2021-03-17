import React from 'react';

interface SubmitButtonAttributes {
    submit: () => void
    size?: 's' | 'm' | 'l'
    label?: string
    error?: string
}

const SubmitButton = ({label, size, submit, error}: SubmitButtonAttributes): JSX.Element => (
    <div
        className={`button-wrapper submit ${size}`}
        onClick={(e) => {
            e.preventDefault();
            submit();
        }}
    >
        <div className="container">
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
    error: ''
};

export default SubmitButton;
