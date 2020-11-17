import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView}
from 'react-native';
import axios from 'axios';
import Movie from './Movie';

const WatchList = ({ userList, genresList, getUserSelectedMovie }) => {
  console.log('WATCH USER LIST LOG', userList.length)

  const movies = userList.map((mov, i) => (
    <Movie
      key={i}
      movie={mov}
      genresList={genresList}
      getUserSelectedMovie={getUserSelectedMovie}
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
  (<View><Text>LIST IS EMPTY</Text></View>)
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
})


export default WatchList;
