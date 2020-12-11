import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

export default function BookCard({ book, removeBook }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '20px', background: '#9b775d' }}>
        <Link to={`/books/${book.fbKey}`}><CardImg top width="100%" src={book.image} alt={book.name} /></Link>
        <CardBody>
          <CardTitle tag="h5">{book.name}</CardTitle>
          <div className='d-flex flex-flow justify-content-center'>
          <button className='btn btn-danger' id={book.fbKey} onClick={(e) => removeBook(e)}>Delete</button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
