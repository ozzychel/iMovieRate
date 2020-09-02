import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Movie from './Movie';

const MovieMapper = ({ movieList }) => {
  const movies = [];
  movieList.forEach((movie, i) => {
    movies.push(
      <Movie movie={movieList[i]} key={i}/>
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
