import axios from 'axios';
import keys from '../../config';

// --------------------------------------------------------
// CUSTOM SERVER API CALLS, DB MANIPULATION
// --------------------------------------------------------
const getUserListFromServer = (callback) => {
  axios.get(`http://192.168.1.89:9000/users/${keys.userId}`)
  .then((result) => {
    console.log('USER LIST QUERY SUCCESS');
    callback(result.data.wish_list)
  })
  .catch((err) => {
    console.log('USER LIST QUERY FAILED', err);
  })
};

const addToWishList = (movie_tmdb, callback, setter) => {
  axios.post(`http://192.168.1.89:9000/users/${keys.userId}`, {
      id: movie_tmdb.id,
      title: movie_tmdb.title,
      release_date: movie_tmdb.release_date,
      genre_ids: movie_tmdb.genres.map((e) => e.id),
      poster_path: movie_tmdb.poster_path,
      inList: true
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
  axios.patch(`http://192.168.1.89:9000/users/${keys.userId}`, {
    movieId
  })
  .then((result) => {
    console.log('PATCH SUCCESS', result.data);
    callback(setter);
  })
  .catch((err) => {
    console.log('PATCH FAILED', err);
  })
};

// --------------------------------------------------------
// TMDB API CALLS
// --------------------------------------------------------
const checkIfInList = (movieObj, userList) => {
  let hash = {};
  for (let i = 0; i < userList.length; i++) {
    if (hash[userList[i].id] === undefined) {
      hash[userList[i].id] = true;
    }
  }
  if (hash[movieObj.id.toString()]) {
    movieObj.inList = true;
  } else {
    movieObj.inList = false;
  }
  return movieObj;
}

const getMovieListFromServer = (query, pageNum, setTotalPages, setCurrPageNum, setCurrentMovieList, setIsLoading, userList) => {
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
  .then((filtered) => {
    console.log('GET SUCCESS');
    console.log('======MOVIE COUNT====== :', filtered.length);
    setCurrentMovieList(prevState =>[...prevState, ...filtered]);
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
    console.log('GET GENRES FAILED', err)
  })
};

const getMovieDataById = (id, setter, userList, alert) => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((result) => {
    return checkIfInList(result.data, userList);
  })
  .then((result) => {
    console.log('GET MOVIE DETAILS SUCCESS');
    setter(prevState => [result]);
  })
  .catch((err) => {
   console.log('GET MOVIE DETAILS FAILED', err);
   alert('We don\'t have info on this movie yet! Please try again later!')
  })
};

const getCastListFromServer = (movieId, setCastList, setCrewList, setTopCastList) => {
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((result) => {
    console.log('GET CASTLIST SUCCESS');
    setCastList(result.data.cast);
    setCrewList(result.data.crew);
    setTopCastList(result.data.cast.slice(0, 20))
  })
  .catch((err) => {
    console.log('GET CAST ERROR', err)
  })
};

const getRecommendedList = (movieId, callback) => {
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((result) => {
    console.log('GET RECOMMENDEDLIST SUCCESS');
    callback(result.data.results);
  })
  .catch((err) => {
    console.log('GET RECOMMENDEDLIST ERROR', err);
  })
};

const getMovieTrailer = (id, setter) => {
  console.log("++++++", id);
  axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((result) => {
    console.log('GET MOVIE TRAILER SUCCESS');
    return getOfficialTrailer(result.data.results);
  })
  .then((result) => {
    setter(result);
  })
  .catch((err) => {
    console.log('GET MOVIE TRAILER ERROR', err);
  })
};

const getOfficialTrailer = (arr) => {
  if (arr.length <= 1) return arr;
  let regex = /official/gi;
  for (let i = 0; i < arr.length; i++) {
    if (regex.test(arr[i].name)) return [arr[i]];
  }
  return arr;
}

const getTrending = (timeWindow, callback1, callback2) => {
  axios.get(`https://api.themoviedb.org/3/trending/movie/${timeWindow}`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((result) => {
    console.log(`GET TRENDING ${timeWindow} SUCESS`);
    if (timeWindow === 'day') callback1(result.data.results);
    if (timeWindow === 'week') callback2(result.data.results.reverse());
  })
  .catch((err) => {
    console.log(`GET TRENDING ${timeWindow} FAILED`, err);
  })
};

const getNowPlaying = (callback) => {
  axios.get(`https://api.themoviedb.org/3/movie/now_playing/`, {
    params: {
      api_key: keys.tmdb_api_key,
      language: "en-US"
    }
  })
  .then((result) => {
    console.log('GET NOW PLAYING SUCESS');
    callback(result.data.results);
  })
  .catch((err) => {
    console.log('GET NOW PLAYING FAILED', err);
  })
}

// --------------------------------------------------------
// OMDB API CALLS
// --------------------------------------------------------

const getDataFromOMDB = (id, callback) => {
  axios.get(`http://www.omdbapi.com/`, {
    params: {
      i: id,
      apikey: keys.omdb_api_key
    }
  })
  .then((result) => {
    console.log('OMDB GET SUCCESS');
    callback(result.data);
  })
  .catch((err) => {
    console.log('OMDB GETT ERROR', err)
  })
}

// --------------------------------------------------------
// KINOPOISK API CALLS AND HELPERS
// --------------------------------------------------------
const filterMovie = (arr, title, date, runtime) => {
  let results = [];
  const compareLength = (kp_leng, tmdb_leng) => {
    let arr = kp_leng.split(':');
    let h = arr[0], mm = arr[1];
    let kp_num = parseInt(h) * 60 + parseInt(mm);
    if (tmdb_leng * 0.9 <= kp_num || tmdb_leng * 1.1 >= kp_num) return true;
    else return false;
  };
  for (let i = 0; i < arr.length; i++) {
    let movie = arr[i];
    if (movie.nameEn.split(' ').join('').toLowerCase() === title.split(' ').join('').toLowerCase()) {
      if (movie.year == date) return [movie];
      else results.push(movie);
    }
    if (movie.year == date) results.push(movie)
  }
  if (results.length === 1) return results;
  for(let i = 0; i < results.length; i++) {
    if(compareLength(results[i].filmLength, runtime)) return [results[i]]
  }
  return results;
};

const getMovieImages = (title, date, runtime, callback) => {
  console.log('KP QUERY INVOKED! QUERY: ', 'TITLE:',title,'DATE:', date)
  axios({
    method: 'GET',
    url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${title}&page=1`,
    headers: {
      'X-API-KEY': keys.kp_unof_api_key
    }
  })
  .then((result) => {
    return filterMovie(result.data.films, title, date, runtime);
  })
  .then((movies) => {
    movies.length > 0 ? callback(movies[0]['filmId']) : null
  })
  .catch((err) => {
    console.log('KP GET ERROR', err);
  })
};

const getImagesUrls = (id, callback) => {
  console.log('URL ID', id)
  axios({
    method: 'get',
    url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`,
    headers: {
      'X-API-KEY': keys.kp_unof_api_key
    }
  })
  .then((result) => {
    callback(result.data.frames);
  })
  .catch((err) => {
    console.log('GET IMAGE_URLS FAILED', err);
  })
};

module.exports = {
  getTrending,
  getNowPlaying,
  getUserListFromServer,
  addToWishList,
  deleteFromUserList,
  getMovieListFromServer,
  getGenresListFromApi,
  getMovieDataById,
  getDataFromOMDB,
  getCastListFromServer,
  getRecommendedList,
  getMovieImages,
  getImagesUrls,
  getMovieTrailer
}

