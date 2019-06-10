import React from 'react';

class BookListItem extends React.Component{
    render(){
        return(
            <div className="book-list-item">
                <p>Name: {this.props.book.name}</p>
                <p>Author: {this.props.book.author}</p>
                <p>Published: {this.props.book.published_date}</p>
                <p>Category: {this.props.book.category.name}</p>
            </div>
        )
    }
}

export default BookListItem;