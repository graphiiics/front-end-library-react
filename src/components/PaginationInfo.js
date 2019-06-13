import React from 'react';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';


function PaginationInfo (props){
    console.log(props.currentBooks);
    
    return (
        <React.Fragment>
            <div className="col-12 justify-content-md-center">
                <BookList books={props.currentBooks} />
            </div>
            <div className="col-12 bottom-container">
                <div>
                    <div className="row d-flex flex-row py-5">
                        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                            <div className="d-flex flex-row align-items-center">

                                <h4 className={props.headerClass}>
                                <strong className="text-secondary">{props.totalBooks}</strong> Books
                                </h4>

                                { props.currentPage && (
                                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                    Page <span className="font-weight-bold">{ props.currentPage }</span> / <span className="font-weight-bold">{ props.totalPages }</span>
                                </span>
                                ) }

                            </div>

                            <div className="d-flex flex-row py-4 align-items-center">
                                <Pagination 
                                    totalRecords={props.totalBooks} 
                                    pageLimit={5} 
                                    pageNeighbours={1} 
                                    onPageChanged={props.onPageChanged} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PaginationInfo