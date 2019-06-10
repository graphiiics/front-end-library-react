import React from 'react';
import './styles/BookNew.css';
import Book from '../components/Book';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteBookModal from '../components/DeleteBookModal';

class BookDetails extends React.Component{
    state = {
        book: {},
        modalIsOpen: false
    }

    componentDidMount(){
        axios.get(`/api/book/${this.props.match.params.bookId}`)
            .then(res => {
                const book = res.data;
                console.log(book);
                this.setState({ 
                    book: {
                        id: book.id,
                        name: book.name,
                        author: book.author,
                        published_date: book.published_date,
                        category: book.category.name,
                        status: book.status ? 'Borrowed' : 'Available'
                    } 
                });
            })
            .catch( err => {
                console.log(err); 
            })
    }

    handleOpenModal = e =>{
       this.setState({ modalIsOpen: true}) 
    }

    handleCloseModal = e =>{
        console.log('im going to close this fucking modal');
        this.setState({ modalIsOpen: false }) 
        console.log(this.state);
        
     }

    handleDeleteBook = e => {
        console.log('fuck kill bitch');
        
        axios.delete(`/api/book/${this.props.match.params.bookId}`)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/books');
                
            })
            .catch(err => {
                console.log(err);
                
            })

    }

    render(){
        return(
            <React.Fragment>
                {/* <Header /> */}
                <div className="container" id='book__new'>
                    <div className="row">
                        <div className="col-6">
                            <Book 
                                book={this.state.book}
                            />
                        </div>
                        <div className="col-6">
                            <h3>Actions</h3>
                            <Link to={`/book/${this.state.book.id}/edit`}  className="btn btn-info btn-lg btn-block">Edit</Link>
                            <Link to='/' className="btn btn-warning btn-lg btn-block">Change status</Link>
                            <button onClick={this.handleOpenModal} className="btn btn-danger btn-lg btn-block">Delete</button>
                            <DeleteBookModal 
                                isOpen={this.state.modalIsOpen} 
                                onCloseModal={this.handleCloseModal}
                                onOpenModal={this.handleOpenModal}
                                onDeleteBook={this.handleDeleteBook}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BookDetails;