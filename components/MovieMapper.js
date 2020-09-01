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
    <ScrollView>{movies}</ScrollView>
  )

};

const styles = StyleSheet.create({
  cont: {
    alignItems: 'center'
  }
})

export default MovieMapper;
