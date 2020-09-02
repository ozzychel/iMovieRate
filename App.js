import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import api_key from './config.js';
import MovieMapper from './components/MovieMapper';
import Constants from "expo-constants";
import MainCarousel from './components/MainCarousel';

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

  const renderStatusBar = (OS) => {
    if (OS === 'ios') {
      return (
        <View style={styles.iosBar}></View>
      )
    }
    if (OS === 'android') {
      return (
        <View style={styles.androidBar}></View>
      )
    }
  }

  return (

    <View style={styles.container}>
      {renderStatusBar(Platform.OS)}
      <StatusBar barStyle='light-content'/>
      {/* <View style={styles.bar}></View> */}
      <NavBar />
      <MainCarousel
        style="slides"
        itemsPerInterval={1}
        items={[{title: 'HOME'}, {title: 'MOVIES'}, {title: 'TV SHOWS'}, {title: 'CELEBS'}, {title: 'AWARDS & EVENTS'}]}
          />
      <SearchBar getUserInput={getUserInput}/>
      <MovieMapper movieList={currentMovieList}/>

    </View>

  );
}

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {

  },
  iosBar: {
    backgroundColor: 'black',
    height: 40
  },
  androidBar: {
    backgroundColor: 'purple',
    height: 0
  }
});
