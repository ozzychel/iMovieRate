import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MovieCarousel from './helperFunctions/MovieCarousel';

const HomeTab = ({trendingDayList, trendingWeekList,  nowPlayingList, changeView,
  getSelectedMovie
  // getUserSelectedMovie
}) => {
  return (
    <ScrollView>
      <MovieCarousel
        movieList={nowPlayingList}
        carouselHeader="In Theatres Now"
        changeView={changeView}
        getSelectedMovie={getSelectedMovie}
        // getUserSelectedMovie={getUserSelectedMovie}
      />

      <MovieCarousel
        movieList={trendingDayList}
        carouselHeader="Trending Today"
        changeView={changeView}
        getSelectedMovie={getSelectedMovie}
        // getUserSelectedMovie={getUserSelectedMovie}
      />

      <MovieCarousel
        movieList={trendingWeekList}
        carouselHeader="Trending This Week"
        changeView={changeView}
        getSelectedMovie={getSelectedMovie}
        // getUserSelectedMovie={getUserSelectedMovie}
      />
    </ScrollView>
  )
}

export default HomeTab;