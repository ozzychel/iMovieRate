import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeTab = () => {

  return (
    <View style={styles.main_wrapper}>
      <Text style={{color:'white'}}>HOME SCREEN</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  main_wrapper: {
    backgroundColor: '#1f1f1f',
    height: '100%'
  }
})

export default HomeTab;