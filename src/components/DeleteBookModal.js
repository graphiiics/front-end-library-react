import React from 'react';
import Modal from './Modal';

function DeleteBookModal (props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onCloseModal}>
            <div className="container">
                <div className="row">
                    <h5>Are you sure?</h5>
                </div>
                <div className="row">
                    <button onClick={props.onDeleteBook} className="btn btn-d btn-danger mr-4">Delete</button> 
                    <button onClick={props.onCloseModal} className="btn btn-success">Cancel</button>
                </div>
            </div>
        </Modal>
    )

} 

export default DeleteBookModal;