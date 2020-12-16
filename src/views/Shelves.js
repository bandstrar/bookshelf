import React, { Component } from 'react';
import shelfData from '../helpers/data/shelfData';
import getUid from '../helpers/data/authData';
import ShelfCard from '../components/Cards/ShelfCard';
import Loader from '../components/Loader';
import AppModal from '../components/AppModal';
import ShelfForm from '../components/Forms/ShelfForm';
import bookData from '../helpers/data/bookData';

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

     removeShelf = (e) => {
       const removedShelf = this.state.shelves.filter((shelf) => shelf.firebaseKey !== e.target.id);

       this.setState({
         shelves: removedShelf,
       });
       bookData.getShelfBooks(e.target.id)
         .then((response) => {
           response.forEach((shelfBook) => {
             shelfData.deleteShelfBooks(shelfBook.firebaseKey);
           });
         });
       shelfData.deleteShelf(e.target.id)
         .then(() => {
           this.getShelves();
         });
     }

     updateShelf = (shelf) => (
        <AppModal modalTitle={'Update a Shelf'} buttonLabel={'Update'}>
            <ShelfForm shelf={shelf} onUpdate={this.getShelves} />
        </AppModal>
     )

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
         shelves.map((shelf) => <ShelfCard key={shelf.firebaseKey} shelf={shelf} updateShelf={this.updateShelf(shelf)} removeShelf={this.removeShelf} />)
       );
       return (
            <>
            { loading ? (
          <Loader />
            ) : (
            <>
            <div className='d-flex flex-row justify-content-center text-container'>
                <h2 className='m-auto'>My Shelves</h2>
                <AppModal modalTitle={'Create a Shelf'} buttonLabel={'Create a Shelf'}>
                <ShelfForm onUpdate={this.getShelves} />
                </AppModal>
                </div>
                <div className='d-flex flex-wrap justify-content-between container'>{showShelves()}</div>
            </>
            )}
       </>
       );
     }
}

export default Shelves;
