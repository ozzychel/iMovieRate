import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, Modal, Alert, TouchableOpacity, Dimensions } from 'react-native';
import NavBar from './components/NavBar';
import axios from 'axios';
import keys from './config.js';
import Constants from "expo-constants";
import MainCarousel from './components/MainCarousel';
import SearchTab from './components/SearchTab';
import HomeTab from './components/HomeTab';
import SearchBar from './components/SearchBar';
import MovieView from './components/MovieView';

export default function App() {

  const [currentSearch, setCurrentSearch] = useState('');

  const [currentMovieList, setCurrentMovieList] = useState([]);

  const [selectedMovieDetails, setSelectedMovieDetails] = useState([]);

  const [genresList, setGenresList] = useState({});

  const [currentTab, setCurrentTab] = useState('HOME');// <--

  const [modalVisible, setModalVisible] = useState(false);

  const [currPageNum, setCurrPageNum] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const getUserSelectedMovie = (id) => {
    console.log('SELECTED ID', id);
    getMovieDataById(id);
  }

  const getUserInput = async (input) => {
    let wait = await initSearchDefault();
    setCurrentSearch(input);
  };

  useEffect(() => {
    getGenresListFromApi()
  }, [])

  useEffect(() => {
    if (currentSearch) {
      getMovieListFromServer(currentSearch, currPageNum)
    }
  }, [currentSearch])

  useEffect(() => {
    if (selectedMovieDetails.length > 0) {
      console.log('UE sel mov det WORKS')
      changeView('MOVIE VIEW')
    }
  }, [selectedMovieDetails]);

  const initSearchDefault = () => {
    setCurrPageNum(1);
    setTotalPages(0);
    setCurrentMovieList([]);
  };

  const getMovieListFromServer = (query, pageNum) => {
    console.log('QUERY', query)
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: keys.tmdb_api_key,
        query: query,
        page: pageNum
      }
    })
    .then((result) => {
      setTotalPages(result.data.total_pages);
      setCurrPageNum(prev => prev + 1);
      return result.data.results.filter(movie => movie.release_date ? movie : null)
    })
    .then((result) => {
      console.log('GET SUCCESS');
      // console.log(result)
      console.log('======MOVIE COUNT====== :',result.length);
      setCurrentMovieList(prevState =>[...prevState, ...result]);
    })
    .catch((err) => {
      console.log('GET FAILED');
      console.log(err);
    })
  };

  const getMoreMovies = () => {
    console.log('CURRENT',currPageNum)
    console.log('TOTAL', totalPages)
    getMovieListFromServer(currentSearch, currPageNum)
  }

  const getGenresListFromApi = () => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
      params: {
        api_key: keys.tmdb_api_key
      }
    })
    .then((result) => {
      console.log('GET GENRES SUCCESS')
      let genresObj = {};
      result.data.genres.forEach((item) => {
        if(!genresObj[item.id]) {
          genresObj[item.id] = item.name
        }
      })
      setGenresList(genresObj)
    })
    .catch((err) => {
      console.log('GENRES GET FAILED', err)
    })
  }

  const getMovieDataById = (id) => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: keys.tmdb_api_key
      }
    })
    .then((result) => {
      console.log('++++++++++++ MOVIE DETAILS SUCCESS')
      setSelectedMovieDetails(prevState => [result.data])
    })
    .catch((err) => {
     console.log('------------ MOVIE DETAILS FAILED', err)
    })
};

  const changeView = (source) => {
    setCurrentTab(source);
  };

  const renderView = (view) => {
    if (view === 'SEARCH') {
      return (
        <SearchTab
          getUserInput={getUserInput}
          movieList={currentMovieList}
          getUserSelectedMovie={getUserSelectedMovie}
          genresList={genresList}
          getMoreMovies={getMoreMovies}
          totalPages={totalPages}
          currentPage={currPageNum}
        />
      )
    }
    if (view === 'HOME' || !view) {
      return (
       <HomeTab />
      )
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
        genresList={genresList}
        getUserSelectedMovie={getUserSelectedMovie}
      />)
    }
  }

  return (

    <View style={styles.container}>
      <View style={Platform.OS === 'ios' ? styles.iosBar : null}></View>
      <StatusBar barStyle='light-content'/>
      <NavBar setModalVisible={setModalVisible}/>

      <MainCarousel
        style="slides"
        itemsPerInterval={1}
        items={[
          {title: 'HOME'},
          {title: 'SEARCH'},
          {title: 'MOVIES'},
          {title: 'TV SHOWS'},
          {title: 'CELEBS'},
          {title: 'AWARDS & EVENTS'},
        ]
        }
        currentTab={currentTab}
        handleTabPress={changeView}
      />
      <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => { setModalVisible(false) }}
      >
        <TouchableOpacity
          style={styles.modal_outside}
          onPressOut={() => { setModalVisible(false) }}

        >
          <SearchBar
            getUserInput={getUserInput}
            setModalVisible={setModalVisible}
            changeView={changeView}
          />
        </TouchableOpacity>

      </Modal>
      {renderView(currentTab)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131313',
    height: '100%'
  },
  iosBar: {
    backgroundColor: 'black',
    height: 40
  },
  androidBar: {
    backgroundColor: 'black',
    height: 0
  },
  modal_outside: {
    height: '100%'
  }
});
