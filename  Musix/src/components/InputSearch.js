import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// Redux
import {useDispatch} from 'react-redux';
import * as actionMusic from '../store/actions/music';

const InputSearch = () => {
  const [searchKey, setsearchKey] = useState('');
  const dispatch = useDispatch();

  const handleClickSearch = () => {
    if (searchKey === '') {
      Alert.alert("Can't search empty key.");
    } else {
      dispatch(actionMusic.search(searchKey));
    }
  };

  return (
    <View style={styles.container_input}>
      <View style={styles.searchSection}>
        <EvilIcons
          style={styles.searchIcon}
          name="search"
          size={28}
          color="#707071"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          underlineColorAndroid="transparent"
          placeholderTextColor="#707071"
          onChangeText={text => setsearchKey(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.button_search}
        onPress={handleClickSearch}>
        <Text style={styles.text_button}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container_input: {
    display: 'flex',
    width: '95%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button_search: {
    display: 'flex',
    height: 38,
    width: '20%',
    backgroundColor: '#db4532',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text_button: {
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '400',
  },
  searchSection: {
    width: '76%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2e2e',
    borderRadius: 5,
  },
  searchIcon: {
    padding: 8,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#2e2e2e',
    color: '#ffffff',
    fontSize: 18,
    alignItems: 'center',
  },
});

export default InputSearch;
