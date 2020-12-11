import axios from 'axios';
import keys from '../../config';

/*-------------------------------------------------------
  == CUSTOM SERVER API CALLS, DB MANIPULATION ==
--------------------------------------------------------*/
const getUserListFromServer = (callback) => {
  axios.get(`http://192.168.1.83:9000/users/${keys.userId}`)
  .then((result) => {
    console.log('++ SERVER ++ GET USERLIST SUCCESS');
    callback(result.data.wish_list)
  })
  .catch((err) => {
    console.log('-- SERVER -- GET USERLIST QUERY FAILED', err);
  })
};

const addToWishList = (movie_tmdb, getUserList) => {
  axios.post(`http://192.168.1.83:9000/users/${keys.userId}`, {
      id: movie_tmdb.id,
      title: movie_tmdb.title,
      release_date: movie_tmdb.release_date,
      genre_ids: movie_tmdb.genres.map((e) => e.id),
      poster_path: movie_tmdb.poster_path,
      inList: true
  })
  .then((res) => {
    console.log('++ SERVER ++ ADD_TO_LIST SUCESS');
    getUserList();
  })
  .catch((err) => {
    console.log('++ SERVER ++ ADD_TO_LIST FAILED', err);
  })
};

const deleteFromWishList = (movieId, getUserList) => {
  axios.patch(`http://192.168.1.83:9000/users/${keys.userId}`, {
    movieId
  })
  .then((result) => {
    console.log('++ SERVER ++ DELETE_FROM_LIST SUCCESS');
    getUserList();
  })
  .catch((err) => {
    console.log('-- SERVER -- DELETE_FROM_LIST FAILED', err);
  })
};

/*-------------------------------------------------------
  == TMDB API CALLS ==
--------------------------------------------------------*/
const getGenresListFromApi = (setter) => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
      params: {
        api_key: keys.tmdb_api_key
      }
    })
    .then((result) => {
      console.log('++ SERVER ++ GET GENRESLIST SUCCESS')
      let genresObj = {};
      result.data.genres.forEach((item) => {
        if(!genresObj[item.id]) {
          genresObj[item.id] = item.name
        }
      })
      setter(genresObj);
    })
    .catch((err) => {
      console.log('++ SERVER ++ GET GENRESLIST FAILED', err)
    })
};

const getTrending = (timeWindow, userList, callback1, callback2) => {
  axios.get(`https://api.themoviedb.org/3/trending/movie/${timeWindow}`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((res) => {
    console.log(`++ SERVER ++ GET TRENDING ${timeWindow} SUCESS`);
    return checkIfInList(res.data.results, userList)
  })
  .then((checked) => {
    console.log(`++ SERVER ++ GET TRENDING(CHECKED) SUCCESS`);
    if (timeWindow === 'day') callback1(checked);
    if (timeWindow === 'week') callback2(checked.reverse());
  })
  .catch((err) => {
    console.log(`-- SERVER -- GET TRENDING ${timeWindow} FAILED`, err);
  })
};

const getNowPlaying = (userList, callback) => {
  axios.get(`https://api.themoviedb.org/3/movie/now_playing/`, {
    params: {
      api_key: keys.tmdb_api_key,
      language: "en-US"
    }
  })
  .then((res) => {
    console.log(`++ SERVER ++ GET NOWPLAYING SUCESS`);
    return checkIfInList(res.data.results, userList)
  })
  .then((checked) => {
    console.log(`++ SERVER ++ GET NOWPLAYING(CHECKED) SUCESS`);
    callback(checked);
  })
  .catch((err) => {
    console.log('++ SERVER ++ GET NOWPLAYING FAILED', err);
  })
};

const getMovieDataById = (id, userList, setSelected, alert) => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((res) => {
    console.log(`++ SERVER ++ GET SELECTED_MOVIE_DETAILS SUCESS`);
    return checkIfInList([res.data], userList);
  })
  .then((checked) => {
    console.log(`++ SERVER ++ GET SELECTED_MOVIE_DETAILS(CHECKED) SUCESS`);
    setSelected(prev => [...checked]);
  })
  .catch((err) => {
    console.log(`-- SERVER -- GET SELECTED_MOVIE_DETAILS FAILED`, err);
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
    console.log('++ SERVER ++ GET TOPCASTLIST SUCCESS');
    setCastList(result.data.cast);
    setCrewList(result.data.crew);
    setTopCastList(result.data.cast.slice(0, 20))
  })
  .catch((err) => {
    console.log('-- SERVER -- GET TOPCASTLIST FAILED', err)
  })
};

const getRecommendedList = (movieId, userList, callback) => {
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((res) => {
    console.log(`++ SERVER ++ GET RECOMMENDED_LIST SUCESS`);
    return checkIfInList(res.data.results, userList);
  })
  .then((checked) => {
    console.log('GET RECOMMENDED_LIST(CHECKED) SUCCESS');
    callback(checked);
  })
  .catch((err) => {
    console.log('GET RECOMMENDEDLIST ERROR', err);
  })
};

const getMovieTrailer = (id, setter) => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
    params: {
      api_key: keys.tmdb_api_key
    }
  })
  .then((result) => {
    console.log('++ SERVER ++ GET MOVIE_TRAILER SUCCESS');
    return getOfficialTrailer(result.data.results);
  })
  .then((result) => {
    setter(result);
  })
  .catch((err) => {
    console.log('-- SERVER -- GET MOVIE_TRAILER ERROR', err);
  })
};

/*-------------------------------------------------------
  == KINOPOISK API CALLS ==
--------------------------------------------------------*/
const getMovieImages = (title, date, runtime, callback) => {
  axios({
    method: 'GET',
    url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${title}&page=1`,
    headers: {
      'X-API-KEY': keys.kp_unof_api_key
    }
  })
  .then((result) => {
    console.log('++ SERVER ++ GET IMAGES SUCESS');
    return filterMovie(result.data.films, title, date, runtime);
  })
  .then((movies) => {
    movies.length > 0 ? callback(movies[0]['filmId']) : null
  })
  .catch((err) => {
    console.log('-- SERVER -- GET IMAGES ERROR', err);
  })
};

const getImagesUrls = (id, callback) => {
  axios({
    method: 'get',
    url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`,
    headers: {
      'X-API-KEY': keys.kp_unof_api_key
    }
  })
  .then((result) => {
    console.log('++ SERVER ++ GET IMAGE_URL SUCESS');
    callback(result.data.frames);
  })
  .catch((err) => {
    console.log('-- SERVER -- GET IMAGE_URL FAILED', err);
  })
};

/*-------------------------------------------------------
  == OMDB API CALLS ==
--------------------------------------------------------*/
const getDataFromOMDB = (id, callback) => {
  axios.get(`http://www.omdbapi.com/`, {
    params: {
      i: id,
      apikey: keys.omdb_api_key
    }
  })
  .then((result) => {
    console.log('++ SERVER ++ GET OMDBDATA SUCCESS');
    callback(result.data);
  })
  .catch((err) => {
    console.log('-- SERVER -- GET OMDBDATA FAILED', err)
  })
};

/*-------------------------------------------------------
  == HELPERS ==
--------------------------------------------------------*/
const checkIfInList = (apiList, userList) => {
  let hash = {};
  for (let i = 0; i < userList.length; i++) {
    if (hash[userList[i].id] === undefined) {
      hash[userList[i].id] = true;
    }
  }
  for (let i = 0; i < apiList.length; i++) {
    let movie = apiList[i];
    if (hash[movie.id]) movie.inList = true;
    else movie.inList = false;
  }
  return apiList;
};

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

const getOfficialTrailer = (arr) => {
  if (arr.length <= 1) return arr;
  let regex = /official/gi;
  for (let i = 0; i < arr.length; i++) {
    if (regex.test(arr[i].name)) return [arr[i]];
  }
  return arr;
};

module.exports = {
  getGenresListFromApi,
  getUserListFromServer,
  getTrending,
  getNowPlaying,
  getMovieDataById,

  getCastListFromServer,
  getDataFromOMDB,
  getRecommendedList,
  getMovieTrailer,
  getMovieImages,
  getImagesUrls,

  addToWishList,
  deleteFromWishList
};


// const getMovieListFromServer = (query, pageNum, setTotalPages, setCurrPageNum, setCurrentMovieList, setIsLoading, userList, setWrongInput) => {
//   console.log('QUERY', query)
//   axios.get('https://api.themoviedb.org/3/search/movie', {
//     params: {
//       api_key: keys.tmdb_api_key,
//       query: query,
//       page: pageNum
//     }
//   })
//   .then((result) => {
//     if (result.data.results.length === 0) {
//       setWrongInput(true);
//     } else {
//       setWrongInput(false);
//     }
//     setTotalPages(result.data.total_pages);
//     setCurrPageNum(prev => prev + 1);
//     return result.data.results.filter(movie => movie.release_date ? movie : null)
//   })
//   .then((filtered) => {
//     console.log('GET SUCCESS');
//     console.log('======MOVIE COUNT====== :', filtered.length);
//     setCurrentMovieList(prevState =>[...prevState, ...filtered]);
//     setIsLoading(false)
//   })
//   .catch((err) => {
//     console.log('GET FAILED');
//     console.log(err);
//   })
// };




// // --------------------------------------------------------
// // KINOPOISK API CALLS AND HELPERS
// // --------------------------------------------------------
