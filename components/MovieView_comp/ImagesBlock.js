import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import keys from '../../config';
import RenderImage from '../helperFunctions/RenderImage';

const ImagesBlock = ({ movie_title, release_date, imageUrls}) => {
  console.log('LOG FROM IMAGEBLOCK', imageUrls.length)

  const thumbs = [];
  const previewThumbs = imageUrls.slice(0,8);
  previewThumbs.forEach((thumb, i) => {
    thumbs.push(
      // <View key={i}>
        <RenderImage
          key={i}
          mainObj={thumb}
          baseUrl=''
          propToLink='preview'
          posterContStyle={styles.thumb_image_cont}
          posterStyle={styles.thumb_image}
        />
      // </View>
    )
  })

  return imageUrls.length > 0 ? (
    <View>

    <View style={styles.main_cont}>

      <View style={styles.subtitle_seeAllbutton_cont}>

        <View style={styles.subtitle_cont}>
          <Text style={styles.subtitle_text}>Images</Text>
        </View>

        <TouchableOpacity>
          <View style={styles.seeAllbutton_cont}>
            <Text style={styles.seeAllbutton_text}>SEE ALL</Text>
          </View>
        </TouchableOpacity>

      </View>

      <View style={styles.thumbs_board}>
        {thumbs}
      </View>

    </View>



    </View>
  )
  :
  (<View>
    <Text style={styles.test}>Images(0)</Text>
  </View>)
}

const styles = StyleSheet.create({
  test: {
    color:'white'
  },
  main_cont: {
    marginTop: 20,
    backgroundColor: '#1f1f1f',
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  subtitle_seeAllbutton_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  subtitle_cont: {
    padding: 5,
  },
  seeAllbutton_cont: {
    padding: 10,
  },
  subtitle_text: {
    color: 'white',
    fontSize: 26
  },
  seeAllbutton_text: {
    paddingTop: 3,
    justifyContent: 'flex-end',
    color: '#1472f1',
    fontSize: 18,
    fontWeight: '600'
  },
  thumbs_board: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#1f1f1f',
    paddingLeft: 5,
    paddingRight: 5

    // height: 280,
    // borderWidth: 1,
    // borderColor: 'green'
  },
  thumb_image_cont: {
    marginTop: 8,
    width: 180,

    shadowColor: "#000",
    shadowOffset: {
	    width: 3,
	    height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumb_image: {
    width: 187,
    height: 102
  },
})

export default ImagesBlock;


// const Item = ({ preview_url }) => (
//   <View style={styles.image_thumb_cont}>
//     <Image
//       style={styles.image_thumb}
//       source={{uri:preview_url}}
//     />
//   </View>
// );

// const renderItem = ({ item }) => (
//   <Item preview_url={item.preview} />
// );

// return imageUrls.length > 0 ? (
//   <View>
//     <FlatList
//       data={imageUrls}
//       renderItem={renderItem}
//       keyExtractor={item => item.preview.slice(-14)}
//     />
//   </View>
// )
