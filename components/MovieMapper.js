import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Movie from './Movie';

const MovieMapper = ({ movieList, getUserSelectedMovie, changeView }) => {
  const movies = [];
  movieList.forEach((movie, i) => {
    movies.push(
      <Movie
        key={i}
        movie={movieList[i]}
        getUserSelectedMovie={getUserSelectedMovie}
        changeView={changeView}
      />
    )
  })

  return (
    <ScrollView style={styles.cont}>{movies}</ScrollView>
  )

};

const styles = StyleSheet.create({
  cont: {
    backgroundColor: 'black'
  }
})

export default MovieMapper;
