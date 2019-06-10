import React from 'react';
import './styles/Book.css';
class Book extends React.Component{
    render(){
        return(
            <div className="book">
                <p><span>Name:</span>{this.props.book.name}</p>
                <p><span>Author:</span>{this.props.book.author}</p>
                <p><span>Published:</span>{this.props.book.published_date}</p>
                <p><span>Category:</span>{this.props.book.category}</p>
                <p><span>Status:</span>{this.props.book.status}</p>
            </div>
        )
    }
}

export default Book;