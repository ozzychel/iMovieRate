import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

function RenderImage ({ mainObj, propToLink, defaultImg, posterContStyle, posterStyle }) {
    let filePath = mainObj.[propToLink]

    if (filePath) {
      return (
        <View style={posterContStyle}>
        <Image
            style={posterStyle}
            source={{
              uri:`https://image.tmdb.org/t/p/w154${filePath}`
            }}
        />
        </View>
      )
    } else {
      return (
        <View style={posterContStyle}>
        <Image
          source={defaultImg}
          style={posterStyle}
        />
        </View>
      )
    }
  };

export default RenderImage;