import { Text, View, StatusBar, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Zocial from 'react-native-vector-icons/Zocial'
import axios from 'axios'

export class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Username: '',
      Fullname: '',
      Nis: '',
      Email: '',
      Password: ''
    }
  }

  RegisterApp = () => {
    const { Password, Email, Username, Fullname, Nis } = this.state
    console.log(Password, Email, Username, Fullname, Nis)

    let postData =
    {
      "username": Username,
      "fullname": Fullname,
      "nis": Nis,
      "email": Email,
      "password": Password
    }
    console.log(Constant.api_url + 'api/user/register')
    // console.log ('postData', postData)
    axios({
      method: 'POST',
      url: Constant.api_url + 'api/user/register',
      data: postData
    }).then((back) => {
      console.log(JSON.stringify(back))
      console.log(back.data)
      if (back.status === 200 && back.data.message === "success") {
        console.log("hello")
        this.props.navigation.navigate('login')
      } else {
        Alert.alert("Gagal", back.data.message)
      }
    })
  }

  SetUsername = (text) => {
    this.setState({ Username: text })
  }

  SetFullname = (text) => {
    this.setState({ Fullname: text })
  }

  SetNis = (text) => {
    this.setState({ Nis: text })
  }

  SetEmail = (text) => {
    this.setState({ Email: text })
  }

  SetPassword = (text) => {
    this.setState({ Password: text })
  }



  render() {
    const { Username, Fullname, Nis, Email, Password } = this.state
    console.log(Username, Fullname, Nis, Email, Password)
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <ScrollView>
          <BodyRegister navigation={this.props.navigation} RegisterApp={()=>{this.RegisterApp()}} SetUsername={(text) => { this.SetUsername(text) }} SetFullname={(text) => { this.SetFullname(text) }} SetNis={(text) => { this.SetNis(text) }} SetEmail={(text) => { this.SetEmail(text) }} SetPassword={(text) => { this.SetPassword(text) }} Username={this.state.Username} Fullname={this.state.Fullname} Nis={this.state.Nis} Email={this.state.Email} Password={this.state
          .Password}></BodyRegister>
        </ScrollView>
      </View>
    )
  }
}

const BodyRegister = ({ navigation, RegisterApp, SetUsername, SetFullname, SetNis, SetEmail, SetPassword, Username, Fullname, Nis, Email, Password }) => (
  <View style={{ paddingBottom: 50 }}>
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
            <TextInput style={{ paddingStart: 10 }}
              placeholder='Your username'
              value={Username}
              onChangeText={(text) => { SetUsername(text) }}></TextInput>
          </View>
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Fullname</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account' size={20}></MaterialCommunityIcons>
            <TextInput style={{ paddingStart: 10 }}
              placeholder='Your fullname'
              value={Fullname}
              onChangeText={(text) => { SetFullname(text) }}></TextInput>
          </View>
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>NIS</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account-cog' size={20}></MaterialCommunityIcons>
            <TextInput style={{ paddingStart: 10 }}
              placeholder='Your NIS'
              value={Nis}
              onChangeText={(text) => { SetNis(text) }}></TextInput>
          </View>
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Email</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Zocial name='email' size={20}></Zocial>
            <TextInput style={{ paddingStart: 10 }}
              placeholder='Your email'
              value={Email}
              onChangeText={(text) => { SetEmail(text) }}></TextInput>
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: 'black', paddingBottom: 5 }}>Password</Text>
          <View style={{ borderColor: '#38C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='account-lock' size={20}></MaterialCommunityIcons>
            <TextInput style={{ paddingStart: 10 }}
              placeholder='Your password' secureTextEntry
              value={Password}
              onChangeText={(text) => { SetPassword(text) }}></TextInput>
          </View>
        </View>
        <View style={{ alignItems: 'center', paddingVertical: 30 }}>
          <TouchableOpacity
            onPress={() => { RegisterApp() }}>
            <Image source={require('../assets/images/btn-register.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={{ alignItems: 'center' }}>
      <BaseButton style={{ flexDirection: 'row', marginVertical: 8 }}
        onPress={() => { navigation.navigate('login') }}>
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