import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView }
from 'react-native';
import Movie from './Movie';

const WatchList = ({ userList, genresList, currentTab, changeView, getSelectedMovie, deleteFromList, os }) => {
  const movies = userList.map((mov, i) => (
    <Movie
      key={i}
      movie={mov}
      genresList={genresList}
      currentTab={currentTab}
      changeView={changeView}
      getSelectedMovie={getSelectedMovie}
      deleteFromList={deleteFromList}
      testID='inlist_movie'
    />
  ));

  return userList.length > 0 ? (
    <View style={styles.scrollWrapper}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
        testID='scroll_view'
      >
        {movies}
      </ScrollView>
      <View style={os === 'ios' ? {height:160} : {height:110}} testID='footer'></View>
    </View>
  )
  :
  (<View style={styles.msg_cont}><Text style={styles.msg_text}testID='empty_msg'>You don't have any saved lists yet, please start new search...</Text></View>)
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#131313',
  },
  scrollWrapper: {
    height: '100%',
    backgroundColor:'#1f1f1f',
    paddingBottom: 'auto'
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

export default WatchList;
