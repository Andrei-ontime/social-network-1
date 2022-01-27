import Modal from "./modal/Modal";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { editUser } from "./store/actionCreators/editUser";

const ModalEdit = ({ user, onSave, openModal, setOpenModal }) => {
    const [userEdit, setUserEdit] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [disableButton, setDisableButton] = useState(false)
    const dispatch = useDispatch();

    const toggleUserEdit = (e) => {
        setUserEdit({ ...userEdit, name: { ...userEdit.name, first: e.target.value } });
        if (e.target.value) {
            setValidationError('')
            setDisableButton(false)
        } else {
            setDisableButton(true)
            setValidationError('Name can not be empty')
        }
    }

    const TryToSave = () => {
        if (userEdit.name.first.length !== 0) {
            dispatch(editUser(userEdit))
            setOpenModal(false)
        }
    }

    useEffect(() => {
        user && setUserEdit(user)
    }, [user])

    if (!userEdit) return null
    return < Modal openModal={openModal} >
        <label >change name: </label>
        <input
            onChange={(e) => {
                toggleUserEdit(e);
            }}
            value={userEdit.name.first}
        />
        <span className='Error'>{validationError}</span>
        <button
            disabled={disableButton}
            onClick={TryToSave}
        >
            сохранить
        </button>
    </Modal >


};

export default ModalEdit;




