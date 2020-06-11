import axios from 'axios';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SET_SEARCH_VIDEO,
  SET_LOADING,
  SET_ITEM_CLICKED,
  ADD_ITEM_HISTORY,
  ADD_ITEM_FAVORITE,
  SET_ITEMS_HISTORY,
} from './types';

export const search = searchKey => async dispatch => {
  dispatch({type: SET_LOADING, payload: true});
  axios
    .get('https://musix-server.herokuapp.com/search?key=' + searchKey)
    .then(function(response) {
      dispatch({type: SET_SEARCH_VIDEO, payload: response.data});
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

export const handlePressItemFromSearch = (item, navigation) => async (
  dispatch,
  getState,
) => {
  dispatch({type: SET_LOADING, payload: true});
  const itemsHistory = getState().musicReducer.itemsHistory;
  let index_cheacked;
  // chacked if item save in history
  const item_cheacked = itemsHistory.filter((value, index) => {
    if (value.link === item.link) {
      index_cheacked = index;
      return value;
    }
  });
  // if item found in history
  if (item_cheacked.length) {
    console.log('found in history');
    dispatch({
      type: SET_ITEM_CLICKED,
      payload: {
        item: item_cheacked[0],
        type: 'multiple',
        index: index_cheacked,
      },
    });
    navigation.navigate('Player');
    // if item not found in history
  } else {
    console.log('not found in history');
    axios
      .get('https://musix-server.herokuapp.com/download?url=' + item.link)
      .then(function(response) {
        item.url = response.data.url;
        item.favorite = false;
        item.durationSecends = Math.floor(
          response.data.approxDurationMs * 0.001,
        );
        dispatch({type: SET_ITEM_CLICKED, payload: {item, type: 'single'}});
        console.log(`${RNFS.DocumentDirectoryPath}/${item.id}.mp4`);
        navigation.navigate('Player');
        // Download song on background
        RNFS.downloadFile({
          fromUrl: item.url,
          toFile: `${RNFS.DocumentDirectoryPath}/${item.id}.mp4`,
          background: true,
          discretionary: true,
          cacheable: true,
          begin: res => {
            console.log(res);
          },
          progress: res => {
            let progressPercent = (res.bytesWritten / res.contentLength) * 100; //calculate in percentage
            console.log('\nprogress: ', progressPercent);
          },
        })
          .promise.then(res => {
            console.log(`${RNFS.DocumentDirectoryPath}/${item.id}.mp4`);
            item.path = `${RNFS.DocumentDirectoryPath}/${item.id}.mp4`;
            // Save songs on asyncStorage
            AsyncStorage.getItem('itemsHistory').then(res_itemsHistory => {
              if (!res_itemsHistory) {
                let items = [item];
                AsyncStorage.setItem('itemsHistory', JSON.stringify(items));
              } else {
                let items = JSON.parse(res_itemsHistory);
                items.push(item);
                AsyncStorage.setItem('itemsHistory', JSON.stringify(items));
              }
            });
            dispatch({type: ADD_ITEM_HISTORY, payload: item});
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }
};

export const handlePressItemFromHistory = (
  item,
  navigation,
  index,
) => async dispatch => {
  dispatch({
    type: SET_ITEM_CLICKED,
    payload: {item, type: 'multiple-history', index},
  });
  navigation.navigate('Player');
};

export const handlePressItemFromFavorites = (
  item,
  navigation,
  index,
) => async dispatch => {
  dispatch({
    type: SET_ITEM_CLICKED,
    payload: {item, type: 'multiple-favorites', index},
  });
  navigation.navigate('Player');
};

export const toggleFavorite = id => async dispatch => {
  AsyncStorage.getItem('itemsHistory').then(res_itemsHistory => {
    let items = JSON.parse(res_itemsHistory);
    items = items.filter(value => {
      if (value.id === id) {
        value.favorite = !value.favorite;
      }
      return value;
    });
    AsyncStorage.setItem('itemsHistory', JSON.stringify(items));
  });
  dispatch({type: ADD_ITEM_FAVORITE, payload: id});
};

export const deleteFromHistory = id => async dispatch => {
  // create a path to delete
  let path = RNFS.DocumentDirectoryPath + '/' + id + '.mp4';
  RNFS.unlink(path)
    .then(() => {
      console.log('FILE DELETED');
      AsyncStorage.getItem('itemsHistory').then(res_itemsHistory => {
        let items = JSON.parse(res_itemsHistory);
        items = items.filter(value => value.id !== id);
        AsyncStorage.setItem('itemsHistory', JSON.stringify(items));
        dispatch({type: SET_ITEMS_HISTORY, payload: items});
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const handleOnPressBanckwardSong = () => async (dispatch, getState) => {
  const clickedItem = getState().musicReducer.clickedItem;
  const itemsHistory = getState().musicReducer.itemsHistory;
  const itemsFavorites = itemsHistory.filter(value => value.favorite === true);

  if (clickedItem.index === 0) {
    dispatch({
      type: SET_ITEM_CLICKED,
      payload: {
        item:
          clickedItem.type === 'multiple-history'
            ? itemsHistory[itemsHistory.length - 1]
            : itemsFavorites[itemsFavorites.length - 1],
        type: clickedItem.type,
        index:
          clickedItem.type === 'multiple-history'
            ? itemsHistory.length - 1
            : itemsFavorites.length - 1,
      },
    });
  } else {
    dispatch({
      type: SET_ITEM_CLICKED,
      payload: {
        item:
          clickedItem.type === 'multiple-history'
            ? itemsHistory[clickedItem.index - 1]
            : itemsFavorites[clickedItem.index - 1],
        type: clickedItem.type,
        index: clickedItem.index - 1,
      },
    });
  }
};

export const handleOnPressForwardSong = () => async (dispatch, getState) => {
  const clickedItem = getState().musicReducer.clickedItem;
  const itemsHistory = getState().musicReducer.itemsHistory;
  const itemsFavorites = itemsHistory.filter(value => value.favorite === true);

  if (
    (clickedItem.index === itemsHistory.length - 1 &&
      clickedItem.type === 'multiple-history') ||
    (clickedItem.index === itemsFavorites.length - 1 &&
      clickedItem.type === 'multiple-favorites')
  ) {
    dispatch({
      type: SET_ITEM_CLICKED,
      payload: {
        item:
          clickedItem.type === 'multiple-history'
            ? itemsHistory[0]
            : itemsFavorites[0],
        type: clickedItem.type,
        index: 0,
      },
    });
  } else {
    dispatch({
      type: SET_ITEM_CLICKED,
      payload: {
        item:
          clickedItem.type === 'multiple-history'
            ? itemsHistory[clickedItem.index + 1]
            : itemsFavorites[clickedItem.index + 1],
        type: clickedItem.type,
        index: clickedItem.index + 1,
      },
    });
  }
};
