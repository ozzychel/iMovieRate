import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const TrailerBlock = ({ movieTrailer }) => {
  const windowWidth = Dimensions.get('window').width;
  return movieTrailer.length > 0 ? (
    <View>
      <View style={styles.main_cont}>

      <View style={styles.block_heading}>
        <View style={styles.block_heading_subtitle_cont}>
          <Text style={styles.subtitle}>Trailer</Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <WebView
          style={{
            marginTop: (Platform.OS == 'android') ? 20 : 0,
            width: windowWidth,
            height: windowWidth * .56,
            padding: 5
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{uri: `https://www.youtube.com/embed/${movieTrailer[0].key}` }}
        />
      </View>

      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  subtitle: {
    color: 'white',
    fontSize: 26
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
  block_heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  block_heading_subtitle_cont: {
    padding: 5
  }
})

export default TrailerBlock;