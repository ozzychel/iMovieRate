import React from 'react';
import { View, Text } from 'react-native';

const Movie = ({ movie }) => {

  return (
  <Text>{movie.title}</Text>
  )
}

export default Movie;