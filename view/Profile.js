import { Text, View, Image, StatusBar, StyleSheet, ScrollView, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseButton } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CommonActions } from '@react-navigation/native'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nis: '',
      fullname:''
    }
  }

  UNSAFE_componentWillMount = async () => {
    const value = await AsyncStorage.getItem('users');
    let Account = JSON.parse(value)
    let fullname = Account.data.fullname
    this.setState({ fullname: Account.data.fullname })
    console.log('fullname user', fullname)
    let nis = Account.data.nis
    this.setState({ nis: Account.data.nis })
    console.log('nis user', nis)

  }


  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#BFFBFB'} barStyle='dark-content'></StatusBar>
        <ScrollView>
          <Profil navigation={this.props.navigation} fullname={this.state.fullname} nis={this.state.nis}></Profil>
        </ScrollView>
        <Fouter navigation={this.props.navigation}></Fouter>
      </View>
    )
  }
}

const Profil = ({ navigation, fullname, nis }) => (
  <View>
    <Image source={require('../assets/images/header_profile.png')}></Image>
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, flexDirection: 'row' }}>
      <View style={{ marginTop: -60, height: 117, width: 100 }}>
        <Image source={require('../assets/images/users_profile.png')} style={{ position: 'absolute' }}></Image>
      </View>
      <View style={{ flexDirection: 'column', paddingVertical: 10 }}>
        <Text style={{ paddingHorizontal: 10, marginTop: -44, fontFamily: 'Inter-SemiBold', fontSize: 20, color: 'black' }}>{fullname}</Text>
        <Text style={{ paddingHorizontal: 10, paddingTop: 12, fontFamily: 'Inter-SemiBold', fontSize: 15, color: 'black' }}>{nis}</Text>
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
            <AntDesign name='star' size={20} color='black'></AntDesign>
            {/* <MaterialCommunityIcons name='star-face' size={22} color='#E49500'></MaterialCommunityIcons> */}
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
      <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, color: 'black', paddingBottom: 15 }}>Login</Text>
      <BaseButton
        onPress={() => { 
          Alert.alert('Konfirmasi', 'Apakah Anda yakin mau log out?',
          [
            {
              text: 'Yes',
              style:'default',
              onPress: ()=>{
                // return console.log('hallo')
                AsyncStorage.setItem('users', JSON.stringify({}))
                navigation.dispatch(
                  CommonActions.reset({
                      index: 0, 
                      routes: [
                          {
                              name:'login'
                          }
                      ]
                  })
              )
              }
            },
            {
              text: 'No',
              style:'cancel'
            }
          ])
         }}>
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
    <BaseButton style={{ padding: 5 }}
      onPress={() => { navigation.navigate('home') }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Entypo name="home" size={23} color='#A3A3A3'></Entypo>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Home</Text>
      </View>
    </BaseButton>
    <BaseButton style={{ padding: 5 }}
      onPress={() => { navigation.navigate('notes') }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/icons/icons-note-off.png')} style={{ tintColor: '#A3A3A3', height: 25, width: 25 }}></Image>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Notes</Text>
      </View>
    </BaseButton>
    <BaseButton style={{ padding: 5 }}
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