import React from 'react';
import Modal from './Modal';
import './styles/ChangeStatusModal.css';

class ChangeStatusModal extends React.Component{

    renderSuggestions (){
        //console.log("suggestions: ",this.props.suggestions);
        
        if(this.props.suggestions.length === 0 ){
            return null;
        }
        return (
            <ul>
                {this.props.suggestions.map( user => 
                    <li 
                        key={user.id} 
                        onClick={() => this.props.suggestionSelected(user)}
                    >
                        {user.name}
                    </li>
                )}
            </ul>
        )
    }


    render(){
        
        return (
            <Modal isOpen={this.props.isOpen} onClose={this.props.onCloseModal}>
                <div className="container">
                    <div className="row">
                        <h5>Change status</h5>
                    </div>
                    <div className="row">
                        <form>
                            <div className="form-group">
                                <label>Status:</label>
                                <div className="custom-control custom-switch">
                                    <input 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id="customSwitch1"
                                        checked={this.props.book.status}
                                        onChange={this.props.onChangeStatus}    
                                    />
                                    <label 
                                        className="custom-control-label" 
                                        for="customSwitch1"
                                    >
                                        {this.props.book.status ? 'Borrowed' : 'Available'}
                                    </label>
                                </div>
                            </div>
                            { this.props.book.status && 
                                <div className="form-group">
                                    <label>User:</label>
                                    <div className="AutoCompleteText">
                                        <input 
                                            onChange={this.props.onChangeTextChanged}
                                            autoComplete="off" 
                                            type="text"
                                            name="user"
                                            className="form-control"
                                            value={this.props.book.user}
                                            />
                                            {this.renderSuggestions()}  
                                    </div>
                                </div>
                            }
                            <button 
                                type="submit" 
                                onClick={this.props.onSubmit} 
                                className="btn btn-success mr-4"
                            >
                                Save
                            </button>
                            <button type="button" onClick={this.props.onCloseModal} className="btn btn-danger">Cancel</button>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }

} 

export default ChangeStatusModal;