import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar'

export default function App() {
  const [currentSearch, setCurrentSearch] = useState('default')

  const getUserInput = (input) => {
    setCurrentSearch(input)
  }

  return (
    <View style={styles.container}>
      <NavBar />
      <SearchBar getUserInput={getUserInput}/>
      <Text style={{fontSize: 30}}>{currentSearch}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
