import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from './User';

const UserList = (users) => {
    const dispatch = useDispatch();
    const fetchedUsers = useSelector(state => state.users.users);
    const [filteredUserValue, setFilteredUserValue] = useState('');

    console.log(fetchedUsers)


    return (
        <>
            <input
                placeholder='Filter users'
                className='FilterUsers'
                onChange={(event) => {
                    setFilteredUserValue(event.target.value);
                }}
            />
            <ul>
                {(fetchedUsers.length !== 0) && fetchedUsers.filter((user) => {
                    if (!filteredUserValue) {
                        return true
                    }
                    return user.name.first.toLowerCase().includes(filteredUserValue)
                }).fetchedUsers.map((user) => (
                    <User key={user.login.uuid} user={user} />
                ))}
            </ul>
        </>
    );
};

export default UserList;