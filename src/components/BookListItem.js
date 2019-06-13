import React from 'react';

class BookListItem extends React.Component{
    render(){
        return(
        <figure class="card card--water">
            <figcaption class="card__caption">
            <h1 class="card__name">{this.props.book.name}</h1>
        
            <h3 class="card__type">
                Available
            </h3>
        
            <table class="card__stats">
                <tbody>
                <tr>
                <th>Author</th>
                <td>{this.props.book.author}</td>
                </tr>
                <tr>
                <th>Published:</th>
                <td>{this.props.book.published_date}</td>
                </tr>
                
                <tr>
                <th>Category:</th>
                <td>{this.props.book.name}</td>
                </tr>
        
            </tbody>
            </table>
    
            </figcaption>
     </figure>
        )
    }
}

export default BookListItem;