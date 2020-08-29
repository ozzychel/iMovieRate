import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import api_key from './config.js'


export default function App() {
  const [currentSearch, setCurrentSearch] = useState('default')

  const getUserInput = (input) => {
    setCurrentSearch(input)
    getDataFromServer(currentSearch)
  }

  const getDataFromServer = (query) => {
    console.log('QUERY', typeof query)
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key,
        query
      }
    })
    .then((result) => {
      console.log('GET SUCCESS')
      console.log(result.data)
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
      <Text style={{fontSize: 30}}>{currentSearch}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
