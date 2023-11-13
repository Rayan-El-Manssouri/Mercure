import React from 'react';
import { IconUserCircle } from '@tabler/icons-react';

const UsersList = (props) => {
    const pseudo = props.pseudo
    const message = props.message

    return (
        <li>
            <IconUserCircle />
            <div><h1>{pseudo}</h1><p>{message}</p></div>
            <div className='date'>Hier</div>
        </li>
    );
};

export default UsersList;