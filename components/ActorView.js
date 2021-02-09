import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ActorView = ({ person }) => {
  const scroll = React.createRef();
  const Separator = () => (
    <View style={styles.separator} />
  );
  return (

    <ScrollView
      contentContainerStyle={styles.tab_cont}
      showsVerticalScrollIndicator={false}
      ref={scroll}
      testID='scroll_view'
    >
      <View style={styles.person_cont}>

        <View>
          <Text style={styles.person_text} testID="person_name">
            {person.name}
          </Text>

        </View>
        <View style={styles.person_age_cont}>
          <Text style={styles.person_age_text} testID='movie_year'>
            born: {person.birthday}
          </Text>
          <Text style={styles.person_age_text} testID='movie_rating'>
           (age smth)
          </Text>
        </View>

      </View>
      <Separator/>

    </ScrollView>
  )
};

const styles = StyleSheet.create({
  tab_cont: {
    backgroundColor: '#131313',
    paddingBottom: 10
  },
  separator: {
    marginVertical: 0.05,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  person_cont: {
    backgroundColor: '#1f1f1f',
    maxHeight: 150
  },
  person_text: {
    fontSize: 34,
    color: 'white',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  person_age_cont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 7
  },
  person_age_text: {
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#737373'
  },
})

export default ActorView;
