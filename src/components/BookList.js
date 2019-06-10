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
            <ul className="row book-list">
                {this.props.books.map(book => {
                    return (
                        <li key={book.id} className="col-12">
                            <Link 
                                to={`/book/${book.id}`} 
                                className="text-reset text-decoration-none"
                            >
                                <BookListItem book={book}/> 
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default BookList;