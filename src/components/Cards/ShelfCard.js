import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

export default function ShelfCard({ shelf }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '20px', background: '#9b775d' }}>
        <CardImg top width="100%" src={shelf.image} alt={shelf.name} />
        <CardBody>
          <CardTitle tag="h5">{shelf.name}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
}
