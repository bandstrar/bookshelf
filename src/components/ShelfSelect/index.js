import React, { Component } from 'react';
import authData from '../../helpers/data/authData';
import shelfData from '../../helpers/data/shelfData';

class ShelfSelect extends Component {
  state = {
    shelves: [],
  }

  componentDidMount() {
    this.getShelves();
  }

   getShelves = () => {
     const currentUserId = authData.getUid();
     shelfData.getAllUserShelves(currentUserId).then((response) => {
       this.setState({
         shelves: response,
       });
     });
   }

   render() {
     const { shelves } = this.state;
     const { onChange } = this.props;
     const mapShelves = () => (
       shelves.map((shelf) => <option key={shelf.firebaseKey} value={shelf.firebaseKey}>{shelf.name}</option>)
     );
     return (
      <div className='shelf-select-container m-2'>
        <select className='form-control add-to-shelf' name='shelfId' onChange={onChange} id='addToShelf'>
          <option value=''>Add to a Shelf</option>
          {mapShelves()}
        </select>
      </div>
     );
   }
}

export default ShelfSelect;
