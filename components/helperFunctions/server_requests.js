import axios from 'axios';
import keys from '../../config';

const getUserListFromServer = (callback) => {
  axios.get(`http://192.168.1.93:9000/users/${keys.userId}`)
  .then((result) => {
    console.log('USER LIST QUERY SUCCESS');
    callback(result.data.wish_list)
  })
  .catch((err) => {
    console.log('USER LIST QUERY FAILED', err);
  })
};

const addToWishList = (movie_tmdb, callback, setter) => {
  axios.post(`http://192.168.1.93:9000/users/${keys.userId}`, {
      id: movie_tmdb.id,
      title: movie_tmdb.title,
      release_date: movie_tmdb.release_date,
      genre_ids: movie_tmdb.genres.map((e) => e.id),
      poster_path: movie_tmdb.poster_path
  })
  .then((result) => {
    console.log('POST SUCCESS');
    callback(setter)
  })
  .catch((err) => {
    console.log('POST FAILED!!!', err);
  })
};

const deleteFromUserList = (movieId, callback, setter) => {
  axios.patch(`http://192.168.1.93:9000/users/${keys.userId}`, {
    movieId
  })
  .then((result) => {
    console.log('PATCH SUCCESS', result.data);
    // api.getUserListFromServer(setUserList);
    callback(setter);
  })
  .catch((err) => {
    console.log('PATCH FAILED', err);
  })
};

module.exports = {
  getUserListFromServer,
  addToWishList,
  deleteFromUserList
}

