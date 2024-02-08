import React, {FC, useContext, useState} from 'react';
import {Context} from "../../../../index";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    return (
        <div>
            <input
                type={'text'}
                value={email}
                placeholder={'email'}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type={'text'}
                value={password}
                placeholder={'password'}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Registration</button>
        </div>
    );
};

export default LoginForm;
