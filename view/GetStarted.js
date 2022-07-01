import { Text, View, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export class GetStarted extends Component {
  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <Getstarted navigation={this.props.navigation}></Getstarted>
      </View>
    )
  }
}

const Getstarted = ({ navigation }) => (
  <View>
    <Image source={require('../assets/images/getstarted.png')} style={{ width: 415 }}></Image>
    <View style={{ backgroundColor: '#D2EDED', borderRadius: 20, padding: 20, marginVertical: 35, marginHorizontal: 25, alignItems: 'center', elevation: 5 }}>
      <Text style={{ color: '#0E7E7E', fontFamily: 'Inter-Bold', fontSize: 32, paddingTop: 100, paddingHorizontal: 20 }}>Are you ready</Text>
      <Text style={{ color: '#0E7E7E', fontFamily: 'Inter-Bold', fontSize: 32, paddingBottom: 110 }}>to learn ?</Text>
    </View>
    <View style={{ alignItems: 'flex-end', marginTop: -110 }}>
      <TouchableOpacity onPress={() => { navigation.navigate('login') }}>
        <Image source={require('../assets/images/btn-getstarted.png')} ></Image>
      </TouchableOpacity>
    </View>
  </View>
)

const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})

export default GetStarted