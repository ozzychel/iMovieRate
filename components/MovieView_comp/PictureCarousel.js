import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PictureCarousel = ({ movie_title, release_date }) => {

  return (
    <View>
      <Text style={styles.text}>{movie_title + "  " + release_date}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
});

export default PictureCarousel;