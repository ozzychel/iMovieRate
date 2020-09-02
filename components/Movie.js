import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Movie = ({ movie }) => {
  const renderImage = () => {
    if (movie.poster_path) {
      return (
        <Image
            style={styles.poster}
            // defaultSource={require('../default.jpg')}
            source={{
              uri:`https://image.tmdb.org/t/p/w300${movie.poster_path}`
            }}
        />
      )
    } else {
      return (
        <Image
        source={require('../default.jpg')}
        style={styles.poster}
        />
      )
    }
  }

  return (
    <View style={styles.movie_cont}>

      <View style={styles.title_cont}>
        <Text style={styles.title}>{movie.title + ` (${movie.release_date.slice(0, 4)})`}</Text>
      </View>

      <View>{renderImage()}</View>

      <Separator />
    </View>
  )
}

const Separator = () => (
  <View style={styles.separator} />
);


const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: 600,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginLeft: 5,
  },
  movie_cont: {
    marginTop: 15
  },
  separator: {
    marginVertical: 2,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title_cont: {
  }
})

export default Movie;