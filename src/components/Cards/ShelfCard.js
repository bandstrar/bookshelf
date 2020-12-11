import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

export default function ShelfCard({ shelf, updateShelf, removeShelf }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '20px', background: '#9b775d' }}>
        <Link to={`/shelves/${shelf.firebaseKey}`}><CardImg top width="100%" src={shelf.image} alt={shelf.name} /></Link>
        <CardBody>
          <CardTitle tag="h5">{shelf.name}</CardTitle>
          <div className='d-flex flex-flow justify-content-between'>
          {updateShelf}
          <button className='btn btn-danger' id={shelf.firebaseKey} onClick={(e) => removeShelf(e)}>Delete</button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
