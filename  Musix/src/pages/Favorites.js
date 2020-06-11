import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
// Icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Components
import Header from '../components/Header';
import ItemFavorite from '../components/ItemFavorite';
// Redux
import {useSelector} from 'react-redux';

const Favorites = ({navigation}) => {
  let favorites = useSelector(state =>
    state.musicReducer.itemsHistory.filter(value => value.favorite === true),
  );

  return (
    <View style={styles.container_search}>
      <Header />
      {!favorites.length ? (
        <View style={styles.container_landingScreen}>
          <Text style={styles.text_landingScreen}>
            Add songs{'\n'}to your favorites
          </Text>
          <MaterialIcons name={'favorite'} size={43} color={'#db4532'} />
        </View>
      ) : (
        <FlatList
          data={favorites}
          style={styles.container_items}
          renderItem={({item, index}) => (
            <ItemFavorite index={index} navigation={navigation} item={item} />
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
  container_landingScreen: {
    display: 'flex',
    marginTop: 20,
    width: '100%',
    height: '73%',
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_landingScreen: {
    color: '#606061',
    fontSize: 27,
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default Favorites;
