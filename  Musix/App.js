import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
// Redux
import {SET_ITEMS_HISTORY} from './src/store/actions/types';
import {Provider} from 'react-redux';
import Store from './src/store';
// Navigation
import TabNavigation from './src/components/TabNavigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    AsyncStorage.getItem('itemsHistory').then(res => {
      console.log(JSON.parse(res));
      if (res) {
        Store.dispatch({type: SET_ITEMS_HISTORY, payload: JSON.parse(res)});
      }
    });
  }, []);

  return (
    <Provider store={Store}>
      <TabNavigation />
    </Provider>
  );
};

export default App;
