import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

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
    height: 60,
    backgroundColor: '#131313',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  titleCont: {
    width: '45%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    marginLeft: 5,
    paddingLeft: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  dotsCont: {
    width: '20%',
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white'
  }

})

export default NavBar;