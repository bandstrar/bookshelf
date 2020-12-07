import React, { Component } from 'react';
import shelfData from '../helpers/data/shelfData';
import getUid from '../helpers/data/authData';
import ShelfCard from '../components/Cards/ShelfCard';

class Shelves extends Component {
    state = {
      shelves: [],
    }

    componentDidMount() {
      this.getShelves();
    }

     getShelves = () => {
       const currentUserId = getUid.getUid();
       shelfData.getAllUserShelves(currentUserId).then((response) => {
         this.setState({
           shelves: response,
         });
       });
     }

     render() {
       const { shelves } = this.state;
       const showShelves = () => (
         shelves.map((shelf) => <ShelfCard key={shelf.firebaseKey} shelf={shelf} />)
       );
       return (
            <>
                <h2>My Shelves</h2>
                <div className='d-flex flex-wrap justify-content-between container'>{showShelves()}</div>
            </>
       );
     }
}

export default Shelves;
