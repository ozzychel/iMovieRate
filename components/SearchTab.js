import React from 'react';
import { View, Text } from 'react-native';
import MovieMapper from './MovieMapper';

const SearchTab = ({getUserInput, movieList, getUserSelectedMovie, genresList, getMoreMovies, totalPages}) => {
  return (
    <View>
      {movieList.length > 0
      ?
      <MovieMapper
        movieList={movieList}
        getUserSelectedMovie={getUserSelectedMovie}
        genresList={genresList}
        getMoreMovies={getMoreMovies}
        totalPages={totalPages}
      />
      :
      <View style={{backgroundColor: '#1f1f1f', height: '100%', paddingTop:250}}/>}
    </View>
  )
};

export default SearchTab;