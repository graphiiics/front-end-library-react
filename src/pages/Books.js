import React from 'react';
import { Link } from 'react-router-dom';
import BookList from '../components/BookList';
import axios from 'axios';
import './styles/Books.css';
import Pagination from '../components/Pagination';

class Books extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: null,
            allBooks: [], 
            currentBooks: [], 
            currentPage: null, 
            totalPages: null
          };
    }

    componentDidMount(){
        axios.get('/api/book')
        .then(res => {
            const books = res.data;
            console.log(books);
            
            this.setState({ 
                loading: false,
                allBooks: books
             })
        })
    }

    onPageChanged = data => {
        console.log('data:', data);
        
        const { allBooks } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentBooks = allBooks.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentBooks, totalPages });
      }
    
      filterBooks = e => {
        const { currentBooks } = this.state;
        const result = currentBooks.filter(book => {
            return `${book.name} ${book.author}`
              .toLowerCase()
              .includes(e.target.value)
          })
          this.setState({ currentBooks: result });
        
    }


    render(){
        if(this.state.loading) {
            return 'loading...'
        }

        const { allBooks, currentBooks, currentPage, totalPages } = this.state;
        const totalBooks = allBooks.length;

        if (totalBooks === 0) return null;

        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

        return(
            <React.Fragment>
                {/* <Header /> */}
                <div className="container">
                    <div className="row top-container">
                        <div className="col-12 text-right">
                            <Link to='/book/new' className='btn btn-primary'>New book</Link>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Filter</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={this.filterBooks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <BookList books={currentBooks} />
                    </div>
                    <div className="row bottom-container">
                        <div className="col">
                            <div className="row d-flex flex-row py-5">
                                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                <div className="d-flex flex-row align-items-center">

                                    <h4 className={headerClass}>
                                    <strong className="text-secondary">{totalBooks}</strong> Books
                                    </h4>

                                    { currentPage && (
                                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                        Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                                    </span>
                                    ) }

                                </div>

                                <div className="d-flex flex-row py-4 align-items-center">
                                    <Pagination 
                                        totalRecords={totalBooks} 
                                        pageLimit={5} 
                                        pageNeighbours={1} 
                                        onPageChanged={this.onPageChanged} />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Books;

