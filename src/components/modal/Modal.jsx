import React from 'react';
import ReactDOM from 'react-dom';
import "./Modal.css";;

const Modal = (openModal) => {
    return (openModal && 
        ReactDOM.createPortal(<div className='backgroundModal'>
            <div className='wrapperModal'>
                <label for='name'>change name: </label>
                <input id='name'/>
            </div>
        </div>, document.getElementById('portal')))
    
};

export default Modal;