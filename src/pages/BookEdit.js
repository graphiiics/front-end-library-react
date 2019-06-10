import React from 'react';
import './styles/BookNew.css';
import Book from '../components/Book';
import BookForm from '../components/BookForm';
import axios from 'axios';

class BookEdit extends React.Component{
    state = {
        form : {},
        categories: []
    }

    componentDidMount(){
        axios.get('/api/category')
            .then( res => {
                const categories = res.data;
                //console.log(categories);
                this.setState({ categories })
            })
        
        axios.get(`/api/book/${this.props.match.params.bookId}`)
            .then(res => {
                const book = res.data;
                console.log(book);
                this.setState({ 
                    form: {
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

    handleChange = e => {        
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const book = {
            name: this.state.form.name,
            author: this.state.form.author,
            published_date: this.state.form.published_date,
            category_id: this.state.form.category
        }
        console.log('this is the book', book);

        axios.put(`/api/book/${this.props.match.params.bookId}`, book )
            .then( res => {
                console.log(res.data);
                this.props.history.push('/books');
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    render(){
        return(
            <React.Fragment>
                {/* <Header /> */}
                <div className="container" id='book__new'>
                    <div className="row">
                        <div className="col-6">
                            <Book 
                                book={this.state.form}
                                categories={this.state.categories}
                            />
                        </div>
                        <div className="col-6">
                            <h1>Edit Book</h1>
                            <BookForm 
                                onChange={this.handleChange} 
                                formValues={this.state.form}
                                categories={this.state.categories}  
                                onSubmit={this.handleSubmit}  
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BookEdit;