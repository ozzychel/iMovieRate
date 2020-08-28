import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';

const SearchBar = ({ getUserInput }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchPress = () => {
    if (inputValue.trim()) {
      console.log('search:', inputValue)
      getUserInput(inputValue)
      setInputValue('')
    } else {
      Alert.alert('Search field cannot be empty!')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />
      </View>
      <View>
        <Button
          title='Search'
          onPress={handleSearchPress}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  inputWrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5
  }
})

export default SearchBar;