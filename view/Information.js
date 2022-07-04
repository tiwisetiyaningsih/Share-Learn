import { Text, View, StyleSheet, StatusBar, Image } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'

export class Information extends Component {
  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <Body></Body>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 25, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF' }}>
    <BaseButton style={{ padding: 5, marginLeft: -140 }}
      onPress={() => { navigation.navigate('profile') }}>
      <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
    </BaseButton>
    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', justifyContent: 'center', marginLeft: -10 }}>Information</Text>
  </View>
)

const Body = () => (
  <View style={{ backgroundColor: '#FFF', paddingHorizontal: 30, paddingTop: 30, alignItems: 'center' }}>
    <View style={{ paddingTop: 10 }}>
      <Image source={require('../assets/logo/logo_share_learn.png')}></Image>
    </View>
    <View style={{ paddingHorizontal: 10, paddingVertical: 70, alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15.5, color: '#000' }}>Aplikasi share learn merupakan aplikasi</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15.5, color: '#000' }}>yang memiliki beberapa fitur seperti sharing</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15.5, color: '#000' }}>aplikasi  learn, save learn & notes. Aplikasi</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15.5, color: '#000' }}>digunakan untuk berbagi / sharing tentang</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15.5, color: '#000' }}>materi pembelajaran.</Text>
    </View>
    <View style={{ paddingTop: 15 }}>
      <Image source={require('../assets/logo/blue.png')}></Image>
    </View>
  </View>
)

const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})

export default Information