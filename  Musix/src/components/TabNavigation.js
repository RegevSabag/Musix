import React from 'react';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Pages
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';
import History from '../pages/History';
import Player from '../pages/Player';
// Vector Icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => {
            if (route.name === 'Search') {
              return <Fontisto name={'search'} size={33} color={color} />;
            } else if (route.name === 'Favorites') {
              return (
                <MaterialIcons name={'favorite'} size={36} color={color} />
              );
            } else if (route.name === 'History') {
              return <MaterialIcons name={'history'} size={36} color={color} />;
            } else if (route.name === 'Player') {
              return (
                <Ionicons name={'ios-musical-notes'} size={36} color={color} />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ec3323',
          inactiveTintColor: '#707071',
          showLabel: false,
          style: {
            display: 'flex',
            backgroundColor: '#232323',
            height: '12%',
            borderTopColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Player" component={Player} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
