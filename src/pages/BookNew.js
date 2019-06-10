import React from 'react';
import './styles/BookNew.css';
import Book from '../components/Book';
import BookForm from '../components/BookForm';
import axios from 'axios';

class BookNew extends React.Component{
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
        // const book = {
        //     name: this.state.form.name,
        //     author: this.state.form.author,
        //     published_date: this.state.form.published_date,
        //     category_id: this.state.form.category
        // }
        //console.log('this is the book', book);

        axios.post('/api/book', this.state.form )
            .then( res => {
                console.log(res.data);
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
                            <h1>New Book</h1>
                            <BookForm 
                                onChange={this.handleChange} 
                                formValues={this.state.form}
                                categories={this.state.categories}  
                                onSubmit={this.handleSubmit}
                                onChangeTextChanged={this.handleChangeTextChanged}
                                suggestions={this.state.suggestions} 
                                categoryText={this.state.categoryText}
                                suggestionSelected={this.handleSuggestionSelected}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BookNew;