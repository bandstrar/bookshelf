import React, { Component } from 'react';
import bookData from '../helpers/data/bookData';
import BookCard from '../components/Cards/BookCard';
import Loader from '../components/Loader';

class CollectionSearch extends Component {
  state = {
    text: '',
    books: [],
    loading: false,
  }

  getSearchedBooks = () => {
    bookData.getAllBooks().then((response) => {
      const searchedBookArray = [];
      response.forEach((book) => {
        if (book.tags !== undefined) {
          if (book.author.toLowerCase().includes(this.state.text.toLowerCase())
          || book.name.toLowerCase().includes(this.state.text.toLowerCase()) || book.tags.includes(this.state.text)) {
            bookData.getSingleBook(book.fbKey).then((res) => {
              searchedBookArray.push(res);
            });
          }
        }
      });
      console.warn(searchedBookArray);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.getSearchedBooks()
      .then((response) => {
        this.setState({ books: response }, this.setLoading);
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  setLoading = () => {
    this.timer = setTimeout(() => {
      this.setState({ loading: true });
    }, 1000);
  }

  render() {
    const { books, text, loading } = this.state;
    const showBooks = () => {
      books.map((book) => <BookCard key={book.id} book={book} />);
    };
    return (
      <>
      { loading ? (
    <Loader />
      ) : (
      <>
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='text' value={text} onChange={this.handleChange}
        placeholder='Enter a Title, Author, or Tag' />
        {books !== [] && <div className='d-flex flex-wrap container'>{showBooks()}</div>}
      </form>
      </>
      )}
      </>
    );
  }
}

export default CollectionSearch;
