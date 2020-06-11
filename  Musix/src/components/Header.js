import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Logo from '../images/Musix_logo.png';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 1,
    width: '100%',
    display: 'flex',
    height: '15%',
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  logo: {
    marginTop: '9%',
    width: 150,
    height: 120,
  },
});

export default Header;
