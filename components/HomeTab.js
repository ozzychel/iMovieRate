import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MovieCarousel from './helperFunctions/MovieCarousel';

const HomeTab = ({trendingDayList, trendingWeekList, getUserSelectedMovie, nowPlayingList}) => {
  return (
    <ScrollView>
      <MovieCarousel
        movieList={nowPlayingList}
        getUserSelectedMovie={getUserSelectedMovie}
        carouselHeader="In Theatres Now"
      />

      <MovieCarousel
        movieList={trendingDayList}
        getUserSelectedMovie={getUserSelectedMovie}
        carouselHeader="Trending Today"
      />

      <MovieCarousel
        movieList={trendingWeekList}
        getUserSelectedMovie={getUserSelectedMovie}
        carouselHeader="Trending This Week"
      />
    </ScrollView>
  )
}

export default HomeTab;