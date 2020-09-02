import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const MainCarousel = ({items}) => {
  // const { items, style } = props;
  // const itemsPerInterval = props.itemsPerInterval === undefined
  //   ? 1
  //   : props.itemsPerInterval;

  // const [intervals, setIntervals] = useState(1);
  // const [width, setWidth] = useState(0);

  // const init = (width) => {
  //   setWidth(width);
  //   const totalItems = items.length;
  //   setIntervals(Math.ceil(totalItems / itemsPerInterval));
  // }


  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
        }}
        showsHorizontalScrollIndicator={true}//
        // onContentSizeChange={(w, h) => init(w)}
        scrollEventThrottle={200}
        // pagingEnabled
        decelerationRate="fast"
      >{items.map((item) => {
        return (
          <View style={styles.itemCont}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )
      })}

      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop:1,
    backgroundColor: 'black'
  },
  itemCont: {
    backgroundColor: '#131313',
    // backgroundColor: 'grey',
    padding: 2,
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 5
  },
  itemText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white'
  }
})

export default MainCarousel;