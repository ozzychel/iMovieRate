import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, Modal, Alert, TouchableOpacity, Dimensions } from 'react-native';
import NavBar from './components/NavBar';
import keys from './config.js';
import Constants from "expo-constants";
import MainCarousel from './components/MainCarousel';
import SearchTab from './components/SearchTab';
import HomeTab from './components/HomeTab';
import SearchBar from './components/SearchBar';
import MovieView from './components/MovieView';
import WatchList from './components/WatchList';

const api = require('./components/helperFunctions/serverRequests');

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState('HOME');
  const [genresList, setGenresList] = useState({});
  const [trendingDayList, setTrendingDayList] = useState([]);
  const [trendingWeekList, setTrendingWeekList] = useState([]);
  const [nowPlayingList, setNowPlaying] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [previousInput, setPreviousInput] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currPageNum, setCurrPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    console.log('!!! [] USE EFFECT WORKS');
    const onLoadingFetch = async () => {
        const fetchGenres = await getGenresList();
        const fetchedUserList = await getUserList();
        getTrending('day', fetchedUserList);
        getTrending('week', fetchedUserList);
        getNowPlaying(fetchedUserList);
    }
    onLoadingFetch();
  }, []);

  useEffect(() => {
    if(currentInput) {
      getMovieList(currentInput, currPageNum, userList)
    }
  }, [currentInput])

  const getUserList = async () => {
    console.log('!!! getUserList() invoked');
    const list = await api.getUserList();
    setUserList(list);
    return list;
  };

  const getGenresList = async () => {
    console.log('!!! getGenresList() invoked');
    const genres = await api.getGenresList();
    setGenresList(genres);
  };

  const getTrending = async (timeWindow, list) => {
    console.log(`!!! getTrending ${timeWindow} () invoked`)
    const trendList = await api.getTrending(timeWindow, list);
    if(timeWindow === 'day') setTrendingDayList(trendList);
    if(timeWindow === 'week') setTrendingWeekList(trendList);
  };

  const getNowPlaying = async (list) => {
    console.log('!!! getNowPlaying() invoked');
    const nowPlaying = await api.getNowPlaying(list);
    setNowPlaying(nowPlaying);
  };

  const getSelectedMovie = (id) => {
    getMovieDataById(id);
  };

  const getMovieDataById = async (id, arg) => {
    console.log('!!! getMovieDataById() invoked');
    let list = arg || userList;
    const response = await api.getMovieDataById(id, list);
    setSelectedMovie(prev => [...response]);
  };

  const addToList = async (movie_tmdb) => {
    console.log('!!! addToList() invoked');
    const add = await api.addToList(movie_tmdb);
    updateLists(movie_tmdb.id);
  };

  const updateLists = async (id) => {
    console.log('!!! updateLists() invoked');
    const fetchedUserList = await getUserList();
    const updateSelected = await getMovieDataById(id, await fetchedUserList);
    getTrending('day', await fetchedUserList);
    getTrending('week', await fetchedUserList);
    getNowPlaying(await fetchedUserList);
  };

  const deleteFromList = async (id) => {
    console.log("!!! deleteFromList() invoked");
    const del = await api.deleteFromList(id);
    updateLists(id);
  };

  const getMovieList = async (query, pageNum, list) => {
    console.log('!!! getMovieList() invoked');
    const [total, result] = await api.getMovieList(query, pageNum, list);
    setCurrPageNum(prev => prev + 1);
    setTotalPages(total)
    if(result.length) setSearchResults(prev => [...prev, ...result]);
    else setNoResult(true)
  };

  const getMoreMovies = async () => {
    getMovieList(currentInput, currPageNum, userList);
  };

  const initSearchDefault = () => {
    setCurrPageNum(1);
    setTotalPages(0);
    setSearchResults([]);
  };

  const getUserInput = async (input) => {
    if (input !== previousInput) {
      let wait = await initSearchDefault();
      setPreviousInput(input);
      setCurrentInput(input);
    }
  };

  const changeView = (source) => {
    setCurrentTab(source);
  };

  // LOGS
  console.log('== APP LOG == GENRES LIST:', Object.keys(genresList).length);
  console.log('== APP LOG == USER LIST:', userList.length);
  console.log('== APP LOG == TRENDING DAY:', trendingDayList.length);
  console.log('== APP LOG == TRENDING WEEK:', trendingWeekList.length);
  console.log('== APP LOG == NOW PLAYING:', nowPlayingList.length);
  console.log('== APP LOG == SELECTED_MOVIE:', selectedMovie.length ? selectedMovie[0].title : selectedMovie.length);
  console.log('== APP LOG == CURRENTPAGENUM', currPageNum)
  console.log('== APP LOG == TOTALPAGES', totalPages)
  console.log('== APP LOG == CURRENT_SEARCH_RESULTS', searchResults.length);
  console.log('== APP LOG == NORESULT_FLAG', noResult);



  console.log("-----------------------------------")
  console.log('== APP LOG == *CURRENT TAB*:', currentTab)
  console.log("-----------------------------------")
  // -------------------

  const renderView = (view) => {
    if (view === 'SEARCH') {
      return (
        <SearchTab
          movieList={searchResults}
          currentPageNum={currPageNum}
          totalPages={totalPages}
          genresList={genresList}
          currentTab={currentTab}
          changeView={changeView}
          getSelectedMovie={getSelectedMovie}
          getMoreMovies={getMoreMovies}
          deleteFromList={deleteFromList}
          setModalVisible={setModalVisible}
          noResult={noResult}
        />
      )
    }
    if (view === 'HOME' || !view) {
      return (
       <HomeTab
        trendingDayList={trendingDayList}
        trendingWeekList={trendingWeekList}
        nowPlayingList={nowPlayingList}
        changeView={changeView}
        getSelectedMovie={getSelectedMovie}
       />
      )
    }
    if (view === 'MOVIE VIEW') {
      return selectedMovie.length ?
      (<MovieView
        selectedMovie={selectedMovie}
        genresList={genresList}
        userList={userList}
        addToList={addToList}
        getSelectedMovie={getSelectedMovie}
        changeView={changeView}
      />) : (<View style={styles.msg_cont}><Text style={styles.msg_text}>Nothing to display! Please search the movie...</Text></View>)
    }
    if (view === 'WATCHLIST') {
      return (
        <WatchList
          userList={userList}
          genresList={genresList}
          currentTab={currentTab}
          getSelectedMovie={getSelectedMovie}
          changeView={changeView}
          deleteFromList={deleteFromList}
        />
        )
    }
  };

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
          {title: 'WATCHLIST'},
          {title: 'MOVIE VIEW'}
        ]
        }
        currentTab={currentTab}
        changeView={changeView}
      />
      <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {setModalVisible(false)}}
      >
        <TouchableOpacity
          style={styles.modal_outside}
          onPressOut={() => {
            setModalVisible(!modalVisible)
          }}
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
  },
  msg_cont: {
    borderWidth: 2,
    borderColor: '#1e1e1e',
    marginTop: 5,
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 8
  },
  msg_text: {
    color:'white',
    textAlign: 'center',
    fontSize: 16,
  }
});
