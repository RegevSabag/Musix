import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
// Components
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import ItemSearch from '../components/ItemSearch';
// Redux
import {useSelector} from 'react-redux';

const Search = ({navigation}) => {
  const videos = useSelector(state => state.musicReducer.searchVideos);
  const loading = useSelector(state => state.musicReducer.loading);

  return (
    <View style={styles.container_search}>
      <Header />
      <InputSearch />
      {loading ? (
        <View style={styles.container_activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : !videos.length ? (
        <View style={styles.container_activityIndicator}>
          <Text style={styles.text_landingScreen_title}>Hello</Text>
          <Text style={styles.text_landingScreen}>
            <Text style={styles.text_landingScreen_bold}>
              Wellcom to Musix{'\n'}
            </Text>
            Type something to search and {'\n'}download videos.
          </Text>
        </View>
      ) : (
        <FlatList
          data={videos}
          style={styles.container_items}
          renderItem={({item}) => (
            <ItemSearch navigation={navigation} item={item} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container_search: {
    width: '100%',
    height: '100%',
    backgroundColor: '#232323',
    display: 'flex',
    alignItems: 'center',
  },
  container_items: {
    marginTop: 20,
    width: '100%',
    height: '73%',
    borderTopWidth: 0.3,
    borderColor: '#707071',
    backgroundColor: '#232323',
  },
  container_activityIndicator: {
    display: 'flex',
    marginTop: 20,
    width: '100%',
    height: '73%',
    borderTopWidth: 0.3,
    borderColor: '#707071',
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_landingScreen_title: {
    color: '#db4532',
    fontSize: 45,
    fontWeight: '700',
  },
  text_landingScreen_bold: {
    color: '#606061',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: '500',
  },
  text_landingScreen: {
    color: '#606061',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Search;
