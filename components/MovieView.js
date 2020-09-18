import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import keys from '../config.js';
import moment from 'moment';
import InfoBlock from './MovieView_comp/InfoBlock';
import CastBlock from './MovieView_comp/CastBlock';
import RatingsBlock from './MovieView_comp/RatingsBlock';

const MovieView = ({ selectedMovie, genresList }) => {
  const movie_tmdb = selectedMovie[0];
  const [castList, setCastList] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [topCastList, setTopCastList] = useState([]);
  const [movie_omdb, setMovie_omdb] = useState({});


  useEffect(() => {
    getCastListFromServer(movie_tmdb.id)
  }, []);

  useEffect(() => {
    getDataFromOMDB(movie_tmdb.imdb_id)
  }, [])

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
  }

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
    // TITLE
    // DESCription BLOCK
    // ADD TO WATCHLIST

    // RATINGS BLOCK
          ///Create renderImage helper function
    // CAST ACTORS
    // NEWS, UPDATES....
    // VIDEOS
    // IMAGES
    // AWARDS
    // REVIEWS
    <ScrollView contentContainerStyle={styles.tab_cont}>

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
        <TouchableOpacity>
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

    </ScrollView>
  )
};

const styles = StyleSheet.create({
  tab_cont: {
    // height: 2000,
    backgroundColor: '#131313',
    paddingBottom: 150
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
  },
});

export default MovieView;