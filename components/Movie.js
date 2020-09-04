import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Movie = ({ movie, getUserSelectedMovie, genresList }) => {
  // console.log('MOVIE LOG', genresList)
  const renderImage = () => {
    if (movie.poster_path) {
      return (
        <View style={styles.poster_cont}>
        <Image
            style={styles.poster}
            source={{
              uri:`https://image.tmdb.org/t/p/w154${movie.poster_path}`
            }}
        />
        </View>
      )
    } else {
      return (
        <View style={styles.poster_cont}>
        <Image
        source={require('../default.jpg')}
        style={styles.poster}
        />
        </View>
      )
    }
  };

  let genres = [];
  movie.genre_ids.forEach((id) => {
    genres.push(genresList[id])
  })

  return (
    <View
    // style={styles.movie_cont}
    >
      <TouchableOpacity
        onPress={() => {
          getUserSelectedMovie(movie.id)
        }}
      >

      <View style={styles.container}>
        {renderImage()}
        <View style={styles.title_cont}>
          <Text style={styles.title}>
            {movie.title + ` (${movie.release_date.slice(0, 4)})`}
          </Text>
            <Text style={styles.genres_title}>{genres.join(', ')}</Text>
        </View>

      </View>
      {/* <View style={styles.title_cont}>
        <Text style={styles.title}>{movie.title + ` (${movie.release_date.slice(0, 4)})`}</Text>
      </View>
      <View>{renderImage()}</View> */}


      <Separator />
      </TouchableOpacity>
    </View>
  )
}

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 2,
    justifyContent: 'space-between'
  },
  poster_cont: {
    margin: 5,
    // borderWidth: 3,
    // borderColor:'green'
  },
  poster: {
    width: 92,
    height: 138,
  },
  title_cont: {
    width: '75%',
    margin: 5,
    // borderWidth: 3,
    // borderColor: 'yellow'
  },
  title: {
    // width: '100%',
    fontSize: 16,
    // backgroundColor: 'grey',
    marginTop: '10%',
    paddingLeft: 5,
    fontWeight: '500',
    color: 'white'
  },
  genres_title: {
    fontSize: 14,
    // backgroundColor: 'lightgrey',
    marginTop: 5,
    paddingLeft: 5,
    fontStyle: 'italic',
    color: 'white'
  },
  separator: {
    marginVertical: 2,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }

})

export default Movie;