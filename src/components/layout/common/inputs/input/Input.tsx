import './Input.scss';
import React, { FC, useState } from 'react';
import { Field, ErrorMessage as Error } from 'formik';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

interface InputField {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    type: string;
}

const Input: FC<InputField> = ({ id, label, name, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={'inputContainer'}>
            <label htmlFor={id}>{label}</label>
            {type === 'password' ? (
                <div className={'eyeContainer'}>
                    <Field
                        type={
                            type === 'password' && !showPassword
                                ? 'password'
                                : 'text'
                        }
                        name={name}
                        id={id}
                        placeholder={placeholder}
                    />
                    {type === 'password' && (
                        <span
                            className={'inputEye'}
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <VisibilityIcon />
                            ) : (
                                <VisibilityOffOutlinedIcon />
                            )}
                        </span>
                    )}
                </div>
            ) : (
                <Field
                    type={
                        type === 'password' && !showPassword
                            ? 'password'
                            : 'text'
                    }
                    name={name}
                    id={id}
                    placeholder={placeholder}
                />
            )}
            <Error name={name}>
                {error => <p className={'error'}>{error}</p>}
            </Error>
        </div>
    );
};

export default Input;
