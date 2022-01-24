import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = (props) => {
    if (props.openModal) {
        return ReactDOM.createPortal(
            <div className='backgroundModal'>
                <div className='wrapperModal'>{props.children}</div>
            </div>,
            document.getElementById('portal')
        );
    }
    return null;
};

export default Modal;