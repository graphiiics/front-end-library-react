import React from 'react';
import { Link } from 'react-router-dom';
import BookList from '../components/BookList';
import axios from 'axios';
import './styles/Books.css';
import PaginationInfo from '../components/PaginationInfo';
//import { MDBDataTable } from 'mdbreact';

class Books extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: null,
            allBooks: [], 
            currentBooks: [],
            filterBooks: [], 
            currentPage: null, 
            totalPages: null,
            activeFilter: false
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

    handlePageChanged = data => {
        console.log('data:', data);
        
        const { allBooks } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentBooks = allBooks.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentBooks, totalPages });
      }
    
      handlefilterBooks = e => {
        const { allBooks } = this.state;
        // let saveCurrentBooks = [...currentBooks];
        // console.log('copy: ', saveCurrentBooks);
        console.log('length-->', e.target.value.length);
        
        if(e.target.value.length > 0) {
            this.setState({ activeFilter: true });
        }else{
            console.log('jamas !!!!!!!!');
            
            this.setState({ activeFilter: false });
        }
        
        const result = allBooks.filter(book => {
            return `${book.name} ${book.author}`
              .toLowerCase()
              .includes(e.target.value)
          })
          this.setState({ filterBooks: result });
        
    }


    render(){
        const { activeFilter, filterBooks } = this.state; 

        if(this.state.loading) {
            return 'loading...'
        }

        return(
            <React.Fragment>
                {/* <Header /> */}
                <div className="container-fluid">
                    <div className="row top-container">
                        <div className="top-box">
                           <div className="col-12 text-right">
                                <Link to='/book/new' className='btn btn-warning' id="btn-new-book">New book</Link>
                            </div>
                            <div className="col-12">
                                <div className="form-group" id="filter-box">
                                    <label>Search:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        onChange={this.handlefilterBooks}
                                    />
                                </div>
                            </div> 
                        </div>
                        
                    </div>
                    <div className="row medium-container">
                       { activeFilter && 
                            <div className="justify-content-md-center">
                                <BookList books={filterBooks} />
                            </div>
                        }
                        { !activeFilter && 
                            <PaginationInfo 
                                currentBooks={this.state.currentBooks}
                                headerClass={['text-dark py-2 pr-4 m-0', this.state.currentPage ? 'border-gray border-right' : ''].join(' ').trim()}
                                totalBooks={this.state.allBooks.length}
                                currentPage={this.state.currentPage}
                                totalPages={this.state.totalPages}
                                onPageChanged={this.handlePageChanged}
                            />
                        } 
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Books;

