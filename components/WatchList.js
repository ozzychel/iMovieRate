import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView }
from 'react-native';
import axios from 'axios';
import Movie from './Movie';

const WatchList = ({ userList, genresList, getUserSelectedMovie, currentTab, deleteFromList }) => {
  console.log('WATCH USER LIST LOG', userList.length)

  const movies = userList.map((mov, i) => (
    <Movie
      key={i}
      movie={mov}
      genresList={genresList}
      getUserSelectedMovie={getUserSelectedMovie}
      currentTab={currentTab}
      deleteFromList={deleteFromList}
    />
  ))

  return userList.length > 0 ? (
    <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
        {movies}
        </ScrollView>
        <View style={Platform.OS === 'ios' ? {height:160} : {height:110}}></View>
    </View>
  )
  :
  (<View style={styles.msg_cont}><Text style={styles.msg}>You don't have any saved lists yet, please start new search...</Text></View>)
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
  msg: {
    color:'white',
    textAlign: 'center',
    fontSize: 16,
  }
})

export default WatchList;
