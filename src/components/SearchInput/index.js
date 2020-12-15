import React, { Component } from 'react';
import bookData from '../../helpers/data/bookData';
import SearchedBookCard from '../Cards/SearchedBookCard';
import authData from '../../helpers/data/authData';

class SearchInput extends Component {
  state = {
    text: '',
    books: [],
  }

   handleSubmit = (e) => {
     e.preventDefault();
     bookData.getSearchedBooks(this.state.text).then((response) => {
       this.setState({
         books: response,
       });
     });
   }

   addNewBook = (e) => {
     const thisBook = Object.values(this.state.books.filter((book) => book.id === e.target.id));
     const userId = authData.getUid();
     const bookInfo = {
       author: thisBook[0].volumeInfo.authors.join(', '),
       date: thisBook[0].volumeInfo.publishedDate,
       id: thisBook[0].id,
       image: thisBook[0].volumeInfo.imageLinks.thumbnail,
       name: thisBook[0].volumeInfo.title,
       pages: thisBook[0].volumeInfo.pageCount,
       tags: [thisBook[0].volumeInfo.categories[0].toLowerCase()],
     };
     bookData.getAllBooks()
       .then((response) => {
         const doesBookExist = response.filter((book) => book.id === thisBook[0].id);
         if (doesBookExist.length === 0) {
           bookData.addBook(bookInfo)
             .then((resp) => {
               bookData.addUserBook(resp.data.name, userId);
             });
         } else {
           bookData.getAllUserBooks(userId)
             .then((res) => {
               const preventDupes = res.filter((book) => book.bookId === doesBookExist[0].fbKey);
               preventDupes.length === 0 && bookData.addUserBook(doesBookExist[0].fbKey, userId);
             });
         }
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
     const { books, text } = this.state;
     const showBooks = () => (
       books.map((book) => book.volumeInfo.imageLinks !== undefined && <SearchedBookCard key={book.id} book={book} addNewBook={this.addNewBook} />)
     );
     return (
       <div>
      <form onSubmit={this.handleSubmit}>
        <div className='d-flex row-wrap'>
        <h4 className='m-3'>Search for a New Book:</h4>
        <input className='m-3' type='text' name='text' value={text} onChange={this.handleChange} placeholder='Enter a Title or Author' />
        </div>
      </form>
        {books.length !== 0 && <div className='d-flex flex-column justify-content-center container bg-white'>{showBooks()}</div>}
        </div>
     );
   }
}

export default SearchInput;
