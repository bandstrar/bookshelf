import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
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
