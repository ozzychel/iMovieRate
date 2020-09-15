import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const RatingsBlock = ({ movie_omdb }) => {

  console.log(movie_omdb)

  const getRottenTomatoes = () => {
    let result = 'N/A'
    if (movie_omdb && movie_omdb['Ratings'].length > 0) {
      for (let i = 0; i < movie_omdb['Ratings'].length; i++) {
        if (movie_omdb['Ratings'][i]['Source'] === 'Rotten Tomatoes') {
          result = movie_omdb['Ratings'][i]['Value'];
        }
      }
    }
    return <Text style={styles.rating_text}>{result}</Text>
  };

  if(Object.keys(movie_omdb).length > 0) {
    return (
      <View style={styles.ratings_cont}>

        <View style={styles.rating_table_cont}>
          <View style={styles.rating_logo_cont}>
            <Text style={styles.rating_text}>Logo</Text>
          </View>
          <View style={styles.rating_text_cont}>
            <Text style={styles.rating_text}>{movie_omdb.imdbRating ? movie_omdb.imdbRating : 'N/A'} / 10</Text>
          </View>
        </View>

        <View style={styles.rating_table_cont}>
          <View style={styles.rating_logo_cont}>
            <Text style={styles.rating_text}>Logo</Text>
          </View>
          <View style={styles.rating_text_cont}>
            {getRottenTomatoes()}
          </View>
        </View>

        <View style={styles.rating_table_cont}>
          <View style={styles.rating_logo_cont}>
            <Text style={styles.rating_text}>Logo</Text>
          </View>
          <View style={styles.rating_text_cont}>
            <Text style={styles.rating_text}>
              {movie_omdb["Metascore"] ? movie_omdb["Metascore"] : 'N/A'} / 100
            </Text>
          </View>
        </View>

      </View>
    )
  } else {
    return null;
  }

};

const styles = StyleSheet.create({
  ratings_cont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'red',
    borderWidth: 1,
    padding: 5
  },
  rating_table_cont: {
    width: '30%',
    borderWidth: 2,
    borderColor: 'lightgrey',
  },
  rating_logo_cont: {
    borderColor:'green',
    borderWidth: 2
  },
  rating_text_cont: {
    borderColor:'pink',
    borderWidth: 2
  },
  rating_text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
})

export default RatingsBlock;