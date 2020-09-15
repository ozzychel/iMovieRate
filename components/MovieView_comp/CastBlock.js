import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CastBlock = ({ topCastList, movie_omdb }) => {

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
          source={require('../../default.jpg')}
        />
      )
    }
  }

  return (
    <View>
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
        horizontal={true}
        contentContainerStyle={styles.cast_carousel}
        showsHorizontalScrollIndicator={false}
        // onContentSizeChange={(w, h) => init(w)}
        scrollEventThrottle={200}
        // pagingEnabled
        decelerationRate="fast"
        >
          {topCastList.map((actor, i) => {
            return (
              <View key={i} style={styles.cast_actor_cont}>

                <View style={styles.cast_actor_image}>
                  {renderActorImage(actor.profile_path)}
                </View>

                <View style={styles.cast_actor_name}>
                  <Text style={styles.cast_actor_name_text}>
                    {actor.name}
                  </Text>
                </View>

                <View style={styles.cast_actor_character}>
                  <Text style={styles.cast_actor_character_text}>{actor.character}
                  </Text>
                </View>

            </View>
           )
        })}
        </ScrollView>

        <View style={styles.cast_writers_job_cont}>
          <Text style={styles.cast_writers_job_text}>Director</Text>
        </View>

        <View style={styles.cast_writers_name_cont}>
          <Text style={styles.cast_writers_name_text}>
            {movie_omdb['Director']}
          </Text>
        </View>

        <View style={styles.cast_writers_job_cont}>
          <Text style={styles.cast_writers_job_text}>Writer</Text>
        </View>

        <View style={styles.cast_writers_name_cont}>
          <Text style={styles.cast_writers_name_text}>
            {movie_omdb['Writer']}
          </Text>
        </View>

      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 0.05,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subtitle: {
    color: 'white',
    fontSize: 26
  },
  cast_cont: {
    marginTop: 20,
    backgroundColor: '#1f1f1f',
    paddingBottom: 10
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
    paddingRight: 5,
    paddingLeft: 8,
    paddingTop: 10,
    justifyContent: 'center',
    backgroundColor: '#313131'
  },
  cast_actor_character: {
    height: 50,
    paddingRight: 5,
    paddingLeft: 8,
    justifyContent: 'center',
    backgroundColor: '#313131',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cast_actor_name_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cast_actor_character_text: {
    color: '#737373',
    fontSize: 16,
  },
  cast_writers_job_cont: {
    paddingLeft: 10,
    paddingTop: 10
  },
  cast_writers_job_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  cast_writers_name_cont: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 1
  },
  cast_writers_name_text: {
    color: '#737373',
    fontSize: 16,
    paddingRight: 1
  }
})

export default CastBlock;