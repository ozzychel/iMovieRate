import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView } from 'react-native';
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

  const [selectedMovieDetails, setSelectedMovieDetails] = useState([]);

  const [currentTab, setCurrentTab] = useState('SEARCH');// <--

  const getUserSelectedMovie = (id) => {
    getMovieDataById(id)
  }

  const getUserInput = (input) => {
    setCurrentSearch(input)
  };

  // useEffect(() => {
  //   if (currentSearch) {
  //     getDataListFromServer(currentSearch)
  //   }
  // }, [currentSearch]);

  // useEffect(() => {
    // if (selectedMovieDetails.length > 0) {
    //   console.log('UE sel mov det WORKS')
    //   changeView('MOVIE VIEW')
    // }
  // }, [selectedMovieDetails])

  useEffect(() => {
    if (currentSearch) {
      getDataListFromServer(currentSearch)
    }
    if (selectedMovieDetails.length > 0) {
      console.log('UE sel mov det WORKS')
      changeView('MOVIE VIEW')
    }
  }, [currentSearch, selectedMovieDetails])

  const getDataListFromServer = (query) => {
    console.log('QUERY', query)
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key,
        query
      }
    })
    .then((result) => {
      console.log('GET SUCCESS');
      console.log(result.data.results);
      setCurrentMovieList(result.data.results);
    })
    .catch((err) => {
      console.log('GET FAILED');
      console.log(err);
    })
  };

  const getMovieDataById = (id) => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key
      }
    })
    .then((result) => {
      console.log('++++++++++++ MOVIE DETAILS SUCCESS', result.data)
      setSelectedMovieDetails(prevState => [result.data])
    })
    .catch((err) => {
     console.log('------------ MOVIE DETAILS FAILED', err)
    })
};

  const changeView = (source) => {
    setCurrentTab(source);
  };

  const renderStatusBar = (OS) => {
    if (OS === 'ios') {
      return (<View style={styles.iosBar}></View>);
    }
    if (OS === 'android') {
      return (<View style={styles.androidBar}></View>);
    }
  };

  const renderView = (view) => {
    if (view === 'SEARCH') {
      return (
        <SearchTab
          getUserInput={getUserInput}
          movieList={currentMovieList}
          getUserSelectedMovie={getUserSelectedMovie}
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
        selectedMovie={selectedMovieDetails}
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
        handleTabPress={changeView}
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
