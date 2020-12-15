import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MovieCarousel from './helperFunctions/MovieCarousel';

const HomeTab = ({trendingDayList, trendingWeekList,  nowPlayingList, changeView, getSelectedMovie}) => {
  return (
    <ScrollView>
      <MovieCarousel
        movieList={nowPlayingList}
        carouselHeader="In Theaters Now"
        changeView={changeView}
        getSelectedMovie={getSelectedMovie}
      />

      <MovieCarousel
        movieList={trendingDayList}
        carouselHeader="Trending Today"
        changeView={changeView}
        getSelectedMovie={getSelectedMovie}
      />

      <MovieCarousel
        movieList={trendingWeekList}
        carouselHeader="Trending This Week"
        changeView={changeView}
        getSelectedMovie={getSelectedMovie}
      />
    </ScrollView>
  )
};

export default HomeTab;