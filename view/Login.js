import { Text, View, StatusBar, Image, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton } from 'react-native-gesture-handler'



export class Login extends Component {
  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <BodyLogin navigation={this.props.navigation}></BodyLogin>
      </View>
    )
  }
}

const BodyLogin = ({navigation}) => (
  <View>
    <Image source={require('../assets/logo/share-learn-login.png')}></Image>
    <View style={{ paddingHorizontal: 40, elevation: 10 }}>
      <View style={{ alignItems: 'center', paddingVertical: 15 }}>
        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 20, color: '#38C6C6' }}>Login</Text>
      </View>
      <View style={{ backgroundColor: '#F4F4F4', borderRadius: 20 }}>
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Image source={require('../assets/logo/user-login.png')}></Image>
        </View>
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Username</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account' size={20}></MaterialCommunityIcons>
            <TextInput placeholder='Your username' style={{ paddingStart: 10, marginEnd: 10}}></TextInput>
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Password</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account-lock' size={20}></MaterialCommunityIcons>
            <TextInput placeholder='Your password' style={{ paddingStart: 10, marginEnd: 10}} secureTextEntry></TextInput>
          </View>
        </View>
        <View style={{ alignItems: 'center', paddingVertical: 30 }}>
          <BaseButton 
          onPress={()=>{navigation.navigate('home')}}>
            <Image source={require('../assets/images/btn-login.png')}></Image>
          </BaseButton>
        </View>
      </View>
    </View>
    <View style={{ alignItems: 'center' }}>
      <BaseButton style={{ flexDirection: 'row', marginVertical: 8 }}
      onPress={()=>{navigation.navigate('register')}}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>Not Registered?</Text>
        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 12, color: '#FF8C00', paddingStart: 2}}>Sign Up</Text>
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

export default Login