import React, {Fragment} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
// Icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Redux
import {useDispatch} from 'react-redux';
import * as ActionMusic from '../store/actions/music';

const Item = props => {
  const dispatch = useDispatch();

  const handleOnPressItem = () => {
    console.log(props.index);
    dispatch(
      ActionMusic.handlePressItemFromHistory(
        props.item,
        props.navigation,
        props.index,
      ),
    );
  };

  const handleOnPressToggleFavorite = id => {
    dispatch(ActionMusic.toggleFavorite(id));
  };

  return (
    <TouchableHighlight
      style={styles.container_item}
      activeOpacity={0.1}
      underlayColor="black"
      onPress={handleOnPressItem}>
      <Fragment>
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
        <TouchableOpacity
          onPress={() => {
            handleOnPressToggleFavorite(props.item.id);
          }}>
          <MaterialIcons
            name={'favorite'}
            size={33}
            color={props.item.favorite ? '#db4532' : 'white'}
          />
        </TouchableOpacity>
      </Fragment>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container_item: {
    alignItems: 'center',
    backgroundColor: '#232323',
    borderColor: '#707071',
    borderTopWidth: 0.3,
    justifyContent: 'center',
    height: 115,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  container_image: {
    position: 'relative',
    width: '32%',
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
    width: '48%',
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
