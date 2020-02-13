import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import Sound from 'react-native-sound';
import {vh, vw} from '../constants/Dimensions';
var song = null;

export default class AudioHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      volume: 0.5,
      currentTime: 0,
      duration: 207,
    };
  }
  // _loadAudio = () => {
  //     const sound = new Sound(
  //       'https://archive.org/details/Mp3Songs_175/dabangg02www.songs.pk.mp3',
  //       undefined,
  //       (error) => {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log('Playing sound');
  //           sound.play(() => {
  //             sound.release();
  //           });
  //         }
  //       }
  //     );
  //   };

  //   componentDidMount() {
  //       console.log('chla')
  //     this._loadAudio();
  //   };
  // https://www.soundjay.com/button/button-1.mp3

  volumeUp = () => {
    this.setState({volume: this.state.volume + 0.2}, () => {
      if (this.state.volume > 5) {
        return alert('Reached on Maximum value');
      } else {
        song.setVolume(this.state.volume);
      }
    });
  };
  volumeDown = () => {
    this.setState({volume: this.state.volume - 0.2}, () => {
      if (this.state.volume < 0) {
        return alert('Reached on Minimum value');
      } else {
        song.setVolume(this.state.volume);
      }
    });
  };

  onpressPlay = () => {
    // console.warn(song.getVolume);

    song = new Sound('oldschool.mp3', Sound.MAIN_BUNDLE, error => {
      song.setVolume(this.state.volume);
      // console.warn(this.state.volume);
      song.getDuration(time => {
        this.setState({duration: time});
      });
      setInterval(() => {
        song.getCurrentTime(seconds => {
          this.setState({
            currentTime: seconds,
          });
        });
      }, 100);

      if (error) {
        alert('error aagya');
      } else {
        song.play(success => {
          if (!success) {
            alert('error on play');
          }
        });
      }
    });
  };

  onpressPause = () => {
    if (song != null) {
      if (this.state.pause)
        song.play(success => {
          if (!success) {
            alert('error on play');
          }
        });
      else song.pause();

      this.setState({pause: !this.state.pause});
    }
  };

  frwrdSong = () => {
    song.getCurrentTime(seconds => song.setCurrentTime(seconds + 10));
  };

  bckwrdSong = () => {
    song.getCurrentTime(seconds => song.setCurrentTime(seconds - 10));
  };
  stopSong = () => {
    song.stop();
  };

  halfVolume = () => {
    // console.warn("awaj km");

    // half the volume
    song.setVolume(0.5);

    // jump to other part of song
    // song.setCurrentTime(32.5);

    // song on repeat until stop function called
    // song.setNumberOfLoops(-1);

    // get Current Time
    // song.getCurrentTime((seconds) => song.setCurrentTime(seconds+10));
    // console.warn('at ' + seconds));

    // stop song
    // song.stop();

    // console.warn('volume: ' + song.getVolume());
    // console.warn('pan: ' + song.getPan());
    // console.warn('loops: ' + song.getNumberOfLoops());
  };
  helper = () => {
    song.getCurrentTime(seconds => {
      return seconds;
    });
  };
  currentTime = () => {
    song.getCurrentTime(seconds => {
      console.warn('at ' + seconds);
      this.setState({
        currentTime: seconds,
      });
    });
  };
  jumpTime = () => {
    song.setCurrentTime(22.5);
  };
  audioLoop = () => {
    song.setNumberOfLoops(-1);
    console.warn('Song on loop until song Stop');
  };
  rightPan = () => {
    song.setPan(1);
  };
  setSpeed = () => {
    song.setSpeed(2);
  };
  getDuration = () => {
    console.warn('chla');
    console.warn('time is', song.getDuration());

    // song.getDuration((time)=> console.warn("time is ",time))
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.btn} onPress={this.stopSong.bind(this)}>
          <Text style={{fontSize: vh(20)}}>Stop</Text>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.bckwrdSong.bind(this)}>
            <Text style={{fontSize: vh(20)}}>Bckwrd</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.onpressPlay.bind(this)}>
            <Text style={{fontSize: vh(20)}}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.frwrdSong.bind(this)}>
            <Text style={{fontSize: vh(20)}}>Frwrd</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={this.onpressPause.bind(this)}>
          <Text style={{fontSize: vh(20)}}>
            {this.state.pause ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   marginTop: vh(10),
            }}>
            <Text>{Math.floor(this.state.currentTime)}</Text>
            <Text>{this.state.duration}</Text>
          </View>
          <Progress.Bar
            progress={this.state.currentTime / this.state.duration}
            width={vw(300)}
          />
        </View>

        <View
          style={{
            width: '100%',
            marginTop: vh(120),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={this.currentTime.bind(this)}
            style={styles.smallBtn}>
            <Text style={styles.text}>Current Time</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={this.jumpTime.bind(this)}
              style={styles.smallBtn}>
              <Text style={styles.text}>Jump Time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.halfVolume.bind(this)}
              style={[styles.smallBtn, {marginTop: vh(20)}]}>
              <Text style={styles.text}>Half Volume</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity 
                    onPress={this.rightPan.bind(this)}
                    style={[styles.smallBtn,{marginTop:vh(20)}]}>
                        <Text style={styles.text}>
                            Right Pan
                        </Text>
                    </TouchableOpacity> */}
            <TouchableOpacity
              onPress={this.setSpeed.bind(this)}
              style={[styles.smallBtn, {marginTop: vh(20)}]}>
              <Text style={styles.text}>Speed 2x</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.volumeUp.bind(this)}
              style={[styles.smallBtn, {marginTop: vh(20)}]}>
              <Text style={styles.text}>Volume Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.volumeDown.bind(this)}
              style={[styles.smallBtn, {marginTop: vh(20)}]}>
              <Text style={styles.text}>Volume Down</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.getDuration.bind(this)}
              style={[styles.smallBtn, {marginTop: vh(20)}]}>
              <Text style={styles.text}>Get Duration</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this.audioLoop.bind(this)}
            style={styles.smallBtn}>
            <Text style={styles.text}>Audio on loop</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: vh(80),
    marginTop: vh(40),
    width: vh(80),
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vh(40),
  },
  smallBtn: {
    height: vh(30),
    justifyContent: 'center',
    alignItems: 'center',
    width: vw(120),
    backgroundColor: 'skyblue',
    borderRadius: vh(10),
  },
  text: {
    fontSize: vh(15),
    fontWeight: 'bold',
  },
});
