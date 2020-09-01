import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Movie = ({ movie }) => {

  return (
    <View>
      <View>
        <Text>{movie.title}</Text>
      </View>
      <View>
        <Image
          style={styles.poster}
          source={{
            uri:`https://image.tmdb.org/t/p/w300${movie.poster_path}`
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: 600,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white'
  }
})

export default Movie;