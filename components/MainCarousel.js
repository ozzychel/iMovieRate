import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MainCarousel = ({items, active, handleTabPress}) => {
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
  const [activeTab, setActiveTab] = useState(active)

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
        }}
        showsHorizontalScrollIndicator={false}//
        // onContentSizeChange={(w, h) => init(w)}
        scrollEventThrottle={200}
        // pagingEnabled
        decelerationRate="fast"
      >{items.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={styles.itemCont}
            onPress={()=> {
              setActiveTab(item.title)
              handleTabPress(item.title)
            }}
            >
            <Text style={styles.itemText}>{item.title}</Text>
            <View style={item.title === activeTab ? styles.bulletActive : styles.bullet}></View>
          </TouchableOpacity>
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
    backgroundColor: 'black',
    padding: 7,
    marginLeft: 10,
    marginRight: 5
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white'
  },
  bulletActive: {
    height: 2,
    backgroundColor: 'green'
  },
  bullet: {
    height: 2,
    backgroundColor: 'black'
  }
})

export default MainCarousel;