import axios from 'axios';

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

export default { getAllUserBooks, getSingleBook };
