import axios from 'axios';
import keys from '../../dev_config';

const server = axios.create({
  baseURL: 'http://localhost:9000'
});

const getUserList = async () => {
  try{
    const response = await server.get(`/users/${keys.userId}`);
    return response.data.wish_list;
  } catch (err) {
    console.log('Error: in getUserList', err);
    return [];
  }
};

const addToList = async (movie_tmdb) => {
  try{
    let res = await server.post(`/users/${keys.userId}`, {
        id: movie_tmdb.id,
        title: movie_tmdb.title,
        release_date: movie_tmdb.release_date,
        genre_ids: movie_tmdb.genres.map((e) => e.id),
        poster_path: movie_tmdb.poster_path,
        inList: true
    });
  } catch (err) {
    console.log('Error: in addToList', err);
  }
};

const deleteFromList = async (movieId) => {
  try{
    let res = await server.patch(`/users/${keys.userId}`, {
      movieId
    })
  } catch (err) {
    console.log('Error: deleteFromList', err);
  }
};

const getGenresList = async () => {
  try{
    const response = await server.get('/genre/movie/list', {
      params: { userId: keys.userId }
    })
    return response.data;
  } catch (err) {
    console.log('Error: in getGenresList', err);
    return {};
  }
};

const getTrending = async (timeWindow, userList) => {
  try{
    const response = await server.get(`/trending/movie`, {
      params: {
        timeWindow: timeWindow,
        userId: keys.userId
      }
    });
    return response.data;
  } catch (err) {
    console.log('Error: in getTrending', err);
    return [];
  }
};

const getNowPlaying = async (userList) => {
  try{
    const response = await server.get(`/movie/now_playing/`, {
      params: { userId: keys.userId }
    })
    return response.data;
  } catch (err) {
    console.log('Error: in getNowPlaying', err);
    return [];
  }
};

const getMovieDataById = async (id) => {
  try{
    const response = await server.get(`/movie`, {
      params: { userId: keys.userId, movieId: id }
    });
    return response.data;
  } catch (err) {
    console.log('Error: in getMovieDataById', err);
    return [];
  }
};

const getCastListFromServer = async (movieId) => {
  try{
    const res = await server.get(`/movie/${movieId}/credits`, {
      params: { userId: keys.userId }
    });
    return [res.data.cast, res.data.crew, res.data.cast.slice(0, 20)];
  } catch (err) {
    console.log('Error: in getCastListFromServer', err);
    return [[],[],[]];
  }
};

const getRecommendedList = async (movieId) => {
  try{
    const response = await server.get(`/movie/${movieId}/recommendations`, {
      params: { userId: keys.userId }
    });
    return response.data;
  } catch (err) {
    console.log('Error: in getRecommendedList', err);
    return [];
  }
};

const getMovieTrailer = async (id) => {
  try{
    const response = await server.get(`/movie/${id}/videos`, {
      params: { userId: keys.userId }
    });
    return response.data;
  } catch (err) {
    console.log('Error: in getMovieTrailer', err);
    return [];
  }
};

const getMovieList = async (query, num, userList) => {
  try{
    let res = await server.get('/search/movie', {
      params: {
        query: query,
        page: num,
        userId: keys.userId
      }
    });
    return [res.data.total_pages, res.data.results];
  } catch (err) {
    console.log('Error: in getMovieList', err);
    return [0,[]];
  }
};

const getMovieImages = async (title, date, runtime, movieId) => {
  try{
    const res = await server.get('/movie/images', {
      params: {
        userId: keys.userId,
        title: title,
        date: date,
        runtime: runtime,
        movieId: movieId
      }
    });
    return res.data;
  } catch (err) {
    console.log('Error: in getMovieImages:', err);
    return [];
  }
};

const getDataFromOMDB = async (id) => {
  try {
    const response = await server.get(`/ombd`, {
      params: { i: id, userId: keys.userId }
    });
    return response.data;
  } catch (err) {
    console.log('Error: in getDataFromOMDB', err);
    return {};
  }
};

module.exports = {
  getUserList,
  getGenresList,
  getTrending,
  getNowPlaying,
  getMovieDataById,
  addToList,
  deleteFromList,
  getCastListFromServer,
  getMovieList,
  getDataFromOMDB,
  getRecommendedList,
  getMovieTrailer,
  getMovieImages,
};