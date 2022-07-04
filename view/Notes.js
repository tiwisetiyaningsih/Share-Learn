import { Text, View, Image, StatusBar, ScrollView, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'


export class Notes extends Component {
  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          <ListNotes navigation={this.props.navigation}></ListNotes>
        </ScrollView>
        <Fouter navigation={this.props.navigation}></Fouter>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
    <BaseButton style={{padding:5}}
      onPress={() => { navigation.navigate('home') }}>
      <Octicons name='chevron-left' size={25} color='black'></Octicons>
    </BaseButton>
    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Notes</Text>
    <BaseButton
      onPress={() => { navigation.navigate('createnotes') }}>
      <AntDesign name='pluscircle' size={20} color='#38C6C6'></AntDesign>
    </BaseButton>
  </View>
)

const ListNotes = ({ navigation }) => (
  <View style={{ flexDirection: 'row', paddingHorizontal: 30, justifyContent: 'space-between', paddingVertical: 15, borderBottomColor: '#DADADA', borderBottomWidth: 1 }}>
    <BaseButton style={{ flexDirection: 'column', paddingRight: 200, paddingVertical: 5 }}
      onPress={() => { navigation.navigate('detailnotes') }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: 'black' }}>Matematika</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: 'black' }}>Bab Logika Matematika</Text>
    </BaseButton>
    <BaseButton style={{ marginBottom: 20, padding: 5 }}>
      <Ionicons name='ellipsis-horizontal' size={20} color='black'></Ionicons>
    </BaseButton>
  </View>
)

const Fouter = ({ navigation }) => (
  <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50, paddingVertical: 5 }}>
    <BaseButton style={{ paddingVertical: 5 }}
      onPress={() => { navigation.navigate('home') }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Entypo name="home" size={23} color='#A3A3A3'></Entypo>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Home</Text>
      </View>
    </BaseButton>
    <BaseButton style={{ paddingVertical: 5 }}
      onPress={() => { navigation.navigate('notes') }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/icons/icons-note-off.png')} style={{ tintColor: '#38C6C6', height: 25, width: 25 }}></Image>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#38C6C6' }}>Notes</Text>
      </View>
    </BaseButton>
    <BaseButton style={{ paddingVertical: 5 }}
      onPress={() => { navigation.navigate('profile') }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="happy-outline" size={23} color='#A3A3A3'></Ionicons>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Profile</Text>
      </View>
    </BaseButton>
  </View>
)

const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})

export default Notes