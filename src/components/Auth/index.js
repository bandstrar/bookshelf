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
        <button className='btn btn-secondary' onClick={this.loginClickEvent}>
          Log In
        </button>
      </div>
    );
  }
}

export default Auth;
