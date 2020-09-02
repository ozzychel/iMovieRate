import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from './SearchBar';
import MovieMapper from './MovieMapper';

const SearchTab = ({getUserInput, movieList}) => {
  return (
    <View>
      <SearchBar getUserInput={getUserInput}/>
      <MovieMapper movieList={movieList}/>
    </View>
  )
};

export default SearchTab;