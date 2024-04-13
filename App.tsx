import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StopWatch from './src/StopWatch'

const App = () => {
  return (
      <View style={[{flex: 1}]}>
        <StopWatch/>
      </View>
  )
}

export default App

const styles = StyleSheet.create({})