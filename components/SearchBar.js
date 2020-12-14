import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Keyboard, TouchableOpacity } from 'react-native';

const SearchBar = ({ getUserInput, setModalVisible, changeView }) => {

  const [inputValue, setInputValue] = useState('');

  const handleSearchPress = () => {
    if (inputValue.trim()) {
      console.log('!!! handleSearchPress() invoked')
      getUserInput(inputValue)
      setInputValue('')
      Keyboard.dismiss()
      setModalVisible(false)
      changeView('SEARCH')
    } else {
      Alert.alert('Search field cannot be empty!')
    }
  }
  return (
    <View style={Platform.OS === 'ios' ?
      {marginTop: 135,backgroundColor: 'white'} :
      {marginTop: 100,backgroundColor: 'white'}}
    >

    <View style={styles.container}>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          placeholder="Search movie title..."
          // placeholderTextColor="grey"
          returnKeyType='search'
        />
      </View>
    </View>

      <View style={styles.btn_cont}>
        <TouchableOpacity
          style={styles.btn_body}
          onPress={handleSearchPress}
          >
          <Text style={styles.btn_text}>SEARCH</Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    height: 40,
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'darkgrey',
    backgroundColor: 'white'
  },
  input: {
    fontSize: 22,
    paddingLeft: 5,
    paddingTop:10
  },
  btn_cont: {
    padding:4,
    borderBottomColor: '#131313',
    borderBottomWidth: 2
  },
  btn_body: {
    borderWidth: 2,
    borderColor: '#131313',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131313',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  btn_text: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  }
})

export default SearchBar;