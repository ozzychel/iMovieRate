import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TrendingToday from './HomeTab_comp/TrendingToday';

const HomeTab = ({trendingDayList, trendingWeekList, getUserSelectedMovie}) => {
  return (
    <TrendingToday
      trendingDayList={trendingDayList}
      trendingWeekList={trendingWeekList}
      getUserSelectedMovie={getUserSelectedMovie}
    />
  )
}

export default HomeTab;