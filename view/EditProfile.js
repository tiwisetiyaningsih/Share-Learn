import { Text, View, StatusBar, StyleSheet, TextInput, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
        user: '',
        nis: '',
        fullname: ''
    }
}

  UNSAFE_componentWillMount = async () => {
    const value = await AsyncStorage.getItem('users');
    let Account = JSON.parse(value)
    let user = Account.data.username
    this.setState({ user: Account.data.username })
    console.log ('nama user', user)
    let nis = Account.data.nis
    this.setState({ nis: Account.data.nis })
    console.log ('nis user', nis)
    let fullname = Account.data.fullname
    this.setState({ fullname: Account.data.fullname })
    console.log ('fullname user', fullname)
}

  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <FormEditProfile user={this.state.user} fullname={this.state.fullname} nis={this.state.nis}></FormEditProfile>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
    <BaseButton style={{ padding: 5 }}
      onPress={() => { navigation.navigate('myaccount') }}>
      <Octicons name='chevron-left' size={25} color='black'></Octicons>
    </BaseButton>
    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Edit Profile</Text>
    <BaseButton style={{ padding: 5 }}>
      <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
    </BaseButton>
  </View>
)

const FormEditProfile = ({ user, fullname, nis }) => (
  <View style={{ padding: 20 }}>
    <View style={{ marginHorizontal: 20, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Username</Text>
      <TextInput
        style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingBottom: -2, paddingTop: -5, marginEnd: 10 }}
        placeholder='username'>{user}
      </TextInput>
    </View>
    <View style={{ marginHorizontal: 20, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingTop: 25 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Fullname</Text>
      <TextInput
        style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingBottom: -2, paddingTop: -5, marginEnd: 10 }}
        placeholder='fullname'>{fullname}
      </TextInput>
    </View>
    <View style={{ marginHorizontal: 20, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingTop: 25 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>NIS</Text>
      <TextInput
        style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingBottom: -2, paddingTop: -5, marginEnd: 10 }}
        placeholder='nis'>{nis}
      </TextInput>
    </View>
  </View>
)

const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})

export default EditProfile