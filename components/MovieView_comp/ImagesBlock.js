import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import keys from '../../config';
import RenderImage from '../helperFunctions/RenderImage';
import ImageView from 'react-native-image-viewing';

const windowWidth = Dimensions.get('window').width;

const ImagesBlock = ({ movie_title, release_date, imageUrls }) => {
  // console.log('IMAGE_URLS LENGTH', imageUrls.length)

  const scroll = React.createRef();

  const [visible, setIsVisible] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if(imageUrls.length) {
      scroll.current.scrollTo({x:0, animated: false});
    }
  }, [imageUrls])

  const previewThumbs = imageUrls;
  const thumbsPerBlock = 9;
  const blocks = [];
  for(let i = 0; i < previewThumbs.length; i += thumbsPerBlock) {
    let inner = [];
    blocks.push(previewThumbs.slice(i, i + thumbsPerBlock));
  }

  const fullSizeImages = [];
  for(let i = 0; i < previewThumbs.length; i++) {
    fullSizeImages.push({uri:previewThumbs[i]['image']})
  }
  // console.log('FULL', fullSizeImages)
  const calculateIndex = (i, j) => {
    console.log(i,j)
    if(i === 0) {
      setCurrentIndex(j);
      return;
    } else {
      setCurrentIndex(i * 9 + j)
      return;
    }

  }

  return imageUrls.length > 0 ? (
    <View>

    <View style={styles.main_cont}>

      <View style={styles.subtitle_seeAllbutton_cont}>

        <View style={styles.subtitle_cont}>
          <Text style={styles.subtitle_text}>Images ({imageUrls.length})</Text>
        </View>

        <TouchableOpacity>
          <View style={styles.seeAllbutton_cont}>
            <Text style={styles.seeAllbutton_text}>SEE ALL</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        pagingEnabled
        ref={scroll}
      >
       {blocks.map((block, i) => (
          <View style={styles.scrollView_block} key={i}>
            {block.map((thumb, j) => (
              <TouchableOpacity
                key={j}
                onPress={ event => {
                  i === 0 ? setCurrentIndex(j) : setCurrentIndex(i * thumbsPerBlock + j);
                  setIsVisible(true)
                }}
                >
                <RenderImage
                  mainObj={thumb}
                  baseUrl=''
                  propToLink='preview'
                  posterContStyle={styles.thumb_image_cont}
                  posterStyle={styles.thumb_image}
                />
              </TouchableOpacity>
            ))}
          </View>
       ))}
      </ScrollView>

      <ImageView
        images={fullSizeImages}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

    </View>
    </View>
  )
  :
  null
}

const styles = StyleSheet.create({
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
  thumb_image_cont: {
    borderColor: '#1f1f1f',
    borderWidth: 1,
    width: Math.floor(windowWidth / 3) -1,
    height: Math.floor(windowWidth / 3) -1,
  },
  thumb_image: {
    width: '100%',
    height: '100%'
  },
  scrollView_block: {
    borderColor: 'white',
    width: windowWidth,
    maxHeight: windowWidth*2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#1f1f1f'
  }
})

export default ImagesBlock;


