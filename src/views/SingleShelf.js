import React, { Component } from 'react';
import bookData from '../helpers/data/bookData';
import shelfData from '../helpers/data/shelfData';
import BookCard from '../components/Cards/BookCard';

class SingleShelf extends Component {
  state = {
    shelf: {},
    books: [],
  }

  componentDidMount() {
    const shelfId = this.props.match.params.id;
    this.getShelfInfo(shelfId);
    this.getBooks(shelfId)
      .then((response) => (
        this.setState({ books: response })
      ));
  }

   getShelfInfo = (shelfId) => {
     shelfData.getSingleShelf(shelfId).then((response) => {
       this.setState({
         shelf: response,
       });
     });
   }

   getBooks = (shelfId) => (
     bookData.getShelfBooks(shelfId).then((response) => {
       const bookArray = [];
       response.forEach((book) => {
         bookArray.push(bookData.getSingleBook(book.bookId));
       });
       return Promise.all([...bookArray]);
     })
   )

   render() {
     const { shelf, books } = this.state;
     const showBooks = () => (
       books.map((book) => (
        <BookCard key={book.fbKey} book={book} />
       ))
     );

     return (
      <div>
      <h1>{shelf.name}</h1>
      <div className='d-flex flex-wrap container'>
        {showBooks()}
      </div>
      </div>
     );
   }
}

export default SingleShelf;
