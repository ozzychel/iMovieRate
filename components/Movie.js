import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RenderImage from './helperFunctions/RenderImage';

const Movie = ({ movie, getUserSelectedMovie, genresList, currentTab, deleteFromList }) => {
  const genres = [];
  movie.genre_ids.forEach((id) => {
    genres.push(genresList[id]);
  })

  const renderDelBtn = (tab) => {
    return tab === 'WATCHLIST' ?
      (<View style={styles.del_btn_cont}>
        <TouchableOpacity
          style={styles.del_btn_body}
          onPress={() => {
            deleteFromList(movie.id)
          }}
        >
          <Text style={styles.del_btn_text}>X</Text>
        </TouchableOpacity>
      </View>)
      :
      (<View style={styles.del_btn_cont}></View>)
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          getUserSelectedMovie(movie.id);
        }}
      >
      <View style={styles.container}>
        <RenderImage
          mainObj={movie}
          baseUrl='https://image.tmdb.org/t/p/w154'
          propToLink='poster_path'
          defaultImg={require('../assets/default.jpg')}
          posterContStyle={styles.poster_cont}
          posterStyle={styles.poster}
          defPosterContStyle={styles.poster_cont}
          defPosterStyle={styles.poster}
        />
        <View style={styles.title_cont}>
          <Text style={styles.title}>
            {movie.title + ` (${movie.release_date.slice(0,4)})`}
          </Text>
            <Text style={styles.genres_title}>{genres.join(', ')}</Text>
        </View>
        {renderDelBtn(currentTab)}
      </View>
      <Separator />
      </TouchableOpacity>
    </View>
  )
}

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  poster_cont: {
    margin: 5,
  },
  poster: {
    width: 92,
    height: 138,
  },
  title_cont: {
    width: '60%',
    margin: 5,
  },
  title: {
    fontSize: 16,
    marginTop: '10%',
    paddingLeft: 5,
    fontWeight: '500',
    color: 'white'
  },
  genres_title: {
    fontSize: 14,
    marginTop: 5,
    paddingLeft: 5,
    fontStyle: 'italic',
    color: 'white'
  },
  separator: {
    marginVertical: 2,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  del_btn_cont: {
    width: '10%',
    margin: 7,
  },
  del_btn_body: {
    borderColor:'#1e1e1e',
    borderWidth:3,
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  del_btn_text: {
    color: '#737373',
    fontSize: 16,
  }
})

export default Movie;