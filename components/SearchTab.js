import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from './SearchBar';
import MovieMapper from './MovieMapper';

const SearchTab = ({getUserInput, movieList, getUserSelectedMovie, genresList}) => {
  return (
    <View>
      <SearchBar getUserInput={getUserInput}/>
      <MovieMapper
        movieList={movieList}
        getUserSelectedMovie={getUserSelectedMovie}
        genresList={genresList}
        />
    </View>
  )
};

export default SearchTab;