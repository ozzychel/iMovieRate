import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import keys from '../config.js';
import moment from 'moment';
import InfoBlock from './MovieView_comp/InfoBlock';
import CastBlock from './MovieView_comp/CastBlock';
import RatingsBlock from './MovieView_comp/RatingsBlock';
import RecommendedBlock from './MovieView_comp/RecommendedBlock';
import PictureCarousel from './MovieView_comp/PictureCarousel';
import ImagesBlock from './MovieView_comp/ImagesBlock';

const MovieView = ({ selectedMovie, genresList, getUserSelectedMovie }) => {
  const movie_tmdb = selectedMovie[0];
  const [castList, setCastList] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [topCastList, setTopCastList] = useState([]);
  const [movie_omdb, setMovie_omdb] = useState({});
  const [recommendedList, setRecommendedList] = useState([]);
  const [imageUrls, setImageUrls] = useState([])

  const mockUser = 111;

  useEffect(() => {
    getCastListFromServer(movie_tmdb.id)
  }, [movie_tmdb]);

  useEffect(() => {
    getDataFromOMDB(movie_tmdb.imdb_id)
  }, [movie_tmdb]);

  useEffect(() => {
    getRecommendedList(movie_tmdb.id)
  }, [movie_tmdb]);

  useEffect(() => {
    getMovieImages(movie_tmdb.title, movie_tmdb.release_date.slice(0,4))
  }, [movie_tmdb]);

  const getMovieImages = (title, date) => {
    console.log('KP QUERY', title, date)
    axios({
      method: 'get',
      url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${title} ${date}&page=1`,
      headers: {
        'X-API-KEY': keys.kp_unof_api_key
      }
    })
    .then((result) => {
      return result.data.films.filter((movie) => {
        return movie.nameEn.toLowerCase().split(' ').join('') === title.toLowerCase().split(' ').join('') && movie.year === date.toString();
      })
    })
    .then((movie) => {
      console.log('FILTERED KINOPOISK OBJ:', movie);
      getImagesUrls(movie[0]['filmId']);
    })
    .catch((err) => {
      console.log('KP GET ERROR', err)
    })
  }

  const getImagesUrls = (id) => {
    console.log('URL ID', id)
    axios({
      method: 'get',
      url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`,
      headers: {
        'X-API-KEY': keys.kp_unof_api_key
      }
    })
    .then((result) => {
      console.log(result.data.frames)
      setImageUrls(result.data.frames)
    })
  }

  const getDataFromOMDB = (id) => {
    axios.get(`http://www.omdbapi.com/`, {
      params: {
        i: id,
        apikey: keys.omdb_api_key
      }
    })
    .then((result) => {
      console.log('OMDB GET SUCCESS');
      setMovie_omdb(result.data);
    })
    .catch((err) => {
      console.log('OMDB GETT ERROR', err)
    })
  }

  const getCastListFromServer = (movieId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      params: {
        api_key: keys.tmdb_api_key
      }
    })
    .then((result) => {
      console.log('CREDITS GET SUCCESS');
      setCastList(result.data.cast);
      setCrewList(result.data.crew);
      setTopCastList(result.data.cast.slice(0, 20))
    })
    .catch((err) => {
      console.log('CAST GET ERROR', err)
    })
  };

  const getRecommendedList = (movieId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
      params: {
        api_key: keys.tmdb_api_key
      }
    })
    .then((result) => {
      // console.log('RECOMM GET SUCCESS', result.data.results);
      console.log('GET RECOMM INVOKED')
      setRecommendedList(result.data.results);
    })
    .catch((err) => {
      console.log('RECOMM GET ERROR', err);
    })
  };

  const runtime = moment.utc(moment.duration(movie_tmdb.runtime, "minutes").asMilliseconds()).format(`H:mm`);

  const genres = [];
  movie_tmdb.genres.forEach((obj) => {
    genres.push(genresList[obj.id]);
  });

  const Separator = () => (
    <View style={styles.separator} />
  );

  return (
    // PICTURE CAROUSEL
    // NEWS, UPDATES....
    // VIDEOS
    // IMAGES
    // AWARDS
    // REVIEWS
    <ScrollView
      contentContainerStyle={styles.tab_cont}
    >

      <PictureCarousel
        movie_title={movie_tmdb.title}
        release_date={movie_tmdb.release_date}
      />

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

      <View style={styles.addWatchList_cont}>
        <TouchableOpacity
          onPress={()=>{
            axios.post(`http://localhost:9000/users/${mockUser}`, {
                movieId: movie_tmdb.id,
            })
            .then((result) => {
              console.log('POST SUCCESS', result.status);
            })
            .catch((err) => {
              console.log('POST FAILED', err);
            })
          }}
        >
          <View style={styles.addButton_cont}>
            <View style={styles.addButton_icon_cont}>
              <Text style={styles.addButton_icon_text}>+</Text>
            </View>
            <View style={styles.addButton_text_cont}>
              <Text style={styles.addButton_text}>ADD TO WATCHLIST</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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

      <RecommendedBlock
        recommendedList={recommendedList}
        getUserSelectedMovie={getUserSelectedMovie}
      />

      <ImagesBlock
        movie_title={movie_tmdb.title}
        release_date={movie_tmdb.release_date}
        imageUrls={imageUrls}
        Separator={Separator}
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