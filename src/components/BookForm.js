import React from 'react';
import './styles/BookForm.css';
class BookForm extends React.Component{
    renderSuggestions (){
        //console.log("suggestions: ",this.props.suggestions);
        
        if(this.props.suggestions.length === 0 ){
            return null;
        }
        return (
            <ul>
                {this.props.suggestions.map( category => 
                    <li 
                        key={category.id} 
                        onClick={() => this.props.suggestionSelected(category)}
                    >
                        {category.name}
                    </li>
                )}
            </ul>
        )
    }


    render(){
        return(
            <div className="book_form">
                <form>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            onChange={this.props.onChange}  
                            className="form-control" 
                            type="text" 
                            name="name"
                            value={this.props.formValues.name} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Author:</label>
                        <input
                            onChange={this.props.onChange} 
                            className="form-control" 
                            type="text" 
                            name="author"
                            value={this.props.formValues.author}   
                        />
                    </div>
                    <div className="form-group">
                        <label>Published date:</label>
                        <input
                            onChange={this.props.onChange} 
                            className="form-control" 
                            type="date" 
                            name="published_date"
                            value={this.props.formValues.published_date}  
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <div className="AutoCompleteText">
                          <input 
                            onChange={this.props.onChangeTextChanged}
                            autoComplete="off" 
                            type="text"
                            name="category"
                            className="form-control"
                            value={this.props.categoryText}
                            />
                            {this.renderSuggestions()}  
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        onClick={this.props.onSubmit} 
                        className="btn btn-primary"
                    >
                        Save
                    </button>
                </form>
            </div>
        )
    }
}

export default BookForm;