import axios from 'axios';
import keys from '../../config';

// --------------------------------------------------------
// CUSTOM SERVER API CALLS, DB MANIPULATION
// --------------------------------------------------------
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

// --------------------------------------------------------
// TMDB API CALLS
// --------------------------------------------------------
const getMovieListFromServer = (query, pageNum, setTotalPages, setCurrPageNum, setCurrentMovieList, setIsLoading) => {
  console.log('QUERY', query)
  axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
      api_key: keys.tmdb_api_key,
      query: query,
      page: pageNum
    }
  })
  .then((result) => {
    setTotalPages(result.data.total_pages);
    setCurrPageNum(prev => prev + 1);
    return result.data.results.filter(movie => movie.release_date ? movie : null)
  })
  .then((result) => {
    console.log('GET SUCCESS');
    // console.log(result)
    console.log('======MOVIE COUNT====== :',result.length);
    setCurrentMovieList(prevState =>[...prevState, ...result]);
    setIsLoading(false)
  })
  .catch((err) => {
    console.log('GET FAILED');
    console.log(err);
  })
};

const getGenresListFromApi = (setter) => {
  axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((result) => {
    console.log('GET GENRES SUCCESS')
    let genresObj = {};
    result.data.genres.forEach((item) => {
      if(!genresObj[item.id]) {
        genresObj[item.id] = item.name
      }
    })
    setter(genresObj);
  })
  .catch((err) => {
    console.log('GENRES GET FAILED', err)
  })
};

const getMovieDataById = (id, setter) => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((result) => {
    console.log('++++++++++++ MOVIE DETAILS SUCCESS')
    setter(prevState => [result.data])
  })
  .catch((err) => {
   console.log('------------ MOVIE DETAILS FAILED', err)
  })
};

module.exports = {
  getUserListFromServer,
  addToWishList,
  deleteFromUserList,
  getMovieListFromServer,
  getGenresListFromApi,
  getMovieDataById
}

