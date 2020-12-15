import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Button } from 'reactstrap';
import authData from '../../helpers/data/authData';
import shelfData from '../../helpers/data/shelfData';

class ShelfForm extends Component {
  state = {
    firebaseKey: this.props.shelf?.firebaseKey || '',
    name: this.props.shelf?.name || '',
    image: this.props.shelf?.image || '',
    userId: this.props.shelf?.userId || '',
  }

  componentDidMount() {
    const userId = authData.getUid();
    this.setState({
      userId,
    });
  }

   handleChange = (e) => {
     if (e.target.name === 'filename') {
       this.setState({ image: '' });
       const storageRef = firebase.storage().ref();
       const imageRef = storageRef.child(`bookshelves/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);
       imageRef.put(e.target.files[0]).then((snapshot) => {
         snapshot.ref.getDownloadURL().then((image) => {
           this.setState({ image });
         });
       });
     } else {
       this.setState({
         [e.target.name]: e.target.value,
       });
     }
   }

   handleSubmit = (e) => {
     e.preventDefault();

     if (this.state.firebaseKey === '') {
       shelfData.createShelf(this.state)
         .then(() => {
           this.props.onUpdate();
         });
     } else {
       shelfData.updateShelf(this.state)
         .then(() => {
           this.props.onUpdate();
         });
     }
     this.props.toggle();
   }

   render() {
     return (<form>
      <input
        type='text'
        name='name'
        value={this.state.name}
        onChange={this.handleChange}
        placeholder='Shelf Name'
        className='form-control form-control-lg m-1'
        required
        />
      <input
        type='url'
        name='image'
        value={this.state.image}
        onChange={this.handleChange}
        placeholder='Enter an Image URL or Upload a File'
        className='form-control form-control-lg m-1'
        required
        />
      <input
        className='m-2'
        type='file'
        id='myFile'
        name='filename'
        accept='image/*'
        onChange={this.handleChange}
        />
    <Button className='bookshelves-buttons' onClick={this.handleSubmit}>Submit</Button>
    </form>

     );
   }
}

export default ShelfForm;
