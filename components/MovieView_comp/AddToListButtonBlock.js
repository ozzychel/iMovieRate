import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AddToListButtonBlock = ({ movie_tmdb, addToList }) => {

  return (
    <View style={styles.addWatchList_cont}>
        <TouchableOpacity
          disabled={movie_tmdb.inList ? true : false}
          onPress={() => {
            addToList(movie_tmdb)
          }}
        >
          <View style={movie_tmdb.inList ? styles.addButton_cont_inlist : styles.addButton_cont}>
            <View style={styles.addButton_icon_cont}>
              <Text style={movie_tmdb.inList ? styles.addButton_icon_text_inlist : styles.addButton_icon_text}
              >{movie_tmdb.inList ? '✔' : '+'}
              </Text>
            </View>
            <View style={styles.addButton_text_cont}>
              <Text style={styles.addButton_text}>
                {movie_tmdb.inList ? 'IN YOUR WATCHLIST' : 'ADD TO WATCHLIST'}
                </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
  )
};

const styles = StyleSheet.create({
  addWatchList_cont: {
    backgroundColor: '#1f1f1f',
    padding: 12
  },
  addButton_cont: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#008122',
    borderRadius: 5
  },
  addButton_cont_inlist: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#313131',
    borderRadius: 5
  },
  addButton_icon_cont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 7,
  },
  addButton_icon_text: {
    color: 'white',
    fontSize: 22
  },
  addButton_icon_text_inlist: {
    color: 'green',
    fontSize: 16
  },
  addButton_text_cont: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 7,
  },
  addButton_text: {
    paddingTop: 2,
    color: 'white',
    fontSize: 14
  },
});

export default AddToListButtonBlock;
