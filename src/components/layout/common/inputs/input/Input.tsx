import './Input.scss';
import React, { FC, useState } from 'react';
import { Field, ErrorMessage as Error } from 'formik';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { InputField } from '../inputField';

const Input: FC<InputField> = ({ id, label, name, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const fieldType =
        type === 'password' && !showPassword ? 'password' : 'text';

    return (
        <div className={'inputContainer'}>
            <label htmlFor={id}>{label}</label>
            {type === 'text' ? (
                <Field
                    type={fieldType}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    as={type === 'text' ? 'textarea' : 'input'}
                />
            ) : (
                <div className={'eyeContainer'}>
                    <Field
                        type={fieldType}
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
            )}
            <Error name={name}>
                {error => <p className={'error'}>{error}</p>}
            </Error>
        </div>
    );
};

export default Input;
