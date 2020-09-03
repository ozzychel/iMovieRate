import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from './SearchBar';
import MovieMapper from './MovieMapper';

const SearchTab = ({getUserInput, movieList, getUserSelectedMovie}) => {
  return (
    <View>
      <SearchBar getUserInput={getUserInput}/>
      <MovieMapper
        movieList={movieList}
        getUserSelectedMovie={getUserSelectedMovie}
        />
    </View>
  )
};

export default SearchTab;