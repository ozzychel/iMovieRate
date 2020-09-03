import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

const MovieView = ({ selectedMovieId }) => {
  return (
    <View>
      <Text>{selectedMovieId}</Text>
    </View>
  )
};

export default MovieView;