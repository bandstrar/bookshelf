import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

export default function BookCard({ book, addNewBook }) {
  return (
    <div>
      <Card style={{
        width: '90%', margin: '10px', background: '#9b775d',
      }}>
      <div className='row no-gutters'>
        <div className='col-md-4'>
        <CardImg style={{ width: '50%', height: '100%' }} src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
        </div>
        <div className='col-md-8'>
        <CardBody>
          <div className='d-flex flex-column justify-content-center'>
          <CardTitle tag="h5">{book.volumeInfo.title}</CardTitle>
          <CardTitle tag="h5">{book.volumeInfo.authors.join(', ')}</CardTitle>
          <button className='btn btn-success w-25 align-self-center' id={book.id} onClick={(e) => addNewBook(e)}><i class="fas fa-plus-circle"></i>Add Book to Collection</button>
          </div>
        </CardBody>
        </div>
        </div>
      </Card>
    </div>
  );
}
