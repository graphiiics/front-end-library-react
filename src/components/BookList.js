import React from 'react';
import './styles/BookList.css';
import BookListItem from './BookListItem';
import { Link } from 'react-router-dom';

class BookList extends React.Component{
    render(){
        console.log(this.props.books);
        if(this.props.books.length === 0 ){
            return(
                <div>
                    <h3>The library is empy</h3>
                </div>
            )
        }
        return(
            <div id="book-cards">
                {this.props.books.map(book => {
                    return (
                        <div className="book-card" key={book.id}>
                       
                            <Link 
                                to={`/book/${book.id}`} 
                                className="text-reset text-decoration-none"
                            >
                                <BookListItem book={book}/> 
                            </Link>
                        
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default BookList;