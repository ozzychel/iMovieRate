import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
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

  let scrollHeight = movies.length * 150
  console.log('LENGTH', movies.length)
  console.log('SCROLLHEIGHT', scrollHeight)

  return (
      <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >{movies}</ScrollView>
      </View>
  )

};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
    backgroundColor: '#131313',
    paddingBottom: 600
  },
  scrollWrapper: {
    height: '100%',
    backgroundColor:'#1f1f1f',
  }
})

export default MovieMapper;
