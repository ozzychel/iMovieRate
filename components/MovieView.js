import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import keys from '../config.js';
import moment from 'moment';
import InfoBlock from './MovieView_comp/InfoBlock';
import CastBlock from './MovieView_comp/CastBlock';
import RatingsBlock from './MovieView_comp/RatingsBlock';
import MovieCarousel from './helperFunctions/MovieCarousel'
import ImagesBlock from './MovieView_comp/ImagesBlock';
import TrailerBlock from './MovieView_comp/TrailerBlock';
import AddToListButtonBlock from './MovieView_comp/AddToListButtonBlock';
const api = require('./helperFunctions/serverRequests');

const MovieView = ({ selectedMovie, genresList, userList, addToList, getSelectedMovie, changeView }) => {

  const scroll = React.createRef();

  const movie_tmdb = selectedMovie[0];
  const [topCastList, setTopCastList] = useState([]);
  const [movie_omdb, setMovie_omdb] = useState({});
  const [recommendedList, setRecommendedList] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [castList, setCastList] = useState([]);
  const [crewList, setCrewList] = useState([]);

  useEffect(() => {
    scroll.current.scrollTo({y:0, animated:true})
  }, [movie_tmdb])

  useEffect(() => {
    getCastListFromServer(movie_tmdb.id);
    getDataFromOMDB(movie_tmdb.imdb_id);
    getRecommendedList(movie_tmdb.id)
    getMovieTrailer(movie_tmdb.id);
    getMovieImages(movie_tmdb.title, movie_tmdb.release_date.slice(0,4), movie_tmdb.runtime);
  }, [movie_tmdb]);

  const getCastListFromServer = (movieId) => {
    api.getCastListFromServer(movieId, setCastList, setCrewList, setTopCastList);
  };

  const getDataFromOMDB = (id) => {
    api.getDataFromOMDB(id, setMovie_omdb);
  };

  const getRecommendedList = (movieId) => {
    api.getRecommendedList(movieId, userList, setRecommendedList);
  };

  const getMovieTrailer = (id) => {
    api.getMovieTrailer(id, setMovieTrailer);
  };

  const getMovieImages = (title, date, runtime) => {
    api.getMovieImages(title, date, runtime, getImagesUrls)
  };

  const getImagesUrls = (id) => {
    api.getImagesUrls(id, setImageUrls);
  };

  // LOGS
  console.log('== MV LOG == TOPCASTLIST LENGTH:', topCastList.length);
  console.log('== MV LOG == RECOMMENDED_LIST LENGTH:', recommendedList.length);
  console.log('== MV LOG == MOVIETRAILER LENGTH:', movieTrailer.length);
  console.log('== MV LOG == IMAGE_URLS LENGTH:', imageUrls.length);
  // -----

  const runtime = moment.utc(moment.duration(movie_tmdb.runtime, "minutes").asMilliseconds()).format(`H:mm`);

  const genres = [];
  if (!genres.length && movie_tmdb.genres.length) {
    movie_tmdb.genres.forEach((obj) => {
      genres.push(genresList[obj.id]);
    });
  };

  const Separator = () => (
    <View style={styles.separator} />
  );

  return (
    <ScrollView
      contentContainerStyle={styles.tab_cont}
      showsVerticalScrollIndicator={false}
      ref={scroll}
    >
      <View style={styles.title_cont}>
        <View>
          <Text style={styles.title_text}>
            {movie_tmdb.title}
          </Text>
        </View>
        <View style={styles.year_duration_cont}>
          <Text style={styles.year_duration_text}>
            {movie_tmdb.release_date.slice(0,4)}
          </Text>
          <Text style={styles.year_duration_text}>
            {movie_omdb['Rated']}
          </Text>
          <Text style={styles.year_duration_text}>
            {runtime + 'h'}
          </Text>
        </View>
      </View>
      <Separator/>

      <InfoBlock
        movie_tmdb={movie_tmdb}
        genres={genres}
        Separator={Separator}
      />

      <AddToListButtonBlock
        addToList={addToList}
        movie_tmdb={movie_tmdb}
      />
      <Separator />

      <RatingsBlock
        Separator={Separator}
        movie_omdb={movie_omdb}
      />

      <CastBlock
        Separator={Separator}
        topCastList={topCastList}
        movie_omdb={movie_omdb}
      />

      <TrailerBlock
        movieTrailer={movieTrailer}
      />

      <MovieCarousel
        movieList={recommendedList}
        getSelectedMovie={getSelectedMovie}
        carouselHeader="Similar Movies"
        changeView={changeView}
      />

      <ImagesBlock
        movie_title={movie_tmdb.title}
        release_date={movie_tmdb.release_date}
        imageUrls={imageUrls}
      />

    </ScrollView>
  )
};

const styles = StyleSheet.create({
  tab_cont: {
    backgroundColor: '#131313',
    paddingBottom: 10
  },
  separator: {
    marginVertical: 0.05,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title_cont: {
    backgroundColor: '#1f1f1f',
    maxHeight: 150
  },
  title_text: {
    fontSize: 34,
    color: 'white',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  year_duration_cont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 7
  },
  year_duration_text: {
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#737373'
  },
  addWatchList_cont: {
    backgroundColor: '#1f1f1f',
    padding: 12
  },
  addButton_cont: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#313131',
    borderRadius: 5

  },
  addButton_icon_cont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 7,
  },
  addButton_icon_text: {
    color: 'white',
    fontSize: 22
  },
  addButton_text_cont: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 7,
  },
  addButton_text: {
    paddingTop: 2,
    color: 'white',
    fontSize: 14
  },
  ratings_cont: {
    backgroundColor: '#1f1f1f',
    height: 50
  }
});

export default MovieView;


// const getImagesUrls = (id) => {
  //   console.log('URL ID', id)
  //   axios({
  //     method: 'get',
  //     url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`,
  //     headers: {
  //       'X-API-KEY': keys.kp_unof_api_key
  //     }
  //   })
  //   .then((result) => {
  //     setImageUrls(result.data.frames)
  //   })
  // };

  // const getMovieImages = (title, date, runtime) => {
  //   console.log('KP QUERY INVOKED! QUERY: ', title, date)
  //   axios({
  //     method: 'get',
  //     url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${title}&page=1`,
  //     headers: {
  //       'X-API-KEY': keys.kp_unof_api_key
  //     }
  //   })
  //   .then((result) => {
  //     return filterMovie(result.data.films, title, date, runtime)
  //   })
  //   .then((movies) => {
  //     // console.log('FILTERED KINOPOISK OBJ:', movies);
  //     movies.length > 0 ? getImagesUrls(movies[0]['filmId']):null
  //   })
  //   .catch((err) => {
  //     console.log('KP GET ERROR', err)
  //   })
  // }

  // const getRecommendedList = (movieId) => {
  //   axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
  //     params: {
  //       api_key: keys.tmdb_api_key
  //     }
  //   })
  //   .then((result) => {
  //     console.log('GET RECOMM INVOKED')
  //     setRecommendedList(result.data.results);
  //   })
  //   .catch((err) => {
  //     console.log('RECOMM GET ERROR', err);
  //   })
  // };

  // const getCastListFromServer = (movieId) => {
  //   axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
  //     params: {
  //       api_key: keys.tmdb_api_key
  //     }
  //   })
  //   .then((result) => {
  //     console.log('CREDITS GET SUCCESS');
  //     setCastList(result.data.cast);
  //     setCrewList(result.data.crew);
  //     setTopCastList(result.data.cast.slice(0, 20))
  //   })
  //   .catch((err) => {
  //     console.log('CAST GET ERROR', err)
  //   })
  // };

  // const getDataFromOMDB = (id) => {
  //   axios.get(`http://www.omdbapi.com/`, {
  //     params: {
  //       i: id,
  //       apikey: keys.omdb_api_key
  //     }
  //   })
  //   .then((result) => {
  //     console.log('OMDB GET SUCCESS');
  //     setMovie_omdb(result.data);
  //   })
  //   .catch((err) => {
  //     console.log('OMDB GETT ERROR', err)
  //   })
  // }

  // const filterMovie = (arr, title, date, runtime) => {
  //   let results = [];
  //   const compareLength = (kp_leng, tmdb_leng) => {
  //     let arr = kp_leng.split(':');
  //     let h = arr[0], mm = arr[1];
  //     let kp_num = parseInt(h) * 60 + parseInt(mm);
  //     if (tmdb_leng * 0.9 <= kp_num || tmdb_leng * 1.1 >= kp_num) return true;
  //     else return false;
  //   };
  //   for (let i = 0; i < arr.length; i++) {
  //     let movie = arr[i];
  //     if (movie.nameEn.split(' ').join('').toLowerCase() === title.split(' ').join('').toLowerCase()) {
  //       if (movie.year == date) return [movie];
  //       else results.push(movie);
  //     }
  //     if (movie.year == date) results.push(movie)
  //   }
  //   if (results.length === 1) return results;
  //   for(let i = 0; i < results.length; i++) {
  //     if(compareLength(results[i].filmLength, runtime)) return [results[i]]
  //   }
  //   return results;
  // };
