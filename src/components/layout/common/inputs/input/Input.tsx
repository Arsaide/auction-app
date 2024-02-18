import './Input.scss';
import React, { FC } from 'react';
import { Field, ErrorMessage as Error } from 'formik';

interface InputField {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    type: string;
}

const Input: FC<InputField> = ({ id, label, name, placeholder, type }) => {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <Field name={name} id={id} type={type} placeholder={placeholder} />
            <Error name={name}>{error => <span>{error}</span>}</Error>
        </div>
    );
};

export default Input;
