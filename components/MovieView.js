import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const MovieView = ({ selectedMovie, genresList }) => {
  const movie = selectedMovie[0];
  let runtime = moment.utc(moment.duration(movie.runtime, "minutes").asMilliseconds()).format(`H:mm`);

  const renderGenres = (genresArr) => {
    let genreBlocks = [];
    genresArr.forEach((genre, i) => {
      genreBlocks.push(
        /////////////////////CATCH UP FROM HERE
        <Text key={i}>
          {genre}
        </Text>
        )
    })
    return (
      <ScrollView>
        {genreBlocks}
      </ScrollView>
    )
  }

  const renderImage = () => {
    if (movie.poster_path) {
      return (
        <View style={styles.poster_cont}>
        <Image
            style={styles.poster}
            source={{
              uri:`https://image.tmdb.org/t/p/w154${movie.poster_path}`
            }}
        />
        </View>
      )
    } else {
      return (
        <View style={styles.poster_cont}>
        <Image
        source={require('../default.jpg')}
        style={styles.poster}
        />
        </View>
      )
    }
  };

  const genres = [];
  movie.genres.forEach((obj) => {
    genres.push(genresList[obj.id])
  })
  return (
    // big picture with small inside with title and year
    // description
    // ratings
    <ScrollView>

      <View style={styles.info_cont}>
        <Text style={styles.title_text}>
            {selectedMovie[0].title}
        </Text>
        <View style={styles.title_info_cont}>
          <Text style={styles.title_info_text}>{selectedMovie[0].release_date.slice(0,4)}</Text>
          <Text style={styles.title_info_text}>{runtime + 'h'}</Text>
        </View>
      </View>

      <View style={styles.desc_main_cont}>
          {renderImage()}

        <View style={styles.genres_desc_cont}>
            {renderGenres(genres)}
            {/* <View style={styles.genres_cont}>
              <Text>{genres}</Text>
            </View> */}

            <ScrollView style={styles.desc_cont}>
              <Text>{movie.overview}</Text>
            </ScrollView>

        </View>
      </View>


        <Text>{`"${selectedMovie[0].tagline}"`}</Text>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  info_cont: {
    backgroundColor: 'beige'
  },
  title_text: {
    fontSize: 24,
    backgroundColor: 'lightgrey',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  title_info_cont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title_info_text: {
    fontSize: 18,
    paddingLeft: 10,
  },
  desc_main_cont: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: 'red',
  },
  poster_cont: {
    margin: 5,
    borderWidth: 3,
    borderColor:'green'
  },
  poster: {
    width: 92,
    height: 138,
  },
  genres_desc_cont: {
    width: '70%',
    padding: 5,
    margin: 5,
    borderWidth: 3,
    borderColor:'pink'
  },
  genres_cont: {
    padding: 5,
    borderWidth: 3,
    borderColor:'lightgrey',
  },
  desc_cont: {
    padding: 5,
    borderWidth: 3,
    borderColor:'lightgrey',
    maxHeight: 90
  }
});

export default MovieView;