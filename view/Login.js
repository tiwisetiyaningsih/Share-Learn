import { Text, View, StatusBar, Image, TextInput, StyleSheet, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton } from 'react-native-gesture-handler'
import Constant from '../Componen/Constant'
import axios from 'axios'
import { CommonActions } from '@react-navigation/native'



export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Username: '',
      Password: ''
    }
  }

  Loginapp = async () => {
    // this.props.navigation.navigate('home')
    // return 
    const { Username, Password } = this.state
    console.log(Username, Password)

    let postData =
    {
      "username": Username,
      "password": Password
    }
    console.log(Constant.api_url + 'api/user/login')
    // console.log ('postData', postData)
    axios({
      method: 'POST',
      url: Constant.api_url + 'api/user/login',
      data: postData
    }).then(async (back) => {
      // let LoginUsers = back.data
      // await AsyncStorage.setItem("users", JSON.stringify(LoginUsers))

    //  console.log('backData', back.data)
      if (back.status === 200 && back.data.message === "data falid") {
        
        await AsyncStorage.setItem("users", JSON.stringify(back.data))
        this.props.navigation.dispatch(
          CommonActions.reset({
              index: 0, 
              routes: [
                  {
                      name:'home'
                  }
              ]
          })
      )
        this.setState({ Username: '', Password: '' })
      } else {
        Alert.alert("Gagal", back.data.message)
      }
    }).catch((error) => {
      console.log("error", JSON.stringify(error))
    })
  }

  SetUsername = (text) => {
    this.setState({ Username: text })
  }

  SetPassword = (text) => {
    this.setState({ Password: text })
  }

  render() {
    const { Username, Password } = this.state
    console.log(Username, Password)

    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <BodyLogin navigation={this.props.navigation}  SetUsername={(text) => { this.SetUsername(text) }} SetPassword={(text) => {this.SetPassword(text)}} Loginapp={()=>{this.Loginapp()}} Username={this.state.Username} Password={this.state.Password}></BodyLogin>
      </View>
    )
  }
}

const BodyLogin = ({ navigation, Loginapp, Username, Password, SetUsername, SetPassword }) => (
  <View style={{ elevation: 10 }}>
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
            <TextInput style={{ paddingStart: 10, marginEnd: 10 }}
              placeholder='Your username'
              value={Username}
              onChangeText={(text) => { SetUsername(text) }}
              ></TextInput>
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Password</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account-lock' size={20}></MaterialCommunityIcons>
            <TextInput style={{ paddingStart: 10, marginEnd: 10 }} secureTextEntry
              placeholder='Your password'
              value={Password}
              onChangeText={(text) => { SetPassword(text) }}
              ></TextInput>
          </View>
        </View>
        <View style={{ alignItems: 'center', paddingVertical: 30 }}>
          <TouchableOpacity
            onPress={() => { Loginapp() }}>
            <Image source={require('../assets/images/btn-login.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={{ alignItems: 'center' }}>
      <BaseButton style={{ flexDirection: 'row', marginVertical: 8 }}
        onPress={() => { navigation.navigate('register') }}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>Not Registered?</Text>
        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 12, color: '#FF8C00', paddingStart: 2 }}>Sign Up</Text>
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