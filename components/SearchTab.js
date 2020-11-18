import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MovieMapper from './MovieMapper';

const SearchTab = ({ getUserInput, movieList, getUserSelectedMovie, genresList, getMoreMovies, totalPages, currentPage, setCurrPageNum, setModalVisible, isLoading, currentTab }) => {
  return movieList.length > 0 ? (
    <View>
      <MovieMapper
        movieList={movieList}
        getUserSelectedMovie={getUserSelectedMovie}
        genresList={genresList}
        getMoreMovies={getMoreMovies}
        totalPages={totalPages}
        currentPage={currentPage}
        currentTab={currentTab}
      />
    </View>
  )
  :
  isLoading ?
  (
    <View style={{backgroundColor: '#1f1f1f', height: '100%', paddingTop:250}}></View>
  )
  : (<View>{setModalVisible(true)}</View>)
};

export default SearchTab;