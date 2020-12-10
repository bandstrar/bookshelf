import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

export default function BookCard({ book }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '20px', background: '#9b775d' }}>
        <Link to={`/books/${book.fbKey}`}><CardImg top width="100%" src={book.image} alt={book.name} /></Link>
        <CardBody>
          <CardTitle tag="h5">{book.name}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
}
