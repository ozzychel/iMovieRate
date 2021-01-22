import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
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
    getCastListFromServer(movie_tmdb.id);
    getDataFromOMDB(movie_tmdb.imdb_id);
    getRecommendedList(movie_tmdb.id);
    getMovieTrailer(movie_tmdb.id);
    getMovieImages(movie_tmdb.title, movie_tmdb.release_date.slice(0,4), movie_tmdb.runtime, movie_tmdb.id);
    scroll.current.scrollTo({y:0, animated:true});
  }, [movie_tmdb]);

  const getCastListFromServer = async (movieId) => {
    // console.log('!!! MV.getCastList() invoked');
    const [allCast, crewCast, topCast] = await api.getCastListFromServer(movieId);
    setCastList(allCast);
    setCrewList(crewCast);
    setTopCastList(topCast)
  };

  const getDataFromOMDB = async (id) => {
    // console.log('!!! MV.getDataFromOMBD() invoked');
    const omdb = await api.getDataFromOMDB(id);
    console.log('OMDB LOG', omdb)
    setMovie_omdb(omdb);
  };

  const getRecommendedList = async (movieId) => {
    // console.log('!!! MV.getRecommendedList() invoked');
    const recommended = await api.getRecommendedList(movieId, userList);
    setRecommendedList(recommended);
  };

  const getMovieTrailer = async (id) => {
    // console.log('!!! MV.getMovieTrailer() invoked');
    const trailer = await api.getMovieTrailer(id);
    setMovieTrailer(trailer);
  };

  const getMovieImages = async (title, date, runtime, id) => {
    // console.log('!!! MV.getMovieImages() invoked');
    const urls = await api.getMovieImages(title, date, runtime, id);
    setImageUrls(urls);
  };

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

  // LOGS
  // console.log('== MV LOG == TOPCASTLIST LENGTH:', topCastList.length);
  // console.log('== MV LOG == RECOMMENDED_LIST LENGTH:', recommendedList.length);
  // console.log('== MV LOG == MOVIETRAILER LENGTH:', movieTrailer.length);
  // console.log('== MV LOG == IMAGE_URLS LENGTH:', imageUrls.length);
  // -----

  return (
    <ScrollView
      contentContainerStyle={styles.tab_cont}
      showsVerticalScrollIndicator={false}
      testID='scroll_view'
      ref={scroll}
    >
      <View style={styles.title_cont}>
        <View>
          <Text style={styles.title_text} testID="movie_title">
            {movie_tmdb.title}
          </Text>
        </View>
        <View style={styles.year_duration_cont}>
          <Text style={styles.year_duration_text} testID='movie_year'>
            {movie_tmdb.release_date.slice(0,4)}
          </Text>
          <Text style={styles.year_duration_text} testID='movie_rating'>
            {movie_omdb['Rated']}
          </Text>
          <Text style={styles.year_duration_text} testID='movie_duration'>
            {runtime + 'h'}
          </Text>
        </View>
      </View>
      <Separator/>

      <InfoBlock
        movie_tmdb={movie_tmdb}
        genres={genres}
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