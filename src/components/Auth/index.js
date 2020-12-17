import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import shelfData from '../../helpers/data/shelfData';

class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(() => {
        const userData = firebase.auth().currentUser;
        console.warn(userData);
        if (userData.metadata.creationTime === userData.metadata.lastSignInTime) {
          shelfData.createShelf({ name: 'Unread', userId: userData.uid, image: '' });
          shelfData.createShelf({ name: 'Favorites', userId: userData.uid, image: '' });
        }
      });
  }

  render() {
    return (
      <div className='Auth'>
        <h1 className='text-container'>Welcome to BookShelves!</h1>
        <button className='btn btn-secondary mt-2 bookshelves-buttons' onClick={this.loginClickEvent}>
          Log In
        </button>
      </div>
    );
  }
}

export default Auth;
