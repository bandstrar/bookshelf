import axios from 'axios';
import externalApiKey from '../apiKeys';

const baseUrl = 'https://bookshelves-ce7f4-default-rtdb.firebaseio.com/';

const getAllUserBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-books.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAllBooks = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/books.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => (reject(error)));
});

const getSingleUserBook = (uid, bookId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user-books.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    const userBooks = Object.values(response.data);
    const singleUserBook = userBooks.filter((book) => book.bookId === bookId);
    resolve(singleUserBook[0]);
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

const addBook = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/books.json`, data)
    .then((response) => {
      const update = { fbKey: response.data.name };
      axios.patch(`${baseUrl}/books/${response.data.name}.json`, update)
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
});

const addUserBook = (firebaseKey, userId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/user-books.json`, {
    bookId: firebaseKey, userId, notes: '', rating: 0,
  })
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/user-books/${response.data.name}.json`, update)
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
});

const updateUserBook = (data) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/user-books/${data.firebaseKey}.json`, data)
    .then(resolve)
    .catch((error) => reject(error));
});

const updateBook = (data) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/books/${data.fbKey}.json`, data)
    .then(resolve)
    .catch((error) => reject(error));
});

const getShelfBooks = (shelfId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shelf-books.json?orderBy="shelfId"&equalTo="${shelfId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createShelfBook = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/shelf-books.json`, data)
    .then((response) => {
      axios.patch(`${baseUrl}/shelf-books/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
});

export default {
  getAllUserBooks, getSingleBook, getSearchedBooks, addBook, addUserBook, getSingleUserBook, updateUserBook, getShelfBooks, createShelfBook, updateBook, getAllBooks,
};
