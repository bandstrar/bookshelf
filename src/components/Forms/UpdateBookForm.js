import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import authData from '../../helpers/data/authData';
import bookData from '../../helpers/data/bookData';
import ShelfSelect from '../ShelfSelect';

class UpdateBookForm extends Component {
  state = {
    firebaseKey: this.props.userBook?.firebaseKey || '',
    rating: Number(this.props.userBook?.rating) || 0,
    notes: this.props.userBook?.notes || '',
    shelfId: this.props.userBook?.shelfId || '',
    userId: this.props.userBook?.userId || '',
    bookId: this.props.userBook?.bookId || '',
    tags: '',
  }

  componentDidMount() {
    const userId = authData.getUid();
    this.setState({
      userId,
    });
  }

  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
  }

  updateBookInfo = (bookId) => {
    const userId = authData.getUid();
    bookData.getSingleBook(bookId).then((response) => {
      if (response.avgRating === undefined && this.state.tags === '') {
        const avgRatingArray = [{ userId, rating: this.state.rating }];

        bookData.updateBook({ fbKey: this.state.bookId, avgRating: avgRatingArray })
          .then(() => {
            this.props.onUpdate(this.props.userBook.userId, this.props.userBook.bookId);
          });
      } else if (response.avgRating === undefined) {
        const avgRatingArray = [{ userId, rating: this.state.rating }];
        const tagArray = response.tags;
        tagArray.push(this.state.tags.toLowerCase());

        bookData.updateBook({ fbKey: this.state.bookId, avgRating: avgRatingArray, tags: tagArray })
          .then(() => {
            this.props.onUpdate(this.props.userBook.userId, this.props.userBook.bookId);
          });
      } else if (this.state.tags === '') {
        const avgRatingArray = response.avgRating;

        const checkUserRating = avgRatingArray.filter((name) => name.userId === userId);
        if (checkUserRating.length === 0) {
          avgRatingArray.push({ userId, rating: this.state.rating });
        } else {
          const userIndex = avgRatingArray.findIndex((rating) => rating.userId === checkUserRating[0].userId);
          avgRatingArray.splice(userIndex, 1, { userId, rating: this.state.rating });
        }
        bookData.updateBook({ fbKey: this.state.bookId, avgRating: avgRatingArray })
          .then(() => {
            this.props.onUpdate(this.props.userBook.userId, this.props.userBook.bookId);
          });
      } else {
        const avgRatingArray = response.avgRating;
        const tagArray = response.tags;

        const checkUserRating = avgRatingArray.filter((name) => name.userId === userId);
        if (checkUserRating.length === 0) {
          avgRatingArray.push({ userId, rating: this.state.rating });
        } else {
          const userIndex = avgRatingArray.findIndex((rating) => rating.userId === checkUserRating[0].userId);
          avgRatingArray.splice(userIndex, 1, { userId, rating: this.state.rating });
        }
        tagArray.push(this.state.tags.toLowerCase());
        bookData.updateBook({ fbKey: this.state.bookId, avgRating: avgRatingArray, tags: tagArray })
          .then(() => {
            this.props.onUpdate(this.props.userBook.userId, this.props.userBook.bookId);
          });
      }
    });
  }

   handleChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value,
     });
   }

   handleSubmit = (e) => {
     e.preventDefault();

     bookData.updateUserBook({
       firebaseKey: this.state.firebaseKey,
       rating: this.state.rating,
       notes: this.state.notes,
       shelfId: this.state.shelfId,
       userId: this.state.userId,
       bookId: this.state.bookId,
     }).then(() => {
       this.updateBookInfo(this.state.bookId);
     }).then(() => {
       if (this.state.shelfId !== '') {
         bookData.getShelfBooks(this.state.shelfId)
           .then((response) => {
             const preventDupes = response.filter((name) => name.bookId === this.state.bookId);
             if (preventDupes.length === 0) {
               bookData.createShelfBook({ bookId: this.state.bookId, userId: this.state.userId, shelfId: this.state.shelfId });
             }
           });
       }
     });
     this.props.toggle();
   }

   render() {
     return (
              <form>
              <input
                type='text'
                name='tags'
                value={this.state.tags}
                onChange={this.handleChange}
                placeholder='Add a Tag'
                className='form-control form-control-lg m-1'
                />
              <input
                type='text'
                name='notes'
                value={this.state.notes}
                onChange={this.handleChange}
                placeholder='Notes or Review'
                className='form-control form-control-lg m-1'
                />
                <Ratings
                          rating={this.state.rating}
                          widgetRatedColors="yellow"
                          changeRating={this.changeRating}
                          widgetDimensions="40px"
                          widgetSpacings="15px"
                          >
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            </Ratings>
                <ShelfSelect onChange={this.handleChange}/>
                <button className='btn btn-dark bookshelves-buttons' onClick={this.handleSubmit}>Submit</button>
          </form>
     );
   }
}

export default UpdateBookForm;
