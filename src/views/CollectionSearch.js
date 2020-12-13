import React, { Component } from 'react';
import bookData from '../helpers/data/bookData';
import authData from '../helpers/data/authData';
import BookCard from '../components/Cards/BookCard';

class CollectionSearch extends Component {
  state = {
    text: '',
    books: [],
    loading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.getSearchedBooks()
      .then((response) => {
        this.setState({ books: response });
      });
  }

  getSearchedBooks = () => (
    bookData.getAllUserBooks(authData.getUid()).then((res) => {
      const searchedBookArray = [];
      res.forEach((item) => {
        searchedBookArray.push(bookData.searchBooks(this.state.text, item.bookId));
      });
      return Promise.all([...searchedBookArray]);
    })
  )

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { books, text } = this.state;
    const showBooks = () => (
      books.map((book) => book.fbKey !== undefined && <BookCard key={book.fbKey} book={book} />)
    );
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='text' value={text} onChange={this.handleChange}
        placeholder='Enter a Title, Author, or Tag' />
        {books !== [] && <div className='d-flex flex-wrap container'>{showBooks()}</div>}
      </form>
    );
  }
}

export default CollectionSearch;
