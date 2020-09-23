import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Movie from './Movie';

const MovieMapper = ({ movieList, getUserSelectedMovie, genresList, getMoreMovies, totalPages }) => {
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

  const renderLoadMoreBtn = (qty) => {
    return qty === 1 ? null :
      (<TouchableOpacity
          onPress={ () => {
            getMoreMovies()
          }}>
          <View style={styles.load_more_cont}>
            <Text style={styles.load_more_text}>Load more...</Text>
          </View>
        </TouchableOpacity>)
  }


  return (
      <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
        {movies}
        {renderLoadMoreBtn(totalPages)}
        </ScrollView>
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
  },
  load_more_cont: {
    height: 60,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  load_more_text: {
    color: '#737373',
    fontSize: 18,
    fontWeight: '600'
  }
})

export default MovieMapper;
