import { Text, View, Image, StatusBar, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseButton } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

export class Profile extends Component {
  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#BFFBFB'} barStyle='dark-content'></StatusBar>
        <ScrollView>
          <Profil navigation={this.props.navigation}></Profil>
        </ScrollView>
        <Fouter navigation={this.props.navigation}></Fouter>
      </View>
    )
  }
}

const Profil = ({ navigation }) => (
  <View>
    <Image source={require('../assets/images/header_profile.png')}></Image>
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, flexDirection: 'row' }}>
      <View style={{ marginTop: -60, height: 117, width: 100 }}>
        <Image source={require('../assets/images/users_profile.png')} style={{ position: 'absolute' }}></Image>
      </View>
      <View style={{ flexDirection: 'column', paddingVertical: 10 }}>
        <Text style={{ paddingHorizontal: 10, marginTop: -44, fontFamily: 'Inter-SemiBold', fontSize: 20, color: 'black' }}>Username</Text>
        <Text style={{ paddingHorizontal: 10, paddingTop: 12, fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>3103120222</Text>
      </View>
    </View>
    <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
      <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, color: 'black', paddingBottom: 20 }}>User Settings</Text>
      <BaseButton
        onPress={() => { navigation.navigate('myaccount') }}>
        <View style={{ paddingTop: 10, paddingHorizontal: 10, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name='account-box' size={20} color='black'></MaterialCommunityIcons>
            <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: 'black', paddingStart: 10 }}>My Account</Text>
          </View>
          <BaseButton
            onPress={() => { navigation.navigate('myaccount') }}>
            <Feather name='chevron-right' size={20} color='black'></Feather>
          </BaseButton>
        </View>
      </BaseButton>
      <BaseButton
        onPress={() => { navigation.navigate('mypost') }}>
        <View style={{ paddingTop: 10, paddingHorizontal: 10, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name='post' size={20} color='black'></MaterialCommunityIcons>
            <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: 'black', paddingStart: 10 }}>My Post</Text>
          </View>
          <BaseButton
            onPress={() => { navigation.navigate('mypost') }}>
            <Feather name='chevron-right' size={20} color='black'></Feather>
          </BaseButton>
        </View>
      </BaseButton>
      <BaseButton
        onPress={() => { navigation.navigate('likedposts') }}>
        <View style={{ paddingTop: 10, paddingHorizontal: 10, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <AntDesign name='staro' size={20} color='black'></AntDesign>
            <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: 'black', paddingStart: 10 }}>Liked Posts</Text>
          </View>
          <BaseButton
            onPress={() => { navigation.navigate('likedposts') }}>
            <Feather name='chevron-right' size={20} color='black'></Feather>
          </BaseButton>
        </View>
      </BaseButton>
    </View>
    <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
      <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, color: 'black', paddingBottom: 15, }}>About</Text>
      <BaseButton
        onPress={() => { navigation.navigate('information') }}>
        <View style={{ paddingTop: 10, paddingHorizontal: 10, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name='book-information-variant' size={20} color='black'></MaterialCommunityIcons>
            <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: 'black', paddingStart: 10 }}>Information</Text>
          </View>
          <BaseButton
            onPress={() => { navigation.navigate('information') }}>
            <Feather name='chevron-right' size={20} color='black'></Feather>
          </BaseButton>
        </View>
      </BaseButton>
    </View>
    <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
      <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, color: 'black', paddingBottom: 15}}>Login</Text>
      <BaseButton
        onPress={() => { }}>
        <View style={{ paddingTop: 10, paddingHorizontal: 10, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name='ios-exit' size={20} color='black'></Ionicons>
            <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: 'black', paddingStart: 10 }}>Log Out</Text>
          </View>
          <BaseButton
            onPress={() => { }}>
            <Feather name='chevron-right' size={20} color='black'></Feather>
          </BaseButton>
        </View>
      </BaseButton>
    </View>
  </View >
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
        <Image source={require('../assets/icons/icons-note-off.png')} style={{ tintColor: '#A3A3A3', height: 25, width: 25 }}></Image>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Notes</Text>
      </View>
    </BaseButton>
    <BaseButton style={{ paddingVertical: 5 }}
      onPress={() => { navigation.navigate('profile') }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="happy" size={23} color='#38C6C6'></Ionicons>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#38C6C6' }}>Profile</Text>
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

export default Profile