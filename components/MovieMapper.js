import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Movie from './Movie';

const MovieMapper = ({ movieList, getUserSelectedMovie, genresList }) => {
  const movies = [];
  movieList.forEach((movie, i) => {
    movies.push(
      <Movie
        key={i}
        movie={movieList[i]}
        getUserSelectedMovie={getUserSelectedMovie}
        genresList={genresList}
      />
    )
  })

  return (
    <ScrollView style={styles.cont}>{movies}</ScrollView>
  )

};

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#131313'
  }
})

export default MovieMapper;
