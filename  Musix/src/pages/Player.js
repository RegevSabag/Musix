import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
// Components
import Header from '../components/Header';
import VideoPlayer from '../components/VideoPlayer';
import ControllerMusic from '../components/ControllerMusic';

const Player = () => {
  const [stateController, setStateController] = useState({
    play: false,
    volume: 0.5,
    progressSong: 0,
  });

  return (
    <View style={styles.container_player}>
      <Header />
      <VideoPlayer
        stateController={stateController}
        setStateController={setStateController}
      />
      <ControllerMusic
        stateController={stateController}
        setStateController={setStateController}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container_player: {
    width: '100%',
    height: '100%',
    backgroundColor: '#232323',
    display: 'flex',
  },
});

export default Player;
