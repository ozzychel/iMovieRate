import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const RatingsBlock = ({ movie_omdb }) => {

  // console.log(movie_omdb)

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
            <Image
              style={styles.imdb_logo}
              source={{
                uri:`https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png`
            }}
            />
          </View>
          <View style={styles.rating_text_cont}>
            <Text style={styles.rating_text}>{movie_omdb.imdbRating ? movie_omdb.imdbRating : 'N/A'} / 10</Text>
          </View>
        </View>



        <View style={styles.rating_table_cont}>
          <View style={styles.rating_text_cont}>
            <Text style={styles.metascore}>
              {movie_omdb["Metascore"] ? movie_omdb["Metascore"] : 'N/A'}
            </Text>
          <View style={styles.rating_logo_cont}>
            <Text style={styles.rating_text}>Metascore</Text>
          </View>
          </View>
        </View>

        <View style={styles.rating_table_cont}>
          <View style={styles.rating_logo_cont}>
          <Image
              style={styles.rt_logo}
              source={require('../../rotten.png')}
            />
          </View>
          <View style={styles.rating_text_cont}>
            {getRottenTomatoes()}
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
    backgroundColor: '#1f1f1f',
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  rating_table_cont: {
    width: '30%',
    justifyContent: 'center',
    paddingTop: 5
  },
  rating_logo_cont: {
    alignItems:'center',
    padding: 5
  },
  rating_text_cont: {
    alignItems: 'center'
  },
  rating_text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  imdb_logo: {
    width: 40,
    height: 40
  },
  rt_logo: {
    width: 40,
    height: 40,
    borderRadius: 5
  },
  metascore: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: 'green',
    width: '40%',
    marginTop:10
  }
})

export default RatingsBlock;