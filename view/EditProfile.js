import { Text, View, StatusBar, StyleSheet, TextInput, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'

export class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id_user: '',
      user: '',
      nis: '',
      fullname: ''
    }
  }

  UNSAFE_componentWillMount = async () => {
    const value = await AsyncStorage.getItem('users');
    let Account = JSON.parse(value)
    console.log(Account)
    let user = Account.data.username
    this.setState({ user: Account.data.username })
    console.log('nama user', user)
    let nis = Account.data.nis
    this.setState({ nis: Account.data.nis })
    console.log('nis user', nis)
    let fullname = Account.data.fullname
    this.setState({ fullname: Account.data.fullname })
    console.log('fullname user', fullname)
    let id_user = Account.data.id_users
    this.setState({id_user: Account.data.id_users})
    console.log('id_user', id_user)
  }

  SetUsername = (text) => {
    this.setState({ user: text })
  }
  SetFullname = (text) => {
    this.setState({ fullname: text })
  }
  SetNis = (text) => {
    this.setState({ nis: text })
  }

  EditProfil = () => {
    const { user, fullname, nis, id_user } = this.state
    console.log(user,fullname,nis,id_user)
    let postData =
    {
      "username": user,
      "fullname": fullname,
      "nis": nis,
    }
    console.log(Constant.api_url + 'api/user/update/' + id_user)
    axios({
      method: 'POST',
      url: Constant.api_url + 'api/user/update/' + id_user,
      data: postData
    }).then((back) => {
      console.log(back.status)
      if (back.status === 200) {
        Alert.alert("success", "update account success", [
          {
            text: "oke",
            style: 'default',
            onPress: this.props.navigation.navigate('myaccount')
          }
        ])
      }
    }).catch((error) => {
      console.log("error", JSON.stringify(error))
    })
  }

render() {
  return (
    <View style={style.app}>
      <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
      <Header navigation={this.props.navigation} EditProfil={()=>{this.EditProfil()}}></Header>
      <FormEditProfile user={this.state.user} fullname={this.state.fullname} nis={this.state.nis} SetUsername={(text) => { this.SetUsername(text) }} SetFullname={(text) => { this.SetFullname(text) }} SetNis={(text) => { this.SetNis(text) }}></FormEditProfile>
    </View>
  )
}
}

const Header = ({ navigation, EditProfil }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
    <BaseButton style={{ padding: 5 }}
      onPress={() => { navigation.navigate('myaccount') }}>
      <Octicons name='chevron-left' size={25} color='black'></Octicons>
    </BaseButton>
    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Edit Profile</Text>
    <BaseButton style={{ padding: 5 }}
    onPress={()=>{EditProfil()}}>
      <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
    </BaseButton>
  </View>
)

const FormEditProfile = ({ user, fullname, nis, SetFullname, SetNis, SetUsername }) => (
  <View style={{ padding: 20 }}>
    <View style={{ marginHorizontal: 20, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Username</Text>
      <TextInput
        style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingBottom: -2, paddingTop: -5, marginEnd: 10 }}
        placeholder='username'
        value={user}
        onChangeText={(text) => { SetUsername(text) }}>
      </TextInput>
    </View>
    <View style={{ marginHorizontal: 20, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingTop: 25 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Fullname</Text>
      <TextInput
        style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingBottom: -2, paddingTop: -5, marginEnd: 10 }}
        placeholder='fullname'
        value={fullname}
        onChangeText={(text) => { SetFullname(text) }}>
      </TextInput>
    </View>
    <View style={{ marginHorizontal: 20, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingTop: 25 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>NIS</Text>
      <TextInput
        style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingBottom: -2, paddingTop: -5, marginEnd: 10 }}
        placeholder='nis'
        value={nis}
        onChangeText={(text) => { SetNis(text) }}>
      </TextInput>
    </View>
    {/* <View style={{ marginHorizontal: 20, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingTop: 25 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Email</Text>
      <TextInput
        style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingBottom: -2, paddingTop: -5, marginEnd: 10 }}
        placeholder='email'>
      </TextInput>
    </View>
    <View style={{ marginHorizontal: 20, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingTop: 25 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Password</Text>
      <TextInput
        style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingBottom: -2, paddingTop: -5, marginEnd: 10 }}
        placeholder='password'>
      </TextInput>
    </View> */}
  </View>
)

const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})

export default EditProfile