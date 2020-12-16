import axios from 'axios';
import bookData from './bookData';

const baseUrl = 'https://bookshelves-ce7f4-default-rtdb.firebaseio.com/';

const getAllUserShelves = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shelves.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleShelf = (shelfId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shelves/${shelfId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createShelf = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/shelves.json`, data)
    .then((response) => {
      if (data.image === '') {
        axios.patch(`${baseUrl}/shelves/${response.data.name}.json`, { image: 'https://i.imgur.com/u2vvtJk.jpg' });
      }
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/shelves/${response.data.name}.json`, update)
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
});

const getUnreadShelf = (uid) => new Promise((resolve, reject) => {
  getAllUserShelves(uid).then((response) => {
    const unreadShelf = response.filter((shelf) => shelf.name === 'Unread');
    resolve(unreadShelf[0]);
  }).catch((error) => reject(error));
});

const getRandomUnread = (uid) => new Promise((resolve, reject) => {
  getUnreadShelf(uid).then((response) => {
    bookData.getShelfBooks(response.firebaseKey).then((re) => {
      resolve(re);
    }).catch((error) => reject(error));
  });
});

const deleteShelf = (shelfId) => axios.delete(`${baseUrl}/shelves/${shelfId}.json`);

const deleteShelfBooks = (firebaseKey) => axios.delete(`${baseUrl}/shelf-books/${firebaseKey}.json`);

const updateShelf = (data) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/shelves/${data.firebaseKey}.json`, data)
    .then(resolve)
    .catch((error) => reject(error));
});

export default {
  getAllUserShelves, createShelf, updateShelf, getSingleShelf, deleteShelf, deleteShelfBooks, getRandomUnread, getUnreadShelf,
};
