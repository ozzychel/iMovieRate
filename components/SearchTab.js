import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from './SearchBar';
import MovieMapper from './MovieMapper';

const SearchTab = ({getUserInput, movieList, getUserSelectedMovie, genresList}) => {
  return (
    <View>
      {movieList.length > 0
      ?
      <MovieMapper
        movieList={movieList}
        getUserSelectedMovie={getUserSelectedMovie}
        genresList={genresList}
      />
      :
      <View style={{backgroundColor: '#1f1f1f', height: '100%'}}/>}
    </View>
  )
};

export default SearchTab;