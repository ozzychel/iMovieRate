import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import api_key from './config.js';
import MovieMapper from './components/MovieMapper';


export default function App() {
  const [currentSearch, setCurrentSearch] = useState('')

  const [currentMovieList, setCurrentMovieList] = useState([])

  const getUserInput = (input) => {
    setCurrentSearch(input)
  }

  useEffect(() => {
    if(currentSearch) {
      getDataFromServer(currentSearch)
    }
  }, [currentSearch])

  const getDataFromServer = (query) => {
    console.log('QUERY', query)
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key,
        query
      }
    })
    .then((result) => {
      console.log('GET SUCCESS')
      console.log(result.data.results)
      setCurrentMovieList(result.data.results)
    })
    .catch((err) => {
      console.log('GET FAILED')
      console.log(err)
    })
  }

  return (


    <View style={styles.container}>
      <NavBar />
      <SearchBar getUserInput={getUserInput}/>
      <MovieMapper movieList={currentMovieList}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {

  },
});
