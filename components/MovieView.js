import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const MovieView = ({ selectedMovie }) => {




  return (
    <View>
      <Text>MOVIE VIEW</Text>
      <Text>{JSON.stringify(selectedMovie[0].title)}</Text>
    </View>
  )
};

export default MovieView;