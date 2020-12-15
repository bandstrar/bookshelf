import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
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
      <div className='single-book-view shelf-background-image'>
        <div className='d-flex column-wrap justify-content-between single-book-container'>
        <img className='book-detail-image book-container' src={book.image} alt={book.name} />
        <div className='w-50 book-details-info'>
        <p className='book-details-name'>{book.name}</p>
        <p className='book-details-author'>{book.author}</p>
        <p className='book-details-date'>Publication Date: {book.date}</p>
        <p className='book-details-rating'>Your Rating: <StarRatings
        rating={userBook.rating}
        numberOfStars={5}
        starRatedColor='yellow'
        name='rating'
        starDimension="25px"
        starSpacing="5px" /></p>
        <div className='book-details-avg-rating'>Average Rating: {book.avgRating !== undefined
        && (Object.values(book.avgRating.map((rating) => rating.rating !== 0 && Number(rating.rating)))).reduce((a, b) => a + b, 0) / book.avgRating.length}</div>
        <p className='book-details-pages'>{book.pages} Pages</p>
        <p className='book-details-tags'>Tags: {book.tags.join(', ')}</p>
        <p className='book-details-notes'>Notes: {userBook.notes}</p>
        </div>
        </div>
      </div>
      </>
      )
     }
   </>
     );
   }
}

export default BookDetails;
