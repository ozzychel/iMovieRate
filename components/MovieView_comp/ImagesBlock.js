import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import keys from '../../config';

const ImagesBlock = ({ movie_title, release_date, imageUrls}) => {
  console.log('LOG FROM IMAGEBLOCK', imageUrls.length)
  return imageUrls.length > 0 ? (
    <View>
      <Text style={styles.test}>Images({imageUrls.length})</Text>
    </View>
  )
  :
  (<View>
    <Text style={styles.test}>Images(0)</Text>
  </View>)
}

const styles = StyleSheet.create({
  test: {
    color:'white'
  }
})

export default ImagesBlock;