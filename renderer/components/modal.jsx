import React from 'react';

const Modal = ({ children, show }) => {
    return (
        <React.Fragment>
            <div className='modal-container' style={{display: show ? 'block' : 'none'}}>
                <div className='modal-content'>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;
