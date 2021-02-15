import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { format, parse, differenceInYears } from 'date-fns';
import RenderImage from '../components/helperFunctions/RenderImage';
import PhotoCarousel from '../components/ActorView_comp/PhotoCarousel';
import MovieCarousel from '../components/helperFunctions/MovieCarousel';
const api = require('./helperFunctions/serverRequests');

const ActorView = ({ person, getSelectedMovie, changeView }) => {
  const scroll = React.createRef();
  const birthday = parse(person.birthday, "yyyy-MM-dd", new Date())
  const age = differenceInYears(new Date(), birthday);
  const bd = format(birthday, "MMMM dd, yyyy");
  const [images, setPersonImages] = useState([]);
  const [personMovies, setPersonMovies] = useState([]);

  useEffect(() => {
    const onLoadingFetch = async () => {
      const fetchPersonMovies = await getPersonMovies(person.id)
      const fetchImages = await getImages(person.id);
    }
    onLoadingFetch();
  }, [person]);

  const getImages = async (id) => {
    const response = await api.getPersonImages(id);
    setPersonImages(response);
  };

  const getPersonMovies = async (id) => {
    const response = await api.getPersonMovies(id);
    setPersonMovies(response);
  };

  const Separator = () => (
    <View style={styles.separator} />
  );

  return (

    <ScrollView
      contentContainerStyle={styles.tab_cont}
      showsVerticalScrollIndicator={false}
      ref={scroll}
      testID='scroll_view'
      style={{paddingBottom:500}}
    >
      <View style={styles.person_cont}>
        <View>
          <Text style={styles.person_text} testID="person_name">
            {person.name}
          </Text>
        </View>
        <View style={styles.person_age_cont}>
          <Text style={styles.person_age_text} testID='person_age'>
           {age} years ({bd})
          </Text>
        </View>
      </View>

      <Separator/>

      <View style={styles.desc_main_cont}>
        <RenderImage
          mainObj={person}
          baseUrl='https://image.tmdb.org/t/p/w154'
          propToLink='profile_path'
          defaultImg={require('../assets/default.jpg')}
          posterContStyle={styles.poster_cont}
          posterStyle={styles.poster}
          defPosterContStyle={styles.poster_cont}
          defPosterStyle={styles.poster}
          testID='image'
        />
        <View style={styles.bio_container}>
            <ScrollView
              style={styles.desc_cont}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              testID='biography_scroll'
            >
              <Text style={styles.desc_scroll_text} testID='biography'>
                {person.biography}
              </Text>
            </ScrollView>
        </View>
      </View>
      <Separator/>

      <MovieCarousel
        movieList={personMovies}
        getSelectedMovie={getSelectedMovie}
        carouselHeader="Known for"
        changeView={changeView}
      />

      <PhotoCarousel
        list={images}
      />

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
  separator: {
    marginVertical: 0.05,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  desc_main_cont: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    padding: 5,
  },
  poster_cont: {
    margin: 5,
    maxHeight: 138
  },
  poster: {
    width: 92,
    height: 138,
  },
  bio_container: {
    width: '70%',
    margin: 5,
    maxHeight: 138,
  },
  genres_cont: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  desc_cont: {
    maxHeight: "100%",
    paddingBottom: 5,
    padding: 1,
  },
  desc_scroll_text: {
    color: 'white',
    fontSize: 16
  },
})

export default ActorView;
