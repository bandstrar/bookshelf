import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

export default function ShelfCard({ shelf, updateShelf }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '20px', background: '#9b775d' }}>
        <CardImg top width="100%" src={shelf.image} alt={shelf.name} />
        <CardBody>
          <CardTitle tag="h5">{shelf.name}</CardTitle>
          {updateShelf}
        </CardBody>
      </Card>
    </div>
  );
}
