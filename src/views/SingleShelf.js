import React, { Component } from 'react';
import bookData from '../helpers/data/bookData';
import shelfData from '../helpers/data/shelfData';
import CardCarousel from '../components/Carousel';
import Loader from '../components/Loader';
import BookCard from '../components/Cards/BookCard';

class SingleShelf extends Component {
  state = {
    text: '',
    shelf: {},
    books: [],
    loading: true,
  }

  componentDidMount() {
    const shelfId = this.props.match.params.id;
    this.getShelfInfo(shelfId);
    this.getBooks(shelfId)
      .then((response) => (
        this.setState({ books: response }, this.setLoading)
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

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 500);
  }

  getSearchedBooks = () => (
    bookData.getShelfBooks(this.state.shelf.firebaseKey).then((res) => {
      const searchedBookArray = [];
      res.forEach((item) => {
        searchedBookArray.push(bookData.searchBooks(this.state.text, item.bookId));
      });
      return Promise.all([...searchedBookArray]);
    })
  )

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
     const {
       shelf, books, text, loading,
     } = this.state;
     const showBooks = () => (
       books.map((book) => (
         book !== null && <BookCard key={book.fbKey} book={book} removeBook={this.removeBook} />
       ))
     );

     return (
      <>
      { loading ? (
    <Loader />
      ) : (
      <div>
      <h1>{shelf.name}</h1>
      <div className="d-flex flex-wrap justify-content-between">
      <button onClick={() => this.getRandomBook(shelf.firebaseKey)}>Random</button>
      <form onSubmit={this.handleSubmit}>
      <input type='text' name='text' value={text} onChange={this.handleChange}
      placeholder='Enter a Title, Author, or Tag' />
      </form>
      </div>
      <div className='carousel-background-image'>
      <CardCarousel cards={showBooks()} />
      </div>
      </div>
      )}
     </>
     );
   }
}

export default SingleShelf;
