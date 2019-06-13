import React from 'react';
import './styles/BookNew.css';
import Book from '../components/Book';
import BookForm from '../components/BookForm';
import axios from 'axios';

class BookEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form : {},
            categories: [],
            suggestions: [],
            categoryText: ''
        }
        this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this);
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
                        status: book.status,
                        category_id: book.category.id
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
        

        axios.put(`/api/book/${this.props.match.params.bookId}`, this.state.form )
            .then( res => {
                console.log(res.data);
                this.props.history.push('/books');
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }

    handleChangeTextChanged = e => {
        console.log('that me bitch hangle change text');
        
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.categories.sort().filter(category => regex.test(category.name));
        } 
        this.setState({ 
            suggestions,
            categoryText: value,
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleSuggestionSelected(category){
        //console.log(category.name);
        
        this.setState({
            categoryText: category.name,
            suggestions: [],
            form: {
                ...this.state.form,
                category: category.name,
                category_id: category.id
            } 
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
                                onChangeTextChanged={this.handleChangeTextChanged}
                                suggestions={this.state.suggestions} 
                                categoryText={this.state.form.category}
                                suggestionSelected={this.handleSuggestionSelected}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BookEdit;