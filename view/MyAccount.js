import { Text, View, StyleSheet, StatusBar } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

export class MyAccount extends Component {
  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'}></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <Body></Body>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
    <BaseButton style={{ padding: 5 }}
      onPress={() => { navigation.navigate('profile') }}>
      <Octicons name='chevron-left' size={25} color='black'></Octicons>
    </BaseButton>
    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>My Account</Text>
    <BaseButton style={{ padding: 5 }}
      onPress={() => { navigation.navigate('editprofile') }}>
      <Feather name='edit' size={20} color='#38C6C6'></Feather>
    </BaseButton>
  </View>
)

const Body = () => (
  <View style={{ backgroundColor: '#FFF', paddingVertical: 20, paddingHorizontal: 35 }}>
    <View style={{ paddingBottom: 10 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#000' }}>Account Information</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 30 }}>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000' }}>Username</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12.5, color: '#A3A3A3' }}>username</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 30 }}>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000' }}>Email</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12.5, color: '#A3A3A3' }}>username@gmail.com</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 30 }}>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000' }}>NIS</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12.5, color: '#A3A3A3' }}>3103120222</Text>
    </View>
  </View>
)

const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})

export default MyAccount