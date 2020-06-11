import React, {Fragment, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Video from 'react-native-video';
import Slider from '@brlja/react-native-slider';
import MusicControl from 'react-native-music-control';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import * as actionMusix from '../store/actions/music';

const VideoPlayer = props => {
  const clickedItem = useSelector(state => state.musicReducer.clickedItem);
  const dispatch = useDispatch();
  var playerRef;

  useEffect(() => {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    if (clickedItem.item) {
      MusicControl.enableBackgroundMode(true);
      MusicControl.setNowPlaying({
        title: clickedItem.item.title,
        artwork: clickedItem.item.thumbnail, // URL or RN's image require
        artist: clickedItem.item.author.name,
        duration: clickedItem.item.durationSecends, // Seconds
      });
    }
    MusicControl.on('play', () => {
      props.setStateController({
        ...props.stateController,
        play: true,
      });
    });
    MusicControl.on('pause', () => {
      props.setStateController({
        ...props.stateController,
        play: false,
      });
    });
    MusicControl.on('nextTrack', () => {
      if (clickedItem.type !== 'single') {
        dispatch(actionMusix.handleOnPressForwardSong());
      }
    });
    MusicControl.on('previousTrack', () => {
      if (clickedItem.type !== 'single') {
        dispatch(actionMusix.handleOnPressBanckwardSong());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedItem.item]);

  const progressSongTime = () => {
    var minutes = Math.floor(props.stateController.progressSong / 60);
    var seconds = Math.floor(props.stateController.progressSong - minutes * 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  return (
    <View style={styles.videoContainer}>
      {clickedItem.item ? (
        <Fragment>
          <Text numberOfLines={2} style={styles.title_song}>
            {clickedItem.item.title}
          </Text>
          <Text style={styles.author_name}>{clickedItem.item.author.name}</Text>
          <Video
            style={styles.video}
            playInBackground={true}
            ignoreSilentSwitch={'ignore'}
            resizeMode={'cover'}
            paused={!props.stateController.play}
            source={
              clickedItem.type === 'single'
                ? {
                    uri: clickedItem.item.url,
                  }
                : {uri: clickedItem.item.path}
            }
            onLoad={() => {
              props.setStateController({...props.stateController, play: true});
            }}
            onEnd={() => {
              if (clickedItem.type !== 'single') {
                dispatch(actionMusix.handleOnPressBanckwardSong());
              }
            }}
            onProgress={({currentTime}) => {
              props.setStateController({
                ...props.stateController,
                progressSong: currentTime,
              });
            }}
            ref={ref => (playerRef = ref)}
          />
          <View style={styles.container_slider}>
            <Text style={styles.text_duration}>{progressSongTime()}</Text>
            <Slider
              style={styles.slider_duration}
              thumbStyle={styles.thumbStyle}
              thumbTintColor={'white'}
              minimumTrackTintColor={'#db4532'}
              maximumTrackTintColor={'black'}
              value={props.stateController.progressSong}
              minimumValue={0}
              maximumValue={clickedItem.item.durationSecends}
              step={1}
              onValueChange={value => {
                props.setStateController({
                  ...props.stateController,
                  progressSong: value,
                });
                playerRef.seek(value);
              }}
            />
            <Text style={styles.text_duration}>
              {clickedItem.item.duration}
            </Text>
          </View>
        </Fragment>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    marginTop: '3%',
    display: 'flex',
    backgroundColor: '#232323',
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_song: {
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
    width: '85%',
    textAlign: 'center',
  },
  author_name: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    width: '85%',
    textAlign: 'center',
    marginBottom: 10,
  },
  video: {
    width: '85%',
    height: '70%',
    backgroundColor: '#232323',
    borderRadius: 5,
  },
  container_slider: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
  },
  text_duration: {
    color: 'white',
  },
  slider_duration: {
    width: '70%',
  },
  thumbStyle: {
    height: 7,
    width: 7,
  },
});

export default VideoPlayer;
