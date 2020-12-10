import React, { Component } from 'react';
import bookData from '../helpers/data/bookData';
import authData from '../helpers/data/authData';
import Loader from '../components/Loader';
import UpdateBookForm from '../components/Forms/UpdateBookForm';
import AppModal from '../components/AppModal';

class BookDetails extends Component {
  state = {
    book: {},
    userBook: {},
    loading: true,
  }

  componentDidMount() {
    const bookId = this.props.match.params.id;
    const currentUserId = authData.getUid();

    this.getBook(currentUserId, bookId);
  }

   getBook = (userId, bookId) => {
     bookData.getSingleBook(bookId).then((response) => {
       bookData.getSingleUserBook(userId, bookId).then((res) => {
         this.setState({
           book: response,
           userBook: res,
         }, this.setLoading);
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
     const { book, userBook, loading } = this.state;
     return (
      <>
      { loading ? (
    <Loader />
      ) : (
      <>
      <AppModal modalTitle={'Update Your Book'} buttonLabel={'Update Your Book'}>
        {Object.keys(userBook).length && <UpdateBookForm book={book} userBook={userBook} onUpdate={this.getBook} />}
      </AppModal>
      <div className='single-book-view'>
        <img className='book-detail-image' src={book.image} alt={book.name} />
        <p className='book-details-name'>{book.name}</p>
        <p className='book-details-author'>{book.author}</p>
        <p className='book-details-date'>{book.date}</p>
        <p className='book-details-rating'>Your Rating: {userBook.rating}</p>
        <p className='book-details-avg-rating'>Average Rating: {(book.avgRating.reduce((a, b) => a + b, 0) / book.avgRating.length)}</p>
        <p className='book-details-pages'>{book.pages} Pages</p>
        <p className='book-details-tags'>Tags: {book.tags.join(', ')}</p>
        <p className='book-details-notes'>Notes: {userBook.notes}</p>
      </div>
      </>
      )
     }
   </>
     );
   }
}

export default BookDetails;
