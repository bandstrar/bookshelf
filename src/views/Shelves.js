import React, { Component } from 'react';
import shelfData from '../helpers/data/shelfData';
import getUid from '../helpers/data/authData';
import ShelfCard from '../components/Cards/ShelfCard';
import Loader from '../components/Loader';
import AppModal from '../components/AppModal';
import ShelfForm from '../components/Forms/ShelfForm';

class Shelves extends Component {
    state = {
      shelves: [],
      loading: true,
    }

    componentDidMount() {
      this.getShelves();
    }

     getShelves = () => {
       const currentUserId = getUid.getUid();
       shelfData.getAllUserShelves(currentUserId).then((response) => {
         this.setState({
           shelves: response,
         }, this.setLoading);
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
       const { shelves, loading } = this.state;
       const showShelves = () => (
         shelves.map((shelf) => <ShelfCard key={shelf.firebaseKey} shelf={shelf} />)
       );
       return (
            <>
            { loading ? (
          <Loader />
            ) : (
            <>
            <AppModal modalTitle={'Create a Shelf'} buttonLabel={'Create a Shelf'}>
                <ShelfForm onUpdate={this.getShelves} />
            </AppModal>
                <h2>My Shelves</h2>
                <div className='d-flex flex-wrap justify-content-between container'>{showShelves()}</div>
            </>
            )}
       </>
       );
     }
}

export default Shelves;
