import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RenderImage from '../helperFunctions/RenderImage';

const TrendingToday = ({ trendingDayList, trendingWeekList, getUserSelectedMovie }) => {
  console.log('TRENDING DAY LENGTH:', trendingDayList.length)
  console.log('TRENDING WEEK LENGTH:', trendingWeekList.length)

  const scroll = React.createRef();

  useEffect(() => {
    if(trendingDayList.length) {
      scroll.current.scrollTo({x:0, animated: false});
    }
  }, [trendingDayList])

  return trendingDayList.length > 0 ? (
    <View>
      <View style={styles.main_cont}>

      <View style={styles.movie_heading}>
        <View style={styles.movie_heading_subtitle_cont}>
          <Text style={styles.subtitle}>Trending Movies</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.movie_heading_seeAllbutton_cont}>
            <Text style={styles.movie_heading_seeAllbutton_text}></Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.cast_carousel}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        ref={scroll}
      >
        {trendingDayList.map((movie, i) => {
          return (
            <View key={i} style={styles.movie_cont}>
              <TouchableOpacity
                onPress={() => {
                  getUserSelectedMovie(movie.id);
                }}
              >
                <RenderImage
                  mainObj={movie}
                  baseUrl='https://image.tmdb.org/t/p/w154'
                  propToLink='poster_path'
                  defaultImg={require('../../assets/default.jpg')}
                  posterContStyle={styles.movie_poster_cont}
                  posterStyle={styles.poster_image}
                  defPosterContStyle={styles.movie_def_cont}
                  defPosterStyle={styles.movie_def_image}
                />

              <View style={styles.movie_title}>
                <Text style={styles.movie_title_text}>
                  {movie.title}
                </Text>
              </View>

              <View style={styles.movie_date}>
                <Text style={styles.movie_date_text}>
                  {movie.release_date ? movie.release_date.slice(0,4) : ''}
                </Text>
              </View>

              </TouchableOpacity>
            </View>
          )
      })}
        </ScrollView>
      </View>
    </View>
  ) : null
};

const styles = StyleSheet.create({
  // main_wrapper: {
  //   backgroundColor: '#1f1f1f',
  //   height: '100%'
  // },
  subtitle: {
    color: 'white',
    fontSize: 26
  },
  main_cont: {
    marginTop: 20,
    backgroundColor: '#1f1f1f',
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  movie_heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  movie_heading_subtitle_cont: {
    padding: 5,
  },
  movie_heading_seeAllbutton_cont: {
    padding: 10,
  },
  movie_heading_seeAllbutton_text: {
    paddingTop: 3,
    justifyContent: 'flex-end',
    color: '#1472f1',
    fontSize: 18,
    fontWeight: '600'
  },
  cast_carousel: {
    backgroundColor: '#1f1f1f',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15
  },
  movie_cont: {
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
  movie_poster_cont: {
  },
  poster_image: {
    height: 225,
    width: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  movie_def_cont: {
    height: 225,
    width: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#131313'
  },
  movie_def_image: {
    height: 225,
    width: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    opacity: 0.4
  },
  movie_title: {
    height: 80,
    paddingRight: 5,
    paddingLeft: 8,
    paddingTop: 15,
    justifyContent: 'flex-start',
    backgroundColor: '#313131'
  },
  movie_date: {
    height: 30,
    paddingRight: 5,
    paddingLeft: 8,
    paddingBottom: 10,
    justifyContent: 'center',
    backgroundColor: '#313131',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  movie_title_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  movie_date_text: {
    color: '#737373',
    fontSize: 15,
  },
})


export default TrendingToday;