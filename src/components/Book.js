import React from 'react';
import './styles/Book.css';
class Book extends React.Component{
    render(){
        return(
    
            <div class="container">
                <div class="book">
                    <div class="front">
                        <div class="cover">
                            <p class="name">{this.props.book.name}</p>    
                            <p class="author">{this.props.book.author}</p>
                            <p class="published">{this.props.book.published_date}</p>
                            <p class="category">{this.props.book.category}</p>
                            <div class="borrow-label">
                                <p class="status">{this.props.book.status ? 'Borrowed' : 'Available' }</p>
                                {this.props.book.status &&
                                    <p class="user">{this.props.book.user}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="left-side">
                        <h2>
                            <span>{this.props.book.author}</span>
                            <span>{this.props.book.name}</span>
                        </h2>
                    </div>
                </div>
        </div>
        )
    }
}

export default Book;