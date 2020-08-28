import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar'

export default function App() {
  return (
    <View style={styles.container}>
      <NavBar />
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
