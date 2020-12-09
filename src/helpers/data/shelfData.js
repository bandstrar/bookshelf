import axios from 'axios';

const baseUrl = 'https://bookshelves-ce7f4-default-rtdb.firebaseio.com/';

const getAllUserShelves = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shelves.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
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

const updateShelf = (data) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/shelves/${data.firebaseKey}.json`, data)
    .then(resolve)
    .catch((error) => reject(error));
});

export default {
  getAllUserShelves, createShelf, updateShelf,
};
