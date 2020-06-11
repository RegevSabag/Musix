import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Slider from '@brlja/react-native-slider';
import SystemSetting from 'react-native-system-setting';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import * as actionMusix from '../store/actions/music';

const ControllerMusic = props => {
  const dispatch = useDispatch();
  const clickedItem = useSelector(state => state.musicReducer.clickedItem);

  useEffect(() => {
    const volumeListener = SystemSetting.addVolumeListener(data => {
      props.setStateController({
        ...props.stateController,
        volume: data.value,
      });
    });
    return () => {
      SystemSetting.removeVolumeListener(volumeListener);
    };
  }, [props]);

  const handleOnPressPlayPause = () => {
    props.setStateController({
      ...props.stateController,
      play: !props.stateController.play,
    });
  };

  const handleOnPressBanckward = () => {
    if (clickedItem.type !== 'single') {
      dispatch(actionMusix.handleOnPressBanckwardSong());
    }
  };

  const handleOnPressForward = () => {
    if (clickedItem.type !== 'single') {
      dispatch(actionMusix.handleOnPressForwardSong());
    }
  };

  return (
    <View style={styles.container_controller}>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleOnPressBanckward}>
          <AntDesign name={'banckward'} size={42} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnPressPlayPause}>
          {props.stateController.play ? (
            <Fontisto name={'pause'} size={41} color={'white'} />
          ) : (
            <AntDesign name={'caretright'} size={42} color={'white'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnPressForward}>
          <AntDesign name={'forward'} size={42} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.container_slider_vollume}>
        <Ionicons name={'ios-volume-mute'} size={38} color={'white'} />
        <Slider
          style={styles.slider_volume}
          value={props.stateController.volume}
          onValueChange={value => SystemSetting.setVolume(value)}
          minimumValue={0}
          maximumValue={1}
          thumbTintColor={'white'}
          thumbStyle={styles.thumbStyle}
          minimumTrackTintColor={'#db4532'}
          maximumTrackTintColor={'black'}
        />
        <Ionicons name={'ios-volume-high'} size={38} color={'white'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_controller: {
    width: '100%',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#232323',
    alignItems: 'center',
    marginTop: '5%',
  },
  buttons: {
    width: '68%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container_slider_vollume: {
    marginTop: 20,
    width: '93%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  slider_volume: {
    width: '70%',
  },
  thumbStyle: {
    height: 15,
    width: 15,
  },
});

export default ControllerMusic;
