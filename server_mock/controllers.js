const db = require('../db/index_db');
const mockData = require('../mockData');

/*-------------------------------------------------------
  == MOCK APIC CALLS ==
--------------------------------------------------------*/
const getGenresList = async (req, res) => {
  try {
    const genresObj = {};
    mockData.genres.forEach((item) => {
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
    const movieList = mockData.trending.results;
    const userList = await db.model.findById(req.query.userId);
    const checked = await checkIfInList(movieList, userList.wish_list);
    if (timeWindow === 'day') res.status(200).send(checked);
    else res.status(200).send(checked.reverse());
  } catch (err) {
    console.log('Error: in getTrending', err);
    res.status(400).send();
  }
};

const getNowPlaying = async (req, res) => {
  try {
    const movieList = mockData.trending.results;
    const userList = await db.model.findById(req.query.userId);
    const checked = await checkIfInList(movieList, userList.wish_list);
    const mid = Math.floor(checked.length / 2);
    const swapped = checked.slice(mid).concat(checked.slice(0, mid));
    res.status(200).send(swapped);
  } catch (err) {
    console.log('Error: in getNowPlaying', err);
    res.status(400).send();
  }
};

const getMovieDataById = async (req, res) => {
  try {
    const movie = [mockData.movieDetails[req.query.movieId]];
    const userList = await db.model.findById(req.query.userId);
    const checked = await checkIfInList(movie, userList.wish_list);
    res.status(200).send(checked);
  } catch (err) {
    console.log('Error: in getMovieDataById', err);
    res.status(400).send();
  }
};

const getCastListFromServer = async (req, res) => {
  try {
    const response = mockData.cast[req.params.movieId];
    res.status(200).send(response);
  } catch (err) {
    console.log('Error: in getCastListFromServer');
    res.status(400).send();
  }
};

const getRecommendedList = async (req, res) => {
  try {
    const movieList = mockData.trending.results;
    const userList = await db.model.findById(req.query.userId);
    const checked = await checkIfInList(movieList, userList.wish_list);
    res.status(200).send(checked);
  } catch (err) {
    console.log('Error: in getRecommendedList', err);
    res.status(400).send();
  }
};

const getMovieTrailer = async (req, res) => {
  try {
    const list = mockData.trailer[req.params.movieId];
    const official = await getOfficialTrailer(list);
    res.status(200).send(official);
  } catch (err) {
    console.log('Error: in getMovieTrailer', err);
    res.status(400).send();
  }
};

const getMovieList = async (req, res) => {
  try {
    const list = mockData.trending;
    const userList = await db.model.findById(req.query.userId);
    list.results = await checkIfInList(list.results, userList.wish_list);
    res.status(200).send(list);
  } catch (err) {
    console.log('Error: in getMovieList', err);
    res.status(400).send();
  }
};

const getMovieImages = async (req, res) => {
  try {
    const response = mockData.images[req.query.movieId];
    res.status(200).send(response);
  } catch (err) {
    console.log('Error: in getMovieImages:', err);
    res.status(400).send();
  }
};

const getDataFromOMDB = async (req, res) => {
  try {
    const movie = mockData.omdb.filter((movie) => movie.imdbID === req.query.i);
    res.status(200).send(movie[0]);
  } catch (err) {
    console.log('Error: in getDataFromOMDB', err);
    res.status(400).send();
  }
};

const getPersonDataById = async (req, res) => {
  try {
    const response = mockData.persons['3894'];
    res.status(200).send(response);
  } catch (err) {
    console.log('Error: in getPersonDataById', err);
    res.status(400).send([]);
  }
};

const getPersonImages = async (req, res) => {
  try {
    const response = mockData.persons['3894'].images.slice(1);
    res.status(200).send(response);
  } catch (err) {
    console.log('Error: in getPersonDataById', err);
    res.status(400).send([]);
  }
};

const getPersonMovies = async (req, res) => {
  try {
    const response = mockData.persons['3894'].known_for;
    res.status(200).send(response);
  } catch (err) {
    console.log('Error: in getPersonDataById', err);
    res.status(400).send(mockData.persons['3894'].known_for);
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
