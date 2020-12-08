import axios from 'axios';
import externalApiKey from '../apiKeys';

const baseUrl = 'https://bookshelves-ce7f4-default-rtdb.firebaseio.com/';

const getAllUserBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-books.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBook = (bookId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/books/${bookId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getSearchedBooks = (search) => new Promise((resolve, reject) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=5&key=${externalApiKey.externalApiKey}`)
    .then((response) => {
      resolve(Object.values(response.data.items));
    }).catch((error) => reject(error));
});

export default { getAllUserBooks, getSingleBook, getSearchedBooks };
