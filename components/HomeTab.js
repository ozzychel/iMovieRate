import React from 'react';
import { ScrollView } from 'react-native';

import MovieCarousel from './helperFunctions/MovieCarousel';

const HomeTab = ({
  trendingDayList,
  trendingWeekList,
  nowPlayingList,
  changeView,
  getSelectedMovie,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} testID="scroll_view">
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
  );
};

export default HomeTab;
