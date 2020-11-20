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
import WatchList from './components/WatchList';

const api = require('./components/helperFunctions/serverRequests');

export default function App() {
  // search doesn't rerender and tab cleared if you type same search string!!!

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    console.log('GET USERSELECTED INVOKED!!!')
    getMovieDataById(id);
  }

  const getUserInput = async (input) => {
    let wait = await initSearchDefault();
    setCurrentSearch(input);
  };

  useEffect(() => {
    getGenresListFromApi();
  }, []);

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    if (currentSearch) {
      getMovieListFromServer(currentSearch, currPageNum)
    }
  }, [currentSearch]);

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

  const addToList = (movie_tmdb) => {
    api.addToWishList(movie_tmdb, api.getUserListFromServer, setUserList);
  };

  const getUserList = () => {
    api.getUserListFromServer(setUserList);
  };

  const deleteFromList = (movieId) => {
    api.deleteFromUserList(movieId, api.getUserListFromServer, setUserList);
  };

  const getMovieListFromServer = (query, pageNum) => {
    api.getMovieListFromServer(query, pageNum, setTotalPages, setCurrPageNum, setCurrentMovieList, setIsLoading, userList)
  };

  const getMoreMovies = () => {
    getMovieListFromServer(currentSearch, currPageNum,
      setTotalPages, setCurrPageNum, setCurrentMovieList, setIsLoading, userList)
  };

  const getGenresListFromApi = () => {
    api.getGenresListFromApi(setGenresList);
  };

  const getMovieDataById = (id) => {
    api.getMovieDataById(id, setSelectedMovieDetails, userList);
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
          setModalVisible={setModalVisible}
          isLoading={isLoading}
          currentTab={currentTab}
        />
      )
    }
    if (view === 'HOME' || !view) {
      return (
       <HomeTab />
      )
    }

    if (view === 'MOVIE VIEW') {
      return selectedMovieDetails.length ?
      (<MovieView
        selectedMovie={selectedMovieDetails}
        genresList={genresList}
        getUserSelectedMovie={getUserSelectedMovie}
        addToList={addToList}
      />) : (<View></View>)
    }
    if (view === 'WATCHLIST') {
      return (
        <WatchList
          userList={userList}
          genresList={genresList}
          selectedMovie={selectedMovieDetails}
          getUserSelectedMovie={getUserSelectedMovie}
          currentTab={currentTab}
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
          onPressOut={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <SearchBar
            getUserInput={getUserInput}
            setModalVisible={setModalVisible}
            changeView={changeView}
            setIsLoading={setIsLoading}
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

// const getUserListFromServer = () => {
  //   axios.get(`http://192.168.1.93:9000/users/${keys.userId}`)
  //   .then((result) => {
  //     console.log('USER LIST QUERY SUCCESS');
  //     setUserList(result.data.wish_list)
  //   })
  //   .catch((err) => {
  //     console.log('USER LIST QUERY FAILED', err);
  //   })
  // };

  // const addToWishList = (movie_tmdb) => {
  //   axios.post(`http://192.168.1.93:9000/users/${keys.userId}`, {
  //       id: movie_tmdb.id,
  //       title: movie_tmdb.title,
  //       release_date: movie_tmdb.release_date,
  //       genre_ids: movie_tmdb.genres.map((e) => e.id),
  //       poster_path: movie_tmdb.poster_path
  //   })
  //   .then((result) => {
  //     console.log('POST SUCCESS');
  //     api.getUserListFromServer(setUserList)
  //   })
  //   .catch((err) => {
  //     console.log('POST FAILED!!!', err);
  //   })
// }

// const getMovieDataById = (id) => {
  //   axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
  //     params: {
  //       api_key: keys.tmdb_api_key
  //     }
  //   })
  //   .then((result) => {
  //     console.log('++++++++++++ MOVIE DETAILS SUCCESS')
  //     setSelectedMovieDetails(prevState => [result.data])
  //   })
  //   .catch((err) => {
  //    console.log('------------ MOVIE DETAILS FAILED', err)
  //   })
  // };


  // const getGenresListFromApi = () => {
  //   axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
  //     params: {
  //       api_key: keys.tmdb_api_key
  //     }
  //   })
  //   .then((result) => {
  //     console.log('GET GENRES SUCCESS')
  //     let genresObj = {};
  //     result.data.genres.forEach((item) => {
  //       if(!genresObj[item.id]) {
  //         genresObj[item.id] = item.name
  //       }
  //     })
  //     setGenresList(genresObj)
  //   })
  //   .catch((err) => {
  //     console.log('GENRES GET FAILED', err)
  //   })
  // }


  // const getMovieListFromServer = (query, pageNum) => {
  //   console.log('QUERY', query)
  //   axios.get('https://api.themoviedb.org/3/search/movie', {
  //     params: {
  //       api_key: keys.tmdb_api_key,
  //       query: query,
  //       page: pageNum
  //     }
  //   })
  //   .then((result) => {
  //     setTotalPages(result.data.total_pages);
  //     setCurrPageNum(prev => prev + 1);
  //     return result.data.results.filter(movie => movie.release_date ? movie : null)
  //   })
  //   .then((result) => {
  //     console.log('GET SUCCESS');
  //     // console.log(result)
  //     console.log('======MOVIE COUNT====== :',result.length);
  //     setCurrentMovieList(prevState =>[...prevState, ...result]);
  //     setIsLoading(false)
  //   })
  //   .catch((err) => {
  //     console.log('GET FAILED');
  //     console.log(err);
  //   })
  // };

  // const deleteFromList = (movieId) => {
  //   axios.patch(`http://192.168.1.93:9000/users/${keys.userId}`, {
  //     movieId
  //   })
  //   .then((result) => {
  //     console.log('PATCH SUCCESS', result.data);
  //     // api.getUserListFromServer(setUserList);
  //     getUserList();
  //   })
  //   .catch((err) => {
  //     console.log('PATCH FAILED', err);
  //   })
  // }
