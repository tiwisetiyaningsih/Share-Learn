import { Text, View, StatusBar, StyleSheet,ScrollView,Image,TextInput } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Zocial from 'react-native-vector-icons/Zocial'

export class Register extends Component {
  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <ScrollView>
          <BodyRegister navigation={this.props.navigation}></BodyRegister>
        </ScrollView>
      </View>
    )
  }
}

const BodyRegister = ({navigation}) => (
  <View style={{paddingBottom: 50}}>
    <Image source={require('../assets/logo/share-learn-login.png')}></Image>
    <View style={{ paddingHorizontal: 40, elevation: 10 }}>
      <View style={{ alignItems: 'center', paddingVertical: 15 }}>
        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 20, color: '#38C6C6' }}>Register</Text>
      </View>
      <View style={{ backgroundColor: '#F4F4F4', borderRadius: 20 }}>
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Image source={require('../assets/logo/user-register.png')}></Image>
        </View>
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Username</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account' size={20}></MaterialCommunityIcons>
            <TextInput placeholder='Your username' style={{ paddingStart: 10 }}></TextInput>
          </View>
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Fullname</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account' size={20}></MaterialCommunityIcons>
            <TextInput placeholder='Your fullname' style={{ paddingStart: 10 }}></TextInput>
          </View>
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>NIS</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account-cog' size={20}></MaterialCommunityIcons>
            <TextInput placeholder='Your NIS' style={{ paddingStart: 10 }}></TextInput>
          </View>
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Email</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Zocial name='email' size={20}></Zocial>
            <TextInput placeholder='Your email' style={{ paddingStart: 10 }}></TextInput>
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Password</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account-lock' size={20}></MaterialCommunityIcons>
            <TextInput placeholder='Your password' style={{ paddingStart: 10 }}></TextInput>
          </View>
        </View>
        <View style={{ alignItems: 'center', paddingVertical: 30 }}>
          <BaseButton 
          onPress={()=>{navigation.navigate('login')}}>
            <Image source={require('../assets/images/btn-register.png')}></Image>
          </BaseButton>
        </View>
      </View>
    </View>
    <View style={{ alignItems: 'center' }}>
      <BaseButton style={{ flexDirection: 'row', marginVertical: 8 }}
      onPress={()=>{navigation.navigate('login')}}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>Already have account?</Text>
        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 12, color: '#FF8C00', paddingStart: 2 }}>Login</Text>
      </BaseButton>
    </View>
  </View>
)

const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff"
  }
})

export default Register