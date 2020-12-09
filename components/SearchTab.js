import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MovieMapper from './MovieMapper';

const SearchTab = ({ getUserInput, movieList, getUserSelectedMovie, genresList, getMoreMovies, totalPages, currentPage, setCurrPageNum, setModalVisible, isLoading, currentTab, wrongInput }) => {
  if (wrongInput) {
    return (
      <View style={styles.msg_cont}>
        <Text style={styles.msg_cont_text}>No data available on your request! Check your input!</Text>
      </View>
      )
  } else {
    if (movieList.length > 0) {
      return (
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
    } else if (isLoading) {
      return (<View style={styles.back}></View>)
    } else {
      return (<View>{setModalVisible(true)}</View>)
    }
  }
};

const styles = StyleSheet.create({
  msg_cont: {
    borderWidth: 2,
    borderColor: '#1e1e1e',
    marginTop: 5,
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 8
  },
  msg_cont_text: {
    color:'white',
    textAlign: 'center',
    fontSize: 16
  },
  back: {
    backgroundColor: '#1f1f1f',
    height: '100%',
    paddingTop:250
  }
})

export default SearchTab;