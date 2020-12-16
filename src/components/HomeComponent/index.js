import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shelfData from '../../helpers/data/shelfData';
import authData from '../../helpers/data/authData';
import BookCard from '../Cards/BookCard';
import Loader from '../Loader';
import bookData from '../../helpers/data/bookData';

class HomeComponent extends Component {
  state = {
    books: [],
    loading: true,
  }

  componentDidMount() {
    this.getRandomUnreadBooks()
      .then((response) => {
        this.setState({ books: response }, this.setLoading);
      });
  }

  getRandomUnreadBooks = () => {
    shelfData.getUnreadShelf(authData.getUid()).then((response) => {
      const bookArray = [];
      response.forEach((book) => {
        bookArray.push(bookData.getSingleBook(book.bookId));
      });
      return Promise.all([...bookArray]);
    });
  };

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
     const showHome = () => (
       books.map((book) => <BookCard key={book.fbKey} book={book} />)
     );
     return (
       <>
       { loading ? (
          <Loader />
       ) : (
      <div>
        {showHome().length !== 0
          ? <>
        <h1 className='text-container'>Looking for your Next Read?</h1>
        <div className='d-flex flex-wrap justify-content-center container'>{showHome()}</div>
        </>
          : <>
          <h1 className='text-container'>Start Adding Books to Your Shelves!</h1>
          <div className='d-flex flex-wrap justify-content-center container'>
          <Link className='btn btn-secondary m-2 bookshelves-buttons' to={'/search'}>
            Search for a Book
            </Link>
        </div>
        </>

        }
      </div>
       )}
      </>
     );
   }
}

export default HomeComponent;
