import React from 'react';
import { View, Text } from 'react-native';
import Movie from './Movie';

const MovieMapper = ({movieList}) => {
  const movies = [];
  movieList.forEach((movie, i) => {
    movies.push(
      <Movie movie={movieList[i]} key={i}/>
    )
  })

  return (
    <View>{movies}</View>
  )

};

export default MovieMapper;
