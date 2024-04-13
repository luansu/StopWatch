import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LapInfo from './LapInfo';
import { COLORS } from './theme';

const StopWatch = () => {
  const [timeLap, setTimeLap] = useState(['00:00,00'])
  const [timeNow, setTimeNow] = useState('00:00,00')
  const [isLap, setIsLap]  = useState(false)
  const [timeNow2, setTimeNow2] = useState('00:00,00')
  const [isRunning, setIsRunning] = useState(false)
  // useEffect: Bắc buộc thực hiện câu lệnh
  useEffect(() => {
    let intervalId: any;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeNow(prevTime => {
          let milliseconds = parseInt(prevTime.slice(6, 8)) + 1;
          let seconds = parseInt(prevTime.slice(3, 5));
          let minutes = parseInt(prevTime.slice(0, 2));
          if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
          }
          if (seconds >= 60) {
            seconds = 0;
            minutes++;
          }
          var minutes_str =
            minutes < 10 ? '0' + minutes.toString() : minutes.toString();
          var seconds_str =
            seconds < 10 ? '0' + seconds.toString() : seconds.toString();
          var milliseconds_str =
            milliseconds < 10
              ? '0' + milliseconds.toString()
              : milliseconds.toString();
          var time = minutes_str + ':' + seconds_str + ':' + milliseconds_str;
          return time;
        });
        setTimeNow2(prevTime => {
          let milliseconds = parseInt(prevTime.slice(6, 8)) + 1
          let seconds = parseInt(prevTime.slice(3, 5))
          let minutes = parseInt(prevTime.slice(0, 2))
          if (milliseconds >= 100) {
            milliseconds = 0
            seconds++
          }
          if (seconds >= 60) {
            seconds = 0
            minutes++
          }
          var minutes_str = minutes < 10 ? '0' + minutes.toString() : minutes.toString()
          var seconds_str = seconds < 10 ? '0' + seconds.toString() : seconds.toString()
          var milliseconds_str = milliseconds < 10 ? '0' + milliseconds.toString() : milliseconds.toString()
          var time = minutes_str + ":" + seconds_str + "," + milliseconds_str
          return time
        })
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);


  const getLap = () => {
    var result = []
    let len = timeLap.length
    let max = 0;
    let min = 0;

    for (let i = 1; i < timeLap.length; i++) {
        if (timeLap[i] < timeLap[max]) {
          max = i;
        }
        if (timeLap[i] > timeLap[min]) {
          min = i;
        }
    }
    if (len == 1 && isRunning) {
      return <LapInfo id={len} time={timeNow} color={COLORS.primaryRedHex} />
    }
    if (len == max){
      result.push(<LapInfo id={len} time={timeNow2} color={COLORS.primaryRedHex} />)
    } else if (len == min){
      result.push(<LapInfo id={len} time={timeNow2} color={'#4BD768'} />)
    } else {
      result.push(<LapInfo id={len} time={timeNow2} />)
    }
    
    for (let i = timeLap.length - 1; i >= 1; i--) {
      if (i == max){
        result.push(<LapInfo id={i} time={timeNow2} color={COLORS.primaryRedHex} />)
      } else if (i == min){
        result.push(<LapInfo id={i} time={timeNow2} color={'#4BD768'} />)
      } else {
        result.push(<LapInfo id={i} time={timeNow2} />)
      }
    }
    return result
  }

  const resetTimer = () => {
    if (!isRunning) {
      setTimeLap(['00:00,00']);
      setTimeNow('00:00,00');
      setTimeNow2('00:00,00');
      setIsLap(!isLap)
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.InnerContainer}>
        <View style={styles.TimmerContainer}>
          <Text style={styles.Timmer}>{timeNow}</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.ButtonLap}
            onPress={() => {
              isRunning ? '' : resetTimer()
              isRunning ? setTimeLap([...timeLap, timeNow2]) : ''
              setTimeNow2('00:00,00')
            }}>
            <Text style={styles.TitleLap}>{isRunning ? 'Lap' : 'Reset'}</Text>
            <View style={styles.shadow}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={isRunning ? styles.ButtonStop : styles.ButtonStart}
            onPress={() => {
              setIsRunning(!isRunning);
              setIsLap(true)
            }}>
            <Text style={isRunning ? styles.TitleStop : styles.TitleStart}>
              {isRunning ? 'Stop' : 'Start'}
            </Text>
            <View style={styles.shadow}></View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.LapTime}>{
        getLap()
      }</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  InnerContainer: {
    alignItems: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 100,
  },
  TimmerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Timmer: {
    fontSize: 72,
    color: 'white',
    marginVertical: 100,
  },

  ButtonLap: {
    height: 100,
    width: 100,
    backgroundColor: '#3E3E3E',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#082a0f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  TitleLap: {
    fontSize: 20,
    color: '#FEFEFE',
  },

  ButtonStart: {
    height: 100,
    width: 100,
    backgroundColor: '#162E1C',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#082a0f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleStart: {
    fontSize: 20,
    color: '#4BD768',
  },

  ButtonStop: {
    height: 100,
    width: 100,
    backgroundColor: '#3F1515',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#082a0f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  TitleStop: {
    fontSize: 20,
    color: '#FA3D38',
  },
  LapTime: {
    marginVertical: 60,
  },
  shadow: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: 999, // Làm tròn hết góc của bóng đổ
    borderWidth: 2, // Độ dày của bóng đổ
    borderColor: 'black', // Màu của bóng đổ
  },
});

export default StopWatch;
