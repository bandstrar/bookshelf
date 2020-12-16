import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book, removeBook }) {
  return (
    <div className='d-flex flex-column'>
      <div className='card-close-container'>
        <button className='card-close-button' id={book.fbKey} onClick={(e) => removeBook(e)}><i id={book.fbKey} className="fas fa-window-close"></i></button>
        </div>
        <Link to={`/books/${book.fbKey}`}><img className='book-container' src={book.image} alt={book.name} /></Link>
    </div>
  );
}
