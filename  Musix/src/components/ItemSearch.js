import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
// Redux
import {useDispatch} from 'react-redux';
import * as ActionMusic from '../store/actions/music';

const Item = props => {
  const dispatch = useDispatch();

  const handleOnPressItem = () => {
    console.log(props.item.id);
    dispatch(
      ActionMusic.handlePressItemFromSearch(props.item, props.navigation),
    );
  };

  return (
    <TouchableOpacity style={styles.container_item} onPress={handleOnPressItem}>
      <View style={styles.container_image}>
        <Image
          style={styles.image}
          source={{
            uri: props.item.thumbnail,
          }}
        />
        <Text style={styles.duration}>{props.item.duration}</Text>
      </View>
      <View style={styles.container_ditaile}>
        <Text numberOfLines={3} style={styles.title}>
          {props.item.title}
        </Text>
        <Text numberOfLines={1} style={styles.author}>
          {props.item.author.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container_item: {
    width: '100%',
    height: 115,
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 0.3,
    borderColor: '#707071',
    paddingTop: 10,
  },
  container_image: {
    position: 'relative',
    width: '33%',
    height: '83%',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  duration: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    color: '#ecf0f1',
    paddingRight: 3,
    paddingLeft: 3,
    fontSize: 16,
  },
  container_ditaile: {
    width: '55%',
    height: '83%',
    marginLeft: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ecf0f1',
  },
  author: {
    marginTop: 8,
    fontWeight: '400',
    fontSize: 16,
    color: '#707071',
  },
});

export default Item;
