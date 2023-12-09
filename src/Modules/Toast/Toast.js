import React from 'react';
import { IconCircleCheck, IconX } from '@tabler/icons-react';
import '../../styles/toast/Toast.scss'

const Toast = () => {
    return (
        <div className='toast'>
            <div className='toast-box'>
                <div>
                    <IconCircleCheck className='sucess' />
                </div>
                <div>
                    <p className='title'>Sucess</p>
                    <p>Mon message de sucess</p>
                </div>
                <div className='close'>
                    <IconX></IconX>
                </div>
            </div>
        </div>
    );
};

export default Toast;