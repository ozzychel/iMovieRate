import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const SearchBar = (props) => {

  return (
    <View style={styles.container}>
      <View>
        <TextInput />
      </View>
      <View>
        <Button
          title='Search'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export default SearchBar;