import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const MovieView = ({ selectedMovie, genresList }) => {
  const movie = selectedMovie[0];
  let runtime = moment.utc(moment.duration(movie.runtime, "minutes").asMilliseconds()).format(`H:mm`);

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
    return (
      <ScrollView
        style={styles.genres_cont}
        horizontal={true}
        >
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

  const renderTagline = () => {
    return movie.tagline ?
    <View style={styles.tagline_cont}>
      <Text style={styles.tagline_text}>{`"${movie.tagline}"`}</Text>
      <Separator/>
    </View> :
    <Text></Text>
  }

  const Separator = () => (
    <View style={styles.separator} />
  );

  const genres = [];
  movie.genres.forEach((obj) => {
    genres.push(genresList[obj.id]);
  })
  return (
    // PICTURE CAROUSEL
    // TITLE
    // DESCription BLOCK

    // ADD TO WATCHLIST
    // RATINGS BLOCK
    // CAST ACTORS
    // NEWS, UPDATES....
    // VIDEOS
    // IMAGES
    // AWARDS
    // REVIEWS
    <ScrollView>

      <View style={styles.title_cont}>
        <View>
          <Text style={styles.title_text}>
              {selectedMovie[0].title}
          </Text>
        </View>
        <View style={styles.year_duration_cont}>
          <Text style={styles.year_duration_text}>{selectedMovie[0].release_date.slice(0,4)}</Text>
          <Text style={styles.year_duration_text}>{runtime + 'h'}</Text>
        </View>
      </View>

      <Separator/>
      <View style={styles.desc_main_cont}>
          {renderImage()}
        <View style={styles.genres_desc_cont}>
            {renderGenres(genres)}

            <ScrollView style={styles.desc_cont}>
              <Text style={styles.desc_text}>{movie.overview}</Text>
            </ScrollView>

        </View>
      </View>
      <Separator />

      <View>
        {renderTagline()}
      </View>
      <Separator/>

      <View style={styles.addWatchList_cont}>
        <TouchableOpacity>
          <View style={styles.addButton_cont}>
            <View style={styles.addButton_icon_cont}>
              <Text style={styles.addButton_icon_text}>+</Text>
            </View>
            <View style={styles.addButton_text_cont}>
              <Text style={styles.addButton_text}>ADD TO WATCHLIST</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 0.05,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title_cont: {
    backgroundColor: '#131313',
    maxHeight: 150
  },
  title_text: {
    fontSize: 30,
    color: 'white',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  year_duration_cont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 7
  },
  year_duration_text: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#737373'
  },
  desc_main_cont: {
    flexDirection: 'row',
    backgroundColor: '#131313',
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
    maxHeight: 138
  },
  genres_cont: {
    paddingTop: 7,
    paddingBottom: 7,
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
    paddingBottom: 5,
    maxHeight: 90
  },
  desc_text: {
    color: 'white',
    fontSize: 16
  },
  tagline_cont: {
    backgroundColor: '#131313',
    alignItems: 'center',
    padding: 10
  },
  tagline_text: {
    color: '#737373',
    fontSize: 18,
    fontStyle: 'italic'
  },
  addWatchList_cont: {
    backgroundColor: '#131313',
    padding: 12
  },
  addButton_cont: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#737373'

  },
  addButton_icon_cont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '20%',
    paddingRight: 7
  },
  addButton_icon_text: {
    color: 'white',
    fontSize: 22
  },
  addButton_text_cont: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '65%',
    padding: 7,
  },
  addButton_text: {
    paddingTop: 2,
    color: 'white',
    fontSize: 14
  }
});

export default MovieView;