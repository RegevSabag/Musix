import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
// Icons
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Components
import Header from '../components/Header';
import ItemHistory from '../components/ItemHistory';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import * as ActionMusic from '../store/actions/music';

const History = ({navigation}) => {
  let itemsHistory = useSelector(state => state.musicReducer.itemsHistory);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');

  const renderHiddenItem = data => (
    <View style={styles.buttonHiddenContainer}>
      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => {
          dispatch(ActionMusic.deleteFromHistory(data.item.id));
        }}>
        <MaterialIcons name={'delete'} size={35} color={'white'} />
      </TouchableOpacity>
    </View>
  );

  const renderData = () => {
    let items = itemsHistory.filter(value => {
      if (inputSearch === '') {
        return value;
      } else if (
        value.title.toLowerCase().includes(inputSearch.toLowerCase())
      ) {
        return value;
      }
      return null;
    });
    return items;
  };

  const renderMinutesTotal = () => {
    let minutes = 0;
    itemsHistory.forEach(value => {
      minutes += value.durationSecends;
    });
    return (minutes / 60).toFixed(0);
  };

  return (
    <View style={styles.container_history}>
      <Header />
      <View style={styles.searchSection}>
        <EvilIcons
          style={styles.searchIcon}
          name="search"
          size={28}
          color="#707071"
        />
        <TextInput
          value={inputSearch}
          style={styles.input}
          placeholder="Search"
          underlineColorAndroid="transparent"
          placeholderTextColor="#707071"
          onChangeText={text => setInputSearch(text)}
        />
      </View>
      <View style={styles.container_ditailes_history}>
        <Text style={styles.text_ditailes}>
          {itemsHistory.length} Songs {'   ' + renderMinutesTotal()} Mins
        </Text>
      </View>
      <SwipeListView
        data={renderData()}
        style={styles.container_items}
        renderItem={({item, index}) => (
          <ItemHistory index={index} navigation={navigation} item={item} />
        )}
        disableRightSwipe
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-80}
        previewOpenDelay={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonHiddenContainer: {
    alignItems: 'center',
    backgroundColor: '#232323',
    flex: 1,
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 80,
    height: 115,
    backgroundColor: '#db4532',
    right: 0,
  },
  container_history: {
    width: '100%',
    height: '100%',
    backgroundColor: '#232323',
    display: 'flex',
    alignItems: 'center',
  },
  container_items: {
    width: '100%',
    height: '73%',
    backgroundColor: '#232323',
  },
  searchSection: {
    width: '88%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2e2e2e',
    borderRadius: 5,
    marginTop: '5%',
  },
  searchIcon: {
    padding: 8,
  },
  input: {
    width: '85%',
    height: 40,
    backgroundColor: '#2e2e2e',
    color: '#ffffff',
    fontSize: 18,
    alignItems: 'center',
  },
  container_ditailes_history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#707071',
    width: '100%',
    height: '5%',
    backgroundColor: '#232323',
  },
  text_ditailes: {
    color: '#606061',
    fontSize: 20,
  },
});

export default History;
