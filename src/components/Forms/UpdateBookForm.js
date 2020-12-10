import React, { Component } from 'react';
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
    tags: this.props.book?.tags || '',
  }

  componentDidMount() {
    const userId = authData.getUid();
    this.setState({
      userId,
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
       this.props.onUpdate(this.props.userBook.bookId);
     }).then(() => {
       if (this.state.shelfId !== '') {
         bookData.getShelfBooks(this.state.shelfId)
           .then((response) => {
             if (response !== []) {
               const preventDupes = response.filter((name) => name.bookId === this.state.bookId);
               preventDupes === []
          && bookData.createShelfBook({ bookId: this.state.bookId, userId: this.state.userId, shelfId: this.state.shelfId });
             }
           });
       }
     });
   }

   render() {
     return (
              <form onSubmit={this.handleSubmit}>
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
                <select
                name='rating'
                className='form-control user-rating'
                onChange={this.handleChange}
                >
                  <option value=''>Your Rating</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <ShelfSelect onChange={this.handleChange}/>
                <button>Submit</button>
          </form>
     );
   }
}

export default UpdateBookForm;
