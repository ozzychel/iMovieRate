import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ setModalVisible }) => {

  return (
    <View style={styles.navbar}>

      <View style={styles.titleCont}>
        <Text style={styles.titleText} testID='app_title'>iMovieRate</Text>
      </View>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
          }}
          style={styles.dotsCont}
          testID='search_btn'
        >
          <FontAwesomeIcon
            icon={faSearch}
            size={24}
            color={'#737373'}
            testID='search_btn_icon'
            />
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: 'black',
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
    borderColor: '#737373',
    marginLeft: 5,
    paddingLeft: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#737373'
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
})

export default NavBar;