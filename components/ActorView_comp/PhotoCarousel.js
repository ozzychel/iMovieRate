import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RenderImage from '../helperFunctions/RenderImage';

const PhotoCarousel = ({ list }) => {
  const scroll = React.createRef();
  return list.length ? (
    <View>
      <View style={styles.main_cont}>

      <View style={styles.heading_cont}>
        <View style={styles.heading_cont_subcont}>
          <Text style={styles.subtitle}>Photos</Text>
        </View>
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scroll_content_cont}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        testID='scroll_view'
        ref={scroll}
      >
        {list.map((image, i) => {
          return (
            <View key={i} style={styles.image_wrap}>
                <RenderImage
                  mainObj={image}
                  baseUrl='https://image.tmdb.org/t/p/w154'
                  propToLink='file_path'
                  defaultImg={require('../../assets/default.jpg')}
                  posterContStyle={styles.image_cont}
                  posterStyle={styles.image}
                  defPosterContStyle={styles.image_cont}
                  defPosterStyle={styles.def_image}
                  testID='person_image'
                />
            </View>
          )
      })}
        </ScrollView>
      </View>
    </View>
  ) : null
};

const styles = StyleSheet.create({
  main_cont: {
    marginTop: 20,
    backgroundColor: '#1f1f1f',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    height: 350
  },
  heading_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  heading_cont_subcont: {
    padding: 5,
  },
  subtitle: {
    color: 'white',
    fontSize: 26
  },
  scroll_content_cont: {
    backgroundColor: '#1f1f1f',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15
  },
  image_wrap: {
    height: 330,
    maxWidth: 150,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
	    width: 3,
	    height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 225,
    width: 150,
    borderRadius: 10
  },
  image_cont: {
    height: 225,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#131313'
  },
  def_image: {
    height: 225,
    width: 150,
    borderRadius: 10,
    opacity: 0.4
  },
})

export default PhotoCarousel;