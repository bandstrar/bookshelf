import React, { Component } from 'react';
import authData from '../helpers/data/authData';
import bookData from '../helpers/data/bookData';
import shelfData from '../helpers/data/shelfData';
import CardCarousel from '../components/Carousel';
import Loader from '../components/Loader';
import BookCard from '../components/Cards/BookCard';
import AppModal from '../components/AppModal';
import SearchForm from '../components/Forms/SearchForm';

class Books extends Component {
    state = {
      text: '',
      books: [],
      loading: true,
    }

    componentDidMount() {
      this.showAllBooks();
    }

    showAllBooks = () => {
      this.getBooks()
        .then((resp) => (
          this.setState({ books: resp }, this.setLoading)
        ));
    }

    handleSubmit = (e) => {
      e.preventDefault();

      this.getSearchedBooks()
        .then((response) => {
          this.setState({ books: response, loading: true }, this.setLoading);
        });
    }

    handleAdvanced = (e, data) => {
      e.preventDefault();

      this.advancedSearch(data)
        .then((response) => {
          this.setState({ books: response, loading: true }, this.setLoading);
        });
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    getSearchedBooks = () => (
      bookData.getAllUserBooks(authData.getUid()).then((res) => {
        const searchedBookArray = [];
        res.forEach((item) => {
          searchedBookArray.push(bookData.searchBooks(this.state.text.toLowerCase(), item.bookId));
        });
        return Promise.all([...searchedBookArray]);
      })
    )

    advancedSearch = (data) => (
      bookData.getAllUserBooks(authData.getUid()).then((response) => {
        const searchedBookArray = [];
        response.forEach((item) => {
          searchedBookArray.push(bookData.advancedSearch(data, item.bookId));
        });
        return Promise.all([...searchedBookArray]);
      })
    )

     getBooks = () => (
       bookData.getAllUserBooks(authData.getUid()).then((response) => {
         const bookArray = [];
         response.forEach((userBook) => {
           bookArray.push(bookData.getSingleBook(userBook.bookId));
         });
         return Promise.all([...bookArray]);
       })
     )

     getRandomBook = () => (
       bookData.getAllUserBooks(authData.getUid()).then((response) => {
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
       const noNulls = this.state.books.filter((book) => book !== null);
       const removedBook = noNulls.filter((book) => book.fbKey !== e.target.id);

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
       bookData.getSingleUserBook(authData.getUid(), e.target.id)
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
       }, 500);
     }

     componentWillUnmount() {
       clearInterval(this.timer);
     }

     render() {
       const { books, loading, text } = this.state;
       const showBooks = () => (
         books.map((book) => book !== null && <BookCard key={book.fbKey} book={book} removeBook={this.removeBook} />)
       );
       return (
            <>
            { loading ? (
          <Loader />
            ) : (
            <>
                <div className="d-flex flex-wrap text-container">
                <div className="align-items-center header-buttons">
                <button className='btn btn-dark m-2 bookshelves-buttons' onClick={this.getRandomBook}>Random</button>
                <button className='btn btn-secondary m-2 bookshelves-buttons' onClick={this.showAllBooks}>Show All</button>
                </div>
                <h2 className="header-h2">My Books</h2>
                <div className='d-flex flex-wrap align-items-center'>
                <form onSubmit={this.handleSubmit}>
                <input className='collection-search-form' type='text' name='text' value={text} onChange={this.handleChange}
                placeholder='Search Collection by Title, Author, or Tag' />
                </form>
                <div className='advanced-search-button'>
                <AppModal modalTitle={'Advanced Search'} buttonLabel={'Advanced Search'}>
                  <SearchForm handleAdvanced={this.handleAdvanced}/>
                </AppModal>
                </div>
                </div>
                </div>
                <div className='shelf-background-image mt-5'>
                {books.length !== 0 && <CardCarousel cards={showBooks()} />}
                </div>
            </>
            )}
       </>
       );
     }
}

export default Books;
