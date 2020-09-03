import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import NavBar from './components/NavBar';
import axios from 'axios';
import api_key from './config.js';
import Constants from "expo-constants";
import MainCarousel from './components/MainCarousel';
import SearchTab from './components/SearchTab';
import MovieView from './components/MovieView';

export default function App() {
  const [currentSearch, setCurrentSearch] = useState('');

  const [currentMovieList, setCurrentMovieList] = useState([]);

  const [currentTab, setCurrentTab] = useState('SEARCH');// <--

  const [selectedMovieId, setSelectedMovieId] = useState('');

  const getUserSelectedMovie = (id) => {
    setSelectedMovieId(id)
  }

  const getUserInput = (input) => {
    setCurrentSearch(input)
  };

  useEffect(() => {
    if(currentSearch) {
      getDataFromServer(currentSearch)
    }
  }, [currentSearch]);

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

  const handleTabPress = (title) => {
    setCurrentTab(title)
  }

  const changeView = (source) => {
    setCurrentTab(source)
  }

  const renderStatusBar = (OS) => {
    if (OS === 'ios') {
      return (<View style={styles.iosBar}></View>)
    }
    if (OS === 'android') {
      return (<View style={styles.androidBar}></View>)
    }
  };

  const renderView = (view) => {
    if (view === 'SEARCH') {
      return (
        <SearchTab
          getUserInput={getUserInput}
          movieList={currentMovieList}
          getUserSelectedMovie={getUserSelectedMovie}
          changeView={changeView}
        />
      )
    }
    if (view === 'HOME' || !view) {
      return (<Text>HOME SCREEN</Text>)
    }
    if (view === 'MOVIES') {
      return (<Text>MOVIES SCREEN</Text>)
    }
    if (view === 'TV SHOWS') {
      return (<Text>TV SHOWS SCREEN</Text>)
    }
    if (view === 'CELEBS') {
      return (<Text>CELEBS SCREEN</Text>)
    }
    if (view === 'AWARDS & EVENTS') {
      return (<Text>AWARDS SCREEN</Text>)
    }
    if (view === 'MOVIE VIEW') {
      return (<MovieView
        selectedMovieId={selectedMovieId}
      />)
    }
  }

  return (

    <View style={styles.container}>
      {renderStatusBar(Platform.OS)}
      <StatusBar barStyle='light-content'/>
      <NavBar />
      <MainCarousel
        style="slides"
        itemsPerInterval={1}
        items={[
          {title: 'HOME'},
          {title: 'MOVIES'},
          {title: 'TV SHOWS'},
          {title: 'CELEBS'},
          {title: 'AWARDS & EVENTS'},
          {title: 'SEARCH'}
        ]
        }
        active={currentTab}
        handleTabPress={handleTabPress}
      />
      {renderView(currentTab)}
    </View>
  );
};

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
