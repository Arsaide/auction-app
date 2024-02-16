import React, { FC, useEffect, useState } from 'react';

const PersonalData = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userPassword, setUserPassword] = useState<string | null>(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const password = localStorage.getItem('userPassword');
        if (email && password) {
            setUserEmail(email);
            setUserPassword(password);
        }
    }, []);
    return (
        <div>
            {userEmail && userPassword && (
                <div>
                    <p>User Email: {userEmail}</p>
                    <p>User Password: {userPassword}</p>
                </div>
            )}
        </div>
    );
};

export default PersonalData;
