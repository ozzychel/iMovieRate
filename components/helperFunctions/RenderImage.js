import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';

function RenderImage ({ mainObj, baseUrl, propToLink, defaultImg, posterContStyle, posterStyle, spinnerSize='large', spinnerColor='#FFD700', spinnerBg='#1f1f1f'}) {

  const [isLoading, setIsLoading] = useState(false);
  const filePath = mainObj.[propToLink];

  const LoadingView = () => {
    return (
      <View style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: spinnerBg,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <ActivityIndicator size={spinnerSize} color={spinnerColor}/>
      </View>
    )
  }

    return (
      <View style={posterContStyle}>
        <Image
          source={
            filePath ? {uri:`${baseUrl}${filePath}`} : defaultImg
          }
          style={posterStyle}
          onLoadStart={ () => { setIsLoading(true) }}
          onLoadEnd={ () => { setIsLoading(false)
          }}
        />
          {isLoading && <LoadingView/>}
      </View>
    )
  };

export default RenderImage;