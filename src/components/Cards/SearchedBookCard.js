import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

export default function BookCard({ book, addNewBook }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '20px', background: '#9b775d' }}>
        <CardImg top width="100%" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
        <CardBody>
          <CardTitle tag="h5">{book.volumeInfo.title}</CardTitle>
          <button className='btn btn-success' id={book.id} onClick={(e) => addNewBook(e)}>Add Book to Collection</button>
        </CardBody>
      </Card>
    </div>
  );
}
