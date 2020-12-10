import React, { Component } from 'react';
import bookData from '../helpers/data/bookData';

class BookDetails extends Component {
  state = {
    book: {},
  }

  componentDidMount() {
    const bookId = this.props.match.params.id;

    this.getBook(bookId);
  }

   getBook = (bookId) => {
     bookData.getSingleBook(bookId).then((response) => {
       this.setState({
         book: response,
       });
     });
   }

   render() {
     const { book } = this.state;
     return (
      <div className='single-book-view'>
        <img className='book-detail-image' src={book.image} alt={book.name} />
        <p className='book-details-name'>{book.name}</p>
        <p className='book-details-author'>{book.author}</p>
        <p className='book-details-date'>{book.date}</p>
        <p className='book-details-pages'>{book.pages} Pages</p>
      </div>
     );
   }
}

export default BookDetails;
