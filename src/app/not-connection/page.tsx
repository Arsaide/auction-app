import React from 'react';
import WarningAlert from '../../components/layout/common/alerts/warningAlert/WarningAlert';
import NotConnect from '../../lib/icons/notConnect';
import './page.css';

const NotConnection = () => {
    return (
        <>
            <WarningAlert
                text={"Oops... You don't have an internet connection!"}
                title={'500'}
            />
            <div className={'connectionCnt'}>
                <div className={'connectionContent'}>
                    <NotConnect width={'100'} height={'100'} />
                </div>
            </div>
        </>
    );
};

export default NotConnection;
