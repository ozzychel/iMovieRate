import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ setModalVisible }) => {

  return (
    <View style={styles.navbar}>

      <View style={styles.titleCont}>
        <Text style={styles.titleText}>iMovieRate</Text>
      </View>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
          }}
          style={styles.dotsCont}
        >
              <FontAwesomeIcon
                style={styles.search_icon}
                icon={ faSearch }
                size={ 24 }
                />
        </TouchableOpacity>

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
    height: '70%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    marginLeft: 5,
    paddingLeft: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white'
  },
  dotsCont: {
    width: '20%',
    height: '70%',
    borderLeftColor: '#1f1f1f',
    borderLeftWidth: 3,
    borderStyle: 'solid',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search_icon: {
    color: 'white',
    fontSize: 20
  }

})

export default NavBar;