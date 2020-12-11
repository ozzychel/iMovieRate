import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MainCarousel = ({items, currentTab, changeView}) => {

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
      >{items.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={styles.itemCont}
            onPress={()=> {
              changeView(item.title)
            }}
            >
            <Text style={styles.itemText}>{item.title}</Text>
            <View style={item.title === currentTab ? styles.bulletActive : styles.bullet}></View>
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
    backgroundColor: 'black',
    minHeight: 35
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