import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TrendingMovCarousel from './HomeTab_comp/TrendingMovCarousel';

const HomeTab = ({trendingDayList, trendingWeekList, getUserSelectedMovie}) => {
  return (
    <ScrollView>
      <TrendingMovCarousel
        trendingList={trendingDayList}
        getUserSelectedMovie={getUserSelectedMovie}
        carouselHeader="Trending Today"
      />

      <TrendingMovCarousel
        trendingList={trendingWeekList}
        getUserSelectedMovie={getUserSelectedMovie}
        carouselHeader="Treending This Week"
      />
    </ScrollView>

  )
}

export default HomeTab;