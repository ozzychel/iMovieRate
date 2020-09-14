import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const InfoBlock = ({ movie_tmdb, genres, Separator }) => {

  const renderImage = () => {
    if (movie_tmdb.poster_path) {
      return (
        <Image
          style={styles.poster}
          source={{
            uri:`https://image.tmdb.org/t/p/w154${movie_tmdb.poster_path}`
          }}
        />
      )
    } else {
      return (
        <Image
          source={require('../../default.jpg')}
          style={styles.poster}
        />
      )
    }
  };

  const renderGenres = (genresArr) => {
    let genreBlocks = [];
    genresArr.forEach((genre, i) => {
      genreBlocks.push(
        <View key={i} style={styles.genres_block}>
          <Text style={styles.genres_text}>
            {genre}
          </Text>
        </View>
        )
    })
    return genreBlocks;
  };

  const renderTagline = () => {
    return movie_tmdb.tagline ?
      <View style={styles.tagline_cont}>
        <Text style={styles.tagline_text}>
          {`"${movie_tmdb.tagline}"`}
        </Text>
        <Separator/>
      </View> : null
  }

  return (
    <View>
     <View style={styles.desc_main_cont}>
        <View style={styles.poster_cont}>
          {renderImage()}
        </View>
        <View style={styles.genres_desc_cont}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={styles.genres_cont}
              horizontal={true}>
                {renderGenres(genres)}
            </ScrollView>
            <ScrollView
              style={styles.desc_cont}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.desc_scroll_text}>
                {movie_tmdb.overview}
              </Text>
            </ScrollView>
        </View>
      </View>
      <Separator />

      <View>
         {renderTagline()}
      </View>
      <Separator />

      </View>
  )
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 0.05,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  desc_main_cont: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    padding: 5
  },
  poster_cont: {
    margin: 5,
    maxHeight: 138
  },
  poster: {
    width: 92,
    height: 138,
  },
  genres_desc_cont: {
    width: '70%',
    margin: 5,
    maxHeight: 138,
  },
  genres_cont: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  genres_scroll: {
    backgroundColor: '#131313'
  },
  genres_block: {
    padding: 5,
    marginRight: 10,
    borderColor: '#737373',
    borderWidth: 2,
    borderRadius: 6
  },
  genres_text: {
    fontSize: 16,
    color: 'white'
  },
  desc_cont: {
    maxHeight: 90,
    paddingBottom: 5,
  },
  desc_scroll_text: {
    color: 'white',
    fontSize: 16
  },
  tagline_cont: {
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    padding: 10
  },
  tagline_text: {
    color: '#737373',
    fontSize: 18,
    fontStyle: 'italic'
  },
})

export default InfoBlock;