import axios from 'axios';

const baseUrl = 'https://bookshelves-ce7f4-default-rtdb.firebaseio.com/';

const getAllUserShelves = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shelves.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default {
  getAllUserShelves,
};
