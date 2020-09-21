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
      <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >{movies}</ScrollView>
        <View style={Platform.OS === 'ios' ? {height:300} : {height:200}}></View>
      </View>
  )
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#131313',

  },
  scrollWrapper: {
    height: '100%',
    backgroundColor:'#1f1f1f',
    paddingBottom: 'auto'
  }
})

export default MovieMapper;
