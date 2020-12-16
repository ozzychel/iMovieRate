import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Movie from './Movie';

const SearchTab = ({ movieList, currentPageNum, totalPages, genresList, currentTab, changeView, getSelectedMovie, deleteFromList, getMoreMovies, setModalVisible, noResult }) => {

  const [flag, setFlag] = useState(0);

  const movies = movieList.map((mov, i) => (
    <Movie
      key={i}
      movie={mov}
      genresList={genresList}
      currentTab={currentTab}
      changeView={changeView}
      getSelectedMovie={getSelectedMovie}
      deleteFromList={deleteFromList}
    />
  ));

  const renderLoadMoreBtn = (total, current) => {
    return (total > 1 && current <= total) ?
      (<TouchableOpacity
          onPress={ () => {
            getMoreMovies();
          }}>
          <View style={styles.load_more_cont}>
            <Text style={styles.load_more_text}>Load more...</Text>
          </View>
        </TouchableOpacity>) : null;
  };

  const noSearchYet = async (param) => {
    await setFlag(1);
    setModalVisible(true);
  };

  const renderMsg = (flag) => {
    return flag ? (<View style={styles.msg_cont}><Text style={styles.msg_text}>We don't have information on this movie yet! Please check your input or try again later...</Text></View>) : null
  }

  return movieList.length > 0 ? (
    <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
        {movies}
        {renderLoadMoreBtn(totalPages, currentPageNum)}
        </ScrollView>
        <View style={Platform.OS === 'ios' ? {height:160} : {height:110}}></View>
    </View>
  )
  :
  (<View style={styles.back}>
    {!flag ? noSearchYet() : null}
    {renderMsg(noResult)}
    </View>)
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#131313',
  },
  scrollWrapper: {
    height: '100%',
    backgroundColor:'#1f1f1f',
    paddingBottom: 'auto'
  },
  star_cont_text: {
    color: 'green',
    fontSize: 16
  },
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
    backgroundColor: '#131313',
    height: '100%',
    paddingTop: 10
  },
  load_more_cont: {
    height: 60,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  load_more_text: {
    color: '#737373',
    fontSize: 18,
    fontWeight: '600'
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
})

export default SearchTab;