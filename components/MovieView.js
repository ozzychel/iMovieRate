import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import keys from '../config.js';
import moment from 'moment';

const MovieView = ({ selectedMovie, genresList }) => {
  const movie_tmdb = selectedMovie[0];
  const [castList, setCastList] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [topCastList, setTopCastList] = useState([]);
  const [movie_omdb, setMovie_omdb] = useState({});


  useEffect(() => {
    getCastListFromServer(movie_tmdb.id)
  }, []);

  useEffect(() => {
    getDataFromOMDB(movie_tmdb.imdb_id)
  }, [])

  const getDataFromOMDB = (id) => {
    axios.get(`http://www.omdbapi.com/`, {
      params: {
        i: id,
        apikey: keys.omdb_api_key
      }
    })
    .then((result) => {
      console.log('OMDB GET SUCCESS', result.data);
      setMovie_omdb(result.data);
    })
    .catch((err) => {
      console.log('OMDB GETT ERROR', err)
    })
  }

  const getCastListFromServer = (movieId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      params: {
        api_key: keys.tmdb_api_key
      }
    })
    .then((result) => {
      console.log('CREDITS GET SUCCESS');
      setCastList(result.data.cast);
      setCrewList(result.data.crew);
      setTopCastList(result.data.cast.slice(0, 20))
    })
    .catch((err) => {
      console.log('CAST GET ERROR', err)
    })
  }

  const runtime = moment.utc(moment.duration(movie_tmdb.runtime, "minutes").asMilliseconds()).format(`H:mm`);

  const renderGenres = (genresArr) => {
    let genreBlocks = [];
    genresArr.forEach((genre, i) => {
      genreBlocks.push(
        <View key={i} style={styles.genres_block}>
          <Text style={styles.genres_text}>
            {genre}
          </Text>
        </View>
        )
    })


    return (
      <ScrollView
        style={styles.genres_cont}
        horizontal={true}
        >
        {genreBlocks}
      </ScrollView>
    )
  }

  const renderImage = () => {
    if (movie_tmdb.poster_path) {
      return (
        <View style={styles.poster_cont}>
        <Image
            style={styles.poster}
            source={{
              uri:`https://image.tmdb.org/t/p/w154${movie_tmdb.poster_path}`
            }}
        />
        </View>
      )
    } else {
      return (
        <View style={styles.poster_cont}>
        <Image
        source={require('../default.jpg')}
        style={styles.poster}
        />
        </View>
      )
    }
  };

  const renderTagline = () => {
    return movie_tmdb.tagline ?
    <View style={styles.tagline_cont}>
      <Text style={styles.tagline_text}>{`"${movie_tmdb.tagline}"`}</Text>
      <Separator/>
    </View> :
    null
  }

  const renderActorImage = (file_path) => {
    if (file_path) {
      return (
        <Image
            style={styles.actor_image}
            source={{
              uri:`https://image.tmdb.org/t/p/w154${file_path}`
            }}
        />
      )
    } else {
      return (
        <Image
        style={styles.actor_image}
          source={require('../default.jpg')}
        />
      )
    }
  }

  const Separator = () => (
    <View style={styles.separator} />
  );

  const genres = [];
  movie_tmdb.genres.forEach((obj) => {
    genres.push(genresList[obj.id]);
  });


  return (
    // PICTURE CAROUSEL
    // TITLE
    // DESCription BLOCK
    // ADD TO WATCHLIST

    // RATINGS BLOCK

    // CAST ACTORS
    // NEWS, UPDATES....
    // VIDEOS
    // IMAGES
    // AWARDS
    // REVIEWS
    <ScrollView contentContainerStyle={styles.tab_cont}>

      <View style={styles.title_cont}>
        <View>
          <Text style={styles.title_text}>
              {selectedMovie[0].title}
          </Text>
        </View>
        <View style={styles.year_duration_cont}>
          <Text style={styles.year_duration_text}>{selectedMovie[0].release_date.slice(0,4)}</Text>
          <Text style={styles.year_duration_text}>{runtime + 'h'}</Text>
        </View>
      </View>

      <Separator/>
      <View style={styles.desc_main_cont}>
          {renderImage()}
        <View style={styles.genres_desc_cont}>
            {renderGenres(genres)}

            <ScrollView style={styles.desc_cont}>
              <Text style={styles.desc_text}>{movie_tmdb.overview}</Text>
            </ScrollView>

        </View>
      </View>
      <Separator />

      <View>
        {renderTagline()}
      </View>
      <Separator/>

      <View style={styles.addWatchList_cont}>
        <TouchableOpacity>
          <View style={styles.addButton_cont}>
            <View style={styles.addButton_icon_cont}>
              <Text style={styles.addButton_icon_text}>+</Text>
            </View>
            <View style={styles.addButton_text_cont}>
              <Text style={styles.addButton_text}>ADD TO WATCHLIST</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Separator/>

      <View style={styles.ratings_cont}>
        <Text style={{color:'#737373'}}>Ratings block</Text>
      </View>
      <Separator/>



      <View style={styles.cast_cont}>

        <View style={styles.cast_heading}>
          <View style={styles.cast_heading_subtitle_cont}>
            <Text style={styles.subtitle}>Top Billed Cast</Text>
          </View>
          <TouchableOpacity>
          <View style={styles.cast_heading_seeAllbutton_cont}>
            <Text style={styles.cast_heading_seeAllbutton_text}>SEE ALL</Text>
          </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          //carousel
          // style={styles.cast_carousel}
          horizontal={true}
          contentContainerStyle={styles.cast_carousel}
          showsHorizontalScrollIndicator={false}
          // onContentSizeChange={(w, h) => init(w)}
          scrollEventThrottle={200}
          // pagingEnabled
          decelerationRate="fast"
          >{topCastList.map((actor, i) => {
            return (
              <View key={i} style={styles.cast_actor_cont}>

                <View style={styles.cast_actor_image}>
                  {renderActorImage(actor.profile_path)}
                </View>

                <View style={styles.cast_actor_name}>
                  <Text style={styles.cast_actor_name_text}>{actor.name}</Text>
                </View>

                <View style={styles.cast_actor_character}>
                  <Text style={styles.cast_actor_character_text}>{actor.character}
                  </Text>
                </View>

              </View>
            )
          })}

          </ScrollView>

        <View style={styles.cast_writers}>
          <Text style={styles.cast_actor_name_text}>Director</Text>
        </View>
        <View style={styles.cast_writers}>
          <Text style={styles.cast_actor_character_text}>
            {movie_omdb['Director']}
          </Text>
        </View>

        <View style={styles.cast_writers}>
          <Text style={styles.cast_actor_name_text}>Writer</Text>
        </View>
        <View style={styles.cast_writers}>
          <Text style={styles.cast_actor_character_text}>
            {movie_omdb['Writer']}
          </Text>
        </View>

      </View>



    </ScrollView>
  )
};

const styles = StyleSheet.create({
  tab_cont: {
    height: 2000,
    backgroundColor: '#131313'
  },
  separator: {
    marginVertical: 0.05,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subtitle: {
    color: 'white',
    fontSize: 26
  },
  title_cont: {
    backgroundColor: '#1f1f1f',
    maxHeight: 150
  },
  title_text: {
    fontSize: 34,
    color: 'white',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  year_duration_cont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 7
  },
  year_duration_text: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#737373'
  },
  desc_main_cont: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    padding: 5
  },
  poster_cont: {
    margin: 5,
    maxHeight: 138
  },
  poster: {
    width: 92,
    height: 138,
  },
  genres_desc_cont: {
    width: '70%',
    margin: 5,
    maxHeight: 138
  },
  genres_cont: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  genres_block: {
    padding: 5,
    marginRight: 10,
    borderColor: '#737373',
    borderWidth: 2,
    borderRadius: 6
  },
  genres_text: {
    fontSize: 16,
    color: 'white'
  },
  desc_cont: {
    paddingBottom: 5,
    maxHeight: 90
  },
  desc_text: {
    color: 'white',
    fontSize: 16
  },
  tagline_cont: {
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    padding: 10
  },
  tagline_text: {
    color: '#737373',
    fontSize: 18,
    fontStyle: 'italic'
  },
  addWatchList_cont: {
    backgroundColor: '#1f1f1f',
    padding: 12
  },
  addButton_cont: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#313131',
    borderRadius: 5

  },
  addButton_icon_cont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 7,
  },
  addButton_icon_text: {
    color: 'white',
    fontSize: 22
  },
  addButton_text_cont: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 7,
  },
  addButton_text: {
    paddingTop: 2,
    color: 'white',
    fontSize: 14
  },
  ratings_cont: {
    backgroundColor: '#1f1f1f',
    height: 50
  },
  cast_cont: {
    marginTop: 20,
    backgroundColor: '#1f1f1f',
  },
  cast_heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  cast_heading_subtitle_cont: {
    padding: 5,
  },
  cast_heading_seeAllbutton_cont: {
    padding: 10,
  },
  cast_heading_seeAllbutton_text: {
    paddingTop: 3,
    justifyContent: 'flex-end',
    color: '#1472f1',
    fontSize: 18,
    fontWeight: '600'
  },
  cast_carousel: {
    backgroundColor: '#1f1f1f',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15
  },
  cast_actor_cont: {
    height: 330,
    maxWidth: 150,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
	    width: 3,
	    height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actor_image: {
    height: 225,
    width: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cast_actor_name: {
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center',
    backgroundColor: '#1f1f1f'

  },
  cast_actor_character: {
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cast_actor_name_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  cast_actor_character_text: {
    color: '#737373',
    fontSize: 16,
    paddingRight: 2
  },
  cast_writers: {
    height: 40,
    paddingLeft: 10,
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
  }

});

export default MovieView;