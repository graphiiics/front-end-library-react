import React from 'react';
import './styles/BookNew.css';
import Book from '../components/Book';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteBookModal from '../components/DeleteBookModal';
import ChangeStatusModal from '../components/ChangeStatusModal';

class BookDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: {},
            modalIsOpen: false,
            modalStatusIsOpen: false,
            users: [],
            suggestions: [],
            userText: ''
        }
        this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this);
    }

    componentDidMount(){
        console.log('por alguna razon entro aqui');
        
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
                        status: book.status,
                        user: book.user ? book.user.name : undefined,
                        user_id: book.user_id
                    } 
                });
            })
            .catch( err => {
                console.log(err); 
            })

            axios.get('/api/user')
            .then( res => {
                const users = res.data;
                console.log('users:', users);
                this.setState({ users })
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

    // Methods from change status modal
    
     handleOpenModalStatus = e =>{
        this.setState({ modalStatusIsOpen: true}) 
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
                        status: book.status,
                        user: book.user ? book.user.name : undefined,
                        user_id: book.user_id ? book.user_id : null
                    } 
                });
            })
            .catch( err => {
                console.log(err); 
            })
     }
 
     handleCloseModalStatus = e =>{
         console.log('im going to close this fucking modal FROM STATUS');
         this.setState({ modalStatusIsOpen: false }) 
         console.log(this.state);
         
      }
     
      handleChangeTextChanged = e => {
        console.log('that me bitch hangle change text');
        
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.users.sort().filter(user => regex.test(user.name));
        } 
        this.setState({ 
            suggestions,
            book: {
                ...this.state.book,
                user: value
            }
        })
    }


    handleSuggestionSelected(user){
        console.log('user:' ,user);
        
        this.setState({
            suggestions: [],
            book: {
                ...this.state.book,
                user: user.name,
                user_id: user.id
            }
        })
    }

    handleStatus = e => {

        const statusValue = e.target.checked;
        console.log('status:', statusValue);
        
        this.setState({
            book: {
                ...this.state.book,
                status: statusValue
            } 
        })
    }
    
    handleSubmit = e => {
        e.preventDefault();
        console.log('antes de hacer mis mmdas', this.state.book);
        console.log('!status--->', !this.state.book.status);
        
        if(!this.state.book.status){
            console.log('a huevo entre');
            
            this.setState({
                book: {
                    ...this.state.book,
                    name: 'something nnew',
                    user_id: null,
                    user: undefined
                } 
            }) 
        }
        this.setState({
            book: {
                ...this.state.book,
                name: 'something',
                user_id: null,
                user: undefined
            } 
        }) 
        console.log('despues de hacer mis mmdas', this.state.book);
        let book = this.state.book;
        console.log('book->',book);
        
        setTimeout(() => {
            axios.put(`/api/book/${this.props.match.params.bookId}`, book )
                .then( res => {
                    console.log('already update btw', res.data);
                    this.setState({ modalStatusIsOpen: false }); 
                })
                .catch(function (error) {
                    console.log(error);
                });

        }, 5000)
        
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
                            <button onClick={this.handleOpenModalStatus} className="btn btn-warning btn-lg btn-block">Change status</button>
                            <button onClick={this.handleOpenModal} className="btn btn-danger btn-lg btn-block">Delete</button>
                            <ChangeStatusModal 
                                isOpen={this.state.modalStatusIsOpen} 
                                onCloseModal={this.handleCloseModalStatus}
                                onOpenModal={this.handleOpenModalStatus}
                                onDeleteBook={this.handleDeleteBook}
                                onChangeTextChanged={this.handleChangeTextChanged}
                                userText={this.state.userText}
                                suggestions={this.state.suggestions}
                                suggestionSelected={this.handleSuggestionSelected}
                                book={this.state.book}
                                onChangeStatus={this.handleStatus}
                                onSubmit={this.handleSubmit}
                            />
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