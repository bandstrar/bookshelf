import React, { Component } from 'react';
import bookData from '../../helpers/data/bookData';
import SearchedBookCard from '../Cards/SearchedBookCard';
import Loader from '../Loader';

class SearchInput extends Component {
  state = {
    text: '',
    books: [],
    loading: false,
  }

   handleSubmit = (e) => {
     e.preventDefault();
     bookData.getSearchedBooks(this.state.text).then((response) => {
       this.setState({
         books: response,
         text: '',
       }, this.setLoading);
     });
   }

   setLoading = () => {
     this.setState({ loading: true });
     setTimeout(() => {
       this.setState({ loading: false });
     }, 500);
   }

   handleChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value,
     });
   }

   render() {
     const { books, text, loading } = this.state;
     const showBooks = () => (
       books.map((book) => book.volumeInfo.imageLinks !== undefined && <SearchedBookCard key={book.id} book={book} />)
     );
     return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='text' value={text} onChange={this.handleChange} placeholder='Enter a Title or Author' />
        { loading ? (
        <Loader />
        ) : (
          <>
        {books !== [] && <div className='d-flex flex-wrap container'>{showBooks()}</div>}
        </>
        )}
      </form>
     );
   }
}

export default SearchInput;
