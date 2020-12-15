import React, { Component } from 'react';
import getUid from '../helpers/data/authData';
import bookData from '../helpers/data/bookData';
import shelfData from '../helpers/data/shelfData';
import CardCarousel from '../components/Carousel';
import Loader from '../components/Loader';
import BookCard from '../components/Cards/BookCard';

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

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    getSearchedBooks = () => (
      bookData.getAllUserBooks(getUid.getUid()).then((res) => {
        const searchedBookArray = [];
        res.forEach((item) => {
          searchedBookArray.push(bookData.searchBooks(this.state.text, item.bookId));
        });
        return Promise.all([...searchedBookArray]);
      })
    )

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
                <h2 className='text-container'>My Books</h2>
                <div className="d-flex flex-wrap justify-content-between">
                <button className='btn btn-dark m-2 bookshelves-buttons' onClick={this.getRandomBook}>Random</button>
                <button className='btn btn-secondary m-2 bookshelves-buttons' onClick={this.showAllBooks}>Show All</button>
                <form onSubmit={this.handleSubmit}>
                <input className='collection-search-form m-2' type='text' name='text' value={text} onChange={this.handleChange}
                placeholder='Enter a Title, Author, or Tag' />
                </form>
                </div>
                <div className='shelf-background-image'>
                {books.length !== 0 && <CardCarousel cards={showBooks()} />}
                </div>
            </>
            )}
       </>
       );
     }
}

export default Books;
