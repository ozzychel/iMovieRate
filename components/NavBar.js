import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NavBar = (props) => {

  return (
    <View style={styles.navbar}>
      <View style={styles.titleCont}>
        <Text style={styles.titleText}>iMovieRate</Text>
      </View>
      <View style={styles.dotsCont}>
        <TouchableOpacity>
          <Text style={styles.titleText}>0 0 0</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    backgroundColor: 'palevioletred',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  titleCont: {
    width: '70%',
    height: '60%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    marginLeft: 5,
    paddingLeft: 10,
    justifyContent: 'flex-start'
  },
  dotsCont: {
    width: '20%',
    height: '60%',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700'
  }

})

export default NavBar;