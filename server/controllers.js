const axios = require('axios');

const db = require('../db/index_db');
const keys = require('../dev_config'); // <-- change

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const omdb = axios.create({
  baseURL: 'http://www.omdbapi.com',
});

/*-------------------------------------------------------
  == API CALLS ==
--------------------------------------------------------*/
const getGenresList = async (req, res) => {
  try {
    const response = await tmdb.get(`/genre/movie/list`, {
      params: { api_key: keys.tmdb_api_key },
    });
    const genresObj = {};
    response.data.genres.forEach((item) => {
      if (!genresObj[item.id]) {
        genresObj[item.id] = item.name;
      }
    });
    res.status(200).send(genresObj);
  } catch (err) {
    console.log('Error: in getGenresList', err);
    res.status(400).send();
  }
};

const getTrending = async (req, res) => {
  const timeWindow = req.query.timeWindow;
  try {
    const movieList = await tmdb.get(`/trending/movie/${timeWindow}`, {
      params: { api_key: keys.tmdb_api_key },
    });
    const userList = await db.model.findById(req.query.userId);
    const checked = await checkIfInList(movieList.data.results, userList.wish_list);
    if (timeWindow === 'day') res.status(200).send(checked);
    else res.status(200).send(checked.reverse());
  } catch (err) {
    console.log('Error: in getTrending', err);
    res.status(400).send();
  }
};

const getNowPlaying = async (req, res) => {
  try {
    const movieList = await tmdb.get(`/movie/now_playing/`, {
      params: { api_key: keys.tmdb_api_key, language: 'en-US' },
    });
    const userList = await db.model.findById(req.query.userId);
    const checked = await checkIfInList(movieList.data.results, userList.wish_list);
    res.status(200).send(checked);
  } catch (err) {
    console.log('Error: in getNowPlaying', err);
    res.status(400).send();
  }
};

const getMovieDataById = async (req, res) => {
  try {
    const movieList = await tmdb.get(`/movie/${req.query.movieId}`, {
      params: { api_key: keys.tmdb_api_key },
    });
    const userList = await db.model.findById(req.query.userId);
    const checked = await checkIfInList([movieList.data], userList.wish_list);
    res.status(200).send(checked);
  } catch (err) {
    console.log('Error: in getMovieDataById', err);
    res.status(400).send();
  }
};

const getCastListFromServer = async (req, res) => {
  try {
    const response = await tmdb.get(`/movie/${req.params.movieId}/credits`, {
      params: { api_key: keys.tmdb_api_key },
    });
    res.status(200).send(response.data);
  } catch (err) {
    console.log('Error: in getCastListFromServer');
    res.status(400).send();
  }
};

const getRecommendedList = async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const movieList = await tmdb.get(`/movie/${movieId}/recommendations`, {
      params: { api_key: keys.tmdb_api_key },
    });
    const userList = await db.model.findById(req.query.userId);
    const checked = await checkIfInList(movieList.data.results, userList.wish_list);
    res.status(200).send(checked);
  } catch (err) {
    console.log('Error: in getRecommendedList', err);
    res.status(400).send();
  }
};

const getMovieTrailer = async (req, res) => {
  try {
    const list = await tmdb.get(`/movie/${req.params.movieId}/videos`, {
      params: { api_key: keys.tmdb_api_key },
    });
    const official = await getOfficialTrailer(list.data.results);
    res.status(200).send(official);
  } catch (err) {
    console.log('Error: in getMovieTrailer', err);
    res.status(400).send();
  }
};

const getMovieList = async (req, res) => {
  try {
    const movieList = await tmdb.get('/search/movie', {
      params: {
        api_key: keys.tmdb_api_key,
        query: req.query.query,
        page: req.query.page,
      },
    });
    movieList.data.results = await movieList.data.results.filter((movie) =>
      movie.release_date ? movie : null
    );
    const userList = await db.model.findById(req.query.userId);
    movieList.data.results = await checkIfInList(movieList.data.results, userList.wish_list);
    res.status(200).send(movieList.data);
  } catch (err) {
    console.log('Error: in getMovieList', err);
    res.status(400).send();
  }
};

const getMovieImages = async (req, res) => {
  const title = req.query.title;
  const date = req.query.date;
  const runtime = req.query.runtime;
  try {
    const response = await axios({
      method: 'GET',
      url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${title}&page=1`,
      headers: {
        'X-API-KEY': keys.kp_unof_api_key,
      },
    });
    const filtered = await filterMovie(response.data.films, title, date, runtime);
    const id = filtered.length > 0 ? filtered[0]['filmId'] : null;
    if (id !== null) {
      const response2 = await axios({
        method: 'get',
        url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`,
        headers: {
          'X-API-KEY': keys.kp_unof_api_key,
        },
      });
      res.status(200).send(response2.data.frames);
    } else {
      res.status(200).send([]);
    }
  } catch (err) {
    console.log('Error: in getMovieImages:', err);
    res.status(400).send();
  }
};

const getDataFromOMDB = async (req, res) => {
  try {
    const movie = await omdb.get(`/`, {
      params: { i: req.query.i, apikey: keys.omdb_api_key },
    });
    res.status(200).send(movie.data);
  } catch (err) {
    console.log('Error: in getDataFromOMDB', err);
    res.status(400).send();
  }
};

const getPersonDataById = async (req, res) => {
  try {
    const person = await tmdb.get(`/person/${req.query.personId}`, {
      params: { api_key: keys.tmdb_api_key },
    });
    res.status(200).send(person.data);
  } catch (err) {
    console.log('Error: in getPersonDataById', err);
    res.status(400).send();
  }
};

const getPersonImages = async (req, res) => {
  try {
    const response = await tmdb.get(`/person/${req.query.personId}/images`, {
      params: { api_key: keys.tmdb_api_key },
    });
    res.status(200).send(response.data.profiles.slice(1));
  } catch (err) {
    console.log('Error: in getPersonDataById', err);
    res.status(400).send();
  }
};

const getPersonMovies = async (req, res) => {
  try {
    const response = await tmdb.get(`/person/${req.query.personId}/movie_credits`, {
      params: { api_key: keys.tmdb_api_key, language: 'en-US' },
    });
    const filtered = await filterUnknown(response.data.cast);
    res.status(200).send(filtered);
  } catch (err) {
    console.log('Error: in getPersonDataById', err);
    res.status(400).send();
  }
};

/*-------------------------------------------------------
  == HELPERS ==
--------------------------------------------------------*/
const checkIfInList = (apiList, userList) => {
  const hash = {};
  for (let i = 0; i < userList.length; i++) {
    if (hash[userList[i].id] === undefined) {
      hash[userList[i].id] = true;
    }
  }
  for (let i = 0; i < apiList.length; i++) {
    const movie = apiList[i];
    if (hash[movie.id]) movie.inList = true;
    else movie.inList = false;
  }
  return apiList;
};

const getOfficialTrailer = (arr) => {
  if (arr.length <= 1) return arr;
  const regex = /official/gi;
  for (let i = 0; i < arr.length; i++) {
    if (regex.test(arr[i].name)) return [arr[i]];
  }
  return arr;
};

const filterMovie = (arr, title, date, runtime) => {
  const results = [];
  const compareLength = (kp_leng, tmdb_leng) => {
    const arr = kp_leng.split(':');
    const h = arr[0],
      mm = arr[1];
    const kp_num = parseInt(h) * 60 + parseInt(mm);
    if (tmdb_leng * 0.9 <= kp_num || tmdb_leng * 1.1 >= kp_num) return true;
    else return false;
  };
  for (let i = 0; i < arr.length; i++) {
    const movie = arr[i];
    if (
      movie.nameEn.split(' ').join('').toLowerCase() === title.split(' ').join('').toLowerCase()
    ) {
      if (movie.year == date) return [movie];
      else results.push(movie);
    }
    if (movie.year == date) results.push(movie);
  }
  if (results.length === 1) return results;
  for (let i = 0; i < results.length; i++) {
    if (compareLength(results[i].filmLength, runtime)) return [results[i]];
  }
  return results;
};

const filterUnknown = (movies) => {
  if (movies.length <= 20) return movies;
  const filtered = movies.filter((mov) => {
    if (mov.release_date && mov.character && mov.poster_path) return mov;
  });
  return filtered.slice(0, 20);
};

/*-------------------------------------------------------
  == DATABASE MANIPULATON ==
--------------------------------------------------------*/
const getUserList = (req, res) => {
  db.model.findById(req.params.userId, (err, result) => {
    if (result) {
      res.status(200).send(result);
    }
    if (err) {
      console.log('GET FAILED', err);
      res.status(400).send();
    }
  });
};

const postMovieToUserList = (req, res) => {
  const movie = req.body;
  db.model.findByIdAndUpdate(req.params.userId, { $push: { wish_list: movie } }, (err, result) => {
    if (result) {
      res.status(200).send();
    }
    if (err) {
      console.log('DB INSERTION FAILED', err);
      res.status(400).send();
    }
  });
};

const patchDataInUserList = (req, res) => {
  const movieId = req.body.movieId;
  db.model.findOneAndUpdate(
    req.params.userId,
    { $pull: { wish_list: { id: movieId } } },
    (err, result) => {
      if (result) {
        res.status(200).send();
      }
      if (err) {
        console.log('DB PATCH FAILED', err);
        res.status(400).send();
      }
    }
  );
};

module.exports = {
  postMovieToUserList,
  getUserList,
  patchDataInUserList,
  getGenresList,
  getTrending,
  getNowPlaying,
  getMovieDataById,
  getCastListFromServer,
  getRecommendedList,
  getMovieTrailer,
  getDataFromOMDB,
  getMovieList,
  getMovieImages,
  getPersonDataById,
  getPersonImages,
  getPersonMovies,
};
