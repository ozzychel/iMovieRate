import axios from 'axios';
import keys from '../../mock_config';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

const server = axios.create({
  baseURL: 'http://localhost:9000'
});

const omdb = axios.create({
  baseURL: 'http://www.omdbapi.com'
});

/*-------------------------------------------------------
  == CUSTOM SERVER API CALLS, DB MANIPULATION ==
--------------------------------------------------------*/

const getUserList = async () => {
  try{
    const response = await server.get(`/users/${keys.userId}`)
    return response.data.wish_list;
  } catch (err) {
    console.log('Error: in getUserList', err);
    return Promise.resolve([]);
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
/*-------------------------------------------------------
  == TMDB API CALLS ==
--------------------------------------------------------*/
const getGenresList = async () => {
  try{
    const response = await tmdb.get(`/genre/movie/list`, {
      params: { api_key: keys.tmdb_api_key }
    })
    let genresObj = {};
    response.data.genres.forEach((item) => {
      if(!genresObj[item.id]) {
        genresObj[item.id] = item.name
      }
    })
    return genresObj;
  } catch (err) {
    console.log('Error: in getGenresList', err);
  }
};

const getTrending = async (timeWindow, userList) => {
  try {
    let res = await tmdb.get(`/trending/movie/${timeWindow}`, {
      params: { api_key: keys.tmdb_api_key }
    });
    const checked = await checkIfInList(res.data.results, userList);
    if(timeWindow === 'day') return checked;
    else return checked.reverse();
  } catch (err) {
    console.log('Error: in getTrending', err);
  }
};

const getNowPlaying = async (userList) => {
  try{
    let res = await tmdb.get(`/movie/now_playing/`, {
      params: { api_key: keys.tmdb_api_key, language: "en-US" }
    })
    const checked = await checkIfInList(res.data.results, userList);
    return checked;
  } catch (err) {
    console.log('Error: in getNowPlaying', err);
  }
};

const getMovieDataById = async (id, userList) => {
  try{
    const res = await tmdb.get(`/movie/${id}`, {
      params: { api_key: keys.tmdb_api_key }
    });
    const checked = checkIfInList([res.data], userList);
    return checked;
  } catch (err) {
    console.log('Error: in getMovieDataById', err);
  }
};

const getMovieList = async (query, num, userList) => {
  try{
    let res = await tmdb.get('/search/movie', {
      params: {
        api_key: keys.tmdb_api_key,
        query: query,
        page: num
      }
    });
    const total = res.data.total_pages;
    const filtered = await res.data.results.filter(movie => movie.release_date ? movie : null);
    const checked = await checkIfInList(filtered, userList);
    return [total, checked];
  } catch (err) {
    console.log('Error: in getMovieList', err);
  }
};

const getCastListFromServer = async (movieId) => {
  try{
    const res = await tmdb.get(`/movie/${movieId}/credits`, {
      params: { api_key: keys.tmdb_api_key }
    });
    return [res.data.cast, res.data.crew, res.data.cast.slice(0, 20)];
  } catch (err) {
    console.log('Error: in getCastListFromServer', err);
  }
};

const getRecommendedList = async (movieId, userList) => {
    try{
      const res = await tmdb.get(`/movie/${movieId}/recommendations`, {
        params: { api_key: keys.tmdb_api_key }
      });
      const checked = checkIfInList(res.data.results, userList);
      return checked;
    } catch (err) {
      console.log('Error: in getRecommendedList', err);
    }
};

const getMovieTrailer = async (id) => {
  try{
    const res = await tmdb.get(`/movie/${id}/videos`, {
      params: { api_key: keys.tmdb_api_key }
    });
    const official = await getOfficialTrailer(res.data.results);
    return official;
  } catch (err) {
    console.log('Error: in getMovieTrailer', err);
  }
};

/*-------------------------------------------------------
  == KINOPOISK API CALLS ==
--------------------------------------------------------*/
const getMovieImages = async (title, date, runtime) => {
  try{
    const res = await axios({
      method: 'GET',
      url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${title}&page=1`,
      headers: {
        'X-API-KEY': keys.kp_unof_api_key
      }
    })
    console.log('res1 length:', res.data.films.length)
    const filtered = await filterMovie(res.data.films, title, date, runtime)
    return filtered.length > 0 ? filtered[0]['filmId'] : null
  } catch (err) {
    console.log('Error: in getMovieImages:', err)
  }
};

const getImagesUrls = async (id) => {
  try{
    if(id !== null) {
      let res = await axios({
        method: 'get',
        url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`,
        headers: {
          'X-API-KEY': keys.kp_unof_api_key
        }
      });
      console.log('res2 length:', Object.keys(res.data).length)
      return res.data.frames;
    } else { return []}
  } catch (err) {
    console.log('Error: in getImagesUrls', err);
    return [];
  }
}

/*-------------------------------------------------------
  == OMDB API CALLS ==
--------------------------------------------------------*/
const getDataFromOMDB = async (id) => {
  try{
    const res = await omdb.get(`/`, {
      params: { i: id, apikey: keys.omdb_api_key }
    })
    return res.data;
  } catch (err) {
    console.log('Error: in getDataFromOMDB', err);
  }
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
  getImagesUrls
};