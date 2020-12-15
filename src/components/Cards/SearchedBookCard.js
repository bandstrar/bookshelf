import React, { Component } from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, Button,
} from 'reactstrap';

class SearchedBookCard extends Component {
  state = {
    clicked: false,
  }

  deactivateButton = () => {
    const currentState = this.state.clicked;
    this.setState({ clicked: !currentState });
  }

  render() {
    const { clicked } = this.state;
    const { book, addNewBook } = this.props;
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
          <CardTitle tag="h5">Publication Date: {book.volumeInfo.publishedDate}</CardTitle>
          {clicked ? (
            <Button className='btn btn-secondary w-25 align-self-center' disabled id={book.id}>Book Added to Collection!</Button>
          )
            : <Button className='btn btn-success w-25 align-self-center' id={book.id} onClick={(e) => {
              addNewBook(e);
              this.deactivateButton();
            }}><i className="fas fa-plus-circle"></i>Add Book to Collection</Button>
          }

          </div>
        </CardBody>
        </div>
        </div>
      </Card>
    </div>
    );
  }
}

export default SearchedBookCard;
