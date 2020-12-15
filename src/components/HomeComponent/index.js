import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shelfData from '../../helpers/data/shelfData';
import authData from '../../helpers/data/authData';
import ShelfCard from '../Cards/ShelfCard';
import Loader from '../Loader';

class HomeComponent extends Component {
  state = {
    shelves: [],
    loading: true,
  }

  componentDidMount() {
    this.getShelves();
  }

   getShelves = () => {
     const currentUserId = authData.getUid();
     shelfData.getAllUserShelves(currentUserId).then((response) => {
       this.setState({
         shelves: response,
       }, this.setLoading);
     });
   }

   setLoading = () => {
     this.timer = setInterval(() => {
       this.setState({ loading: false });
     }, 500);
   }

   componentWillUnmount() {
     clearInterval(this.timer);
   }

   render() {
     const { shelves, loading } = this.state;
     const showHome = () => (
       shelves.map((shelf) => shelf.name === 'Unread' && <ShelfCard key={shelf.firebaseKey} shelf={shelf} />)
     );
     return (
       <>
       { loading ? (
          <Loader />
       ) : (
      <div>
        {showHome().length !== 0
          ? <>
        <h1 className='text-container'>Looking for your Next Read?</h1>
        <div className='d-flex flex-wrap justify-content-center container'>{showHome()}</div>
        </>
          : <>
          <h1>Start Adding Books to Your Shelves!</h1>
          <div className='d-flex flex-wrap justify-content-center container'>
          <Link className='btn btn-primary bookshelves-buttons' to={'/search'}>
            Search for a Book
            </Link>
        </div>
        </>

        }
      </div>
       )}
      </>
     );
   }
}

export default HomeComponent;
