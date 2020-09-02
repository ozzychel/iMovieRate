import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Keyboard } from 'react-native';

const SearchBar = ({ getUserInput }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchPress = () => {
    if (inputValue.trim()) {
      console.log('search:', inputValue)
      getUserInput(inputValue)
      setInputValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Search field cannot be empty!')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={{fontSize:20}}
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
    height: 30,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgrey'
  }
})

export default SearchBar;