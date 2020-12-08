import React, { Component } from 'react';
import getUid from '../helpers/data/authData';
import bookData from '../helpers/data/bookData';
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
         books.map((book) => <BookCard key={book.fbKey} book={book} />)
       );
       return (
            <>
            { loading ? (
          <Loader />
            ) : (
            <>
                <h2>My Books</h2>
                <div className='d-flex flex-wrap justify-content-between container'>{showBooks()}</div>
            </>
            )}
       </>
       );
     }
}

export default Books;
