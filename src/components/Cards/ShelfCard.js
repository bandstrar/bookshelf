import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

export default function ShelfCard({ shelf, updateShelf }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '20px', background: '#9b775d' }}>
        <Link to={`/shelves/${shelf.firebaseKey}`}><CardImg top width="100%" src={shelf.image} alt={shelf.name} /></Link>
        <CardBody>
          <CardTitle tag="h5">{shelf.name}</CardTitle>
          {updateShelf}
        </CardBody>
      </Card>
    </div>
  );
}
