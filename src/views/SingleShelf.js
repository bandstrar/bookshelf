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

   getRandomBook = (shelfId) => (
     bookData.getShelfBooks(shelfId).then((response) => {
       const randomBook = Math.floor(Math.random() * Math.floor(response.length));
       bookData.getSingleBook(response[randomBook].bookId)
         .then((resp) => {
           this.setState({
             books: [resp],
           });
         });
     })
   )

   removeBook = (e) => {
     const removedBook = this.state.books.filter((book) => book.fbKey !== e.target.id);

     this.setState({
       books: removedBook,
     });
     bookData.getShelfBooks(this.state.shelf.firebaseKey)
       .then((response) => {
         const bookToDelete = response.filter((book) => book.bookId === e.target.id);
         shelfData.deleteShelfBooks(bookToDelete[0].firebaseKey)
           .then(() => {
             this.getBooks();
           });
       });
   }

   render() {
     const { shelf, books } = this.state;
     const showBooks = () => (
       books.map((book) => (
        <BookCard key={book.fbKey} book={book} removeBook={this.removeBook} />
       ))
     );

     return (
      <div>
      <h1>{shelf.name}</h1>
      <button onClick={() => this.getRandomBook(shelf.firebaseKey)}>Random</button>
      <div className='d-flex flex-wrap container'>
        {showBooks()}
      </div>
      </div>
     );
   }
}

export default SingleShelf;
