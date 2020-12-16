import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shelfData from '../../helpers/data/shelfData';
import authData from '../../helpers/data/authData';
import BookCard from '../Cards/BookCard';
import Loader from '../Loader';
import bookData from '../../helpers/data/bookData';
import CardCarousel from '../Carousel';

class HomeComponent extends Component {
  state = {
    shelf: {},
    books: [],
    loading: true,
  }

  componentDidMount() {
    this.getShelfData();
    this.showRandomBooks();
  }

  showRandomBooks = () => {
    this.getRandomUnreadBooks()
      .then((response) => {
        const randomBooks = [];
        response.forEach((book) => {
          const randomBookIndex = Math.floor(Math.random() * Math.floor(response.length));
          if (!randomBooks.includes(book) && randomBooks.length < 3) { randomBooks.push(response[randomBookIndex]); }
        });

        this.setState({ books: randomBooks }, this.setLoading);
      });
  }

  getShelfData = () => {
    shelfData.getUnreadShelf(authData.getUid()).then((response) => {
      this.setState({ shelf: response });
    });
  }

  getRandomUnreadBooks = () => new Promise((resolve, reject) => {
    const currentUserId = authData.getUid();

    shelfData.getRandomUnread(currentUserId).then((response) => {
      const bookArray = [];
      response.forEach((book) => {
        bookArray.push(bookData.getSingleBook(book.bookId));
      });
      resolve(Promise.all([...bookArray]));
    }).catch((error) => reject(error));
  });

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
            this.showRandomBooks();
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
     const showHome = () => (
       books.map((book) => <BookCard key={book.fbKey} book={book} removeBook={this.removeBook} />)
     );
     return (
       <>
       { loading ? (
          <Loader />
       ) : (
      <div>
        {books.length !== 0
          ? <>
        <h1 className='text-container'>Looking for your Next Read?</h1>
        <div className='shelf-background-image mt-5'>
        <CardCarousel cards={showHome()} />
        </div>
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
