import { Text, View, StatusBar} from 'react-native'
import React, { Component } from 'react'

export class GetStarted extends Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <Text>GetStarted</Text>
      </View>
    )
  }
}

export default GetStarted