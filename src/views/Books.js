import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getUid from '../helpers/data/authData';
import bookData from '../helpers/data/bookData';
import shelfData from '../helpers/data/shelfData';
import BookCard from '../components/Cards/BookCard';
import Loader from '../components/Loader';

class Books extends Component {
    state = {
      books: [],
      loading: true,
    }

    componentDidMount() {
      this.getBooks()
        .then((resp) => (
          this.setState({ books: resp }, this.setLoading)
        ));
    }

     getBooks = () => (
       bookData.getAllUserBooks(getUid.getUid()).then((response) => {
         const bookArray = [];
         response.forEach((userBook) => {
           bookArray.push(bookData.getSingleBook(userBook.bookId));
         });
         return Promise.all([...bookArray]);
       })
     )

     getRandomBook = () => (
       bookData.getAllUserBooks(getUid.getUid()).then((response) => {
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
       bookData.getAllShelfBooks()
         .then((response) => {
           const booksToDelete = response.filter((book) => book.bookId === e.target.id);
           booksToDelete.forEach((book) => {
             shelfData.deleteShelfBooks(book.firebaseKey);
           });
         });
       bookData.getSingleUserBook(getUid.getUid(), e.target.id)
         .then((response) => {
           bookData.deleteUserBook(response.firebaseKey)
             .then(() => {
               this.getBooks();
             });
         });
     }

     setLoading = () => {
       this.timer = setInterval(() => {
         this.setState({ loading: false });
       }, 1000);
     }

     componentWillUnmount() {
       clearInterval(this.timer);
     }

     render() {
       const { books, loading } = this.state;
       const showBooks = () => (
         books.map((book) => <BookCard key={book.fbKey} book={book} removeBook={this.removeBook} />)
       );
       return (
            <>
            { loading ? (
          <Loader />
            ) : (
            <>
                <h2>My Books</h2>
                <div className="d-flex flex-wrap justify-content-between">
                <button className='btn btn-dark' onClick={this.getRandomBook}>Random</button>
                <Link className='btn btn-info' to={'/collection-search'}>Find a Book</Link>
                </div>
                {books.length !== 0 && <div className='d-flex flex-wrap justify-content-between container'>{showBooks()}</div>}
            </>
            )}
       </>
       );
     }
}

export default Books;
