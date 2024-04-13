import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE } from './theme'

const SCREEN_WIDTH = Dimensions.get('window').width
interface LapInfoPros{
    id: number,
    time: string,
    color?: string
}

const LapInfo: React.FC<LapInfoPros> = ({id, time, color}) => {
  return (
    <View style={styles.LapContainer}>
        <Text style={styles.LapText}>Lap {id}</Text>
        <Text style={[styles.TimeText, {color: color == undefined? COLORS.primaryWhiteHex : color}]}>{time}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    LapContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        width: SCREEN_WIDTH-20,
    },
    LapText:{
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20,
    },
    TimeText:{
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20,
    },
})

export default LapInfo