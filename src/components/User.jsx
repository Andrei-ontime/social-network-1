import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, editUser } from './store/slices/fetchUsersAction';


const User = (props) => {
    const dispatch = useDispatch();
    const [userEdit, setUserEdit] = useState(null);
    const [openModal, setOpenModal] = useState(false);


    const toggleDeleteUser = (id) => {
        dispatch(deleteUser(id))



    };
    return (
        <div>
            <li className='ListItem'>
                <img
                    src={props.user.picture.large}
                    alt={props.user.picture.large}
                    className='Img'
                />
                <div className='Info'>
                    <p>Name: {props.user.name.first}</p>
                    <p>Email: {props.user.email}</p>
                    <button
                        onClick={() => {
                            setOpenModal(true);
                            setUserEdit(props.user);
                        }}
                        className='ChangeInfoBtn'
                    >
                        change info
                    </button>
                    <button
                        onClick={() => toggleDeleteUser(props.user.login.uuid)}
                        className='DeleteBtn'
                    >
                        delete
                    </button>
                </div>
            </li>
        </div>
    );
};

export default User;