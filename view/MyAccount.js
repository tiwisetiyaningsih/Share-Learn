import { Text, View, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

export class MyAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
        user: '',
        nis: '',
        email: '',
        fullname: ''
    }
}

  UNSAFE_componentWillMount = async () => {
    const value = await AsyncStorage.getItem('users');
    let Account = JSON.parse(value)
    let user = Account.data.fullname
    this.setState({ user: Account.data.fullname })
    console.log ('nama user', user)
    let nis = Account.data.nis
    this.setState({ nis: Account.data.nis })
    console.log ('nis user', nis)
    let email = Account.data.email
    this.setState({ email: Account.data.email })
    console.log ('email user', email)
    let fullname = Account.data.fullname
    this.setState({ fullname: Account.data.fullname })
    console.log ('fullname user', fullname)
}

componentDidMount = async () => {
  this.props.navigation.addListener('focus', async ()=>{
    const value = await AsyncStorage.getItem('users');
    let Account = JSON.parse(value)
    let user = Account.data.fullname
    this.setState({ user: Account.data.fullname })
    console.log ('nama user', user)
    let nis = Account.data.nis
    this.setState({ nis: Account.data.nis })
    console.log ('nis user', nis)
    let email = Account.data.email
    this.setState({ email: Account.data.email })
    console.log ('email user', email)
    let fullname = Account.data.fullname
    this.setState({ fullname: Account.data.fullname })
    console.log ('fullname user', fullname)
  })
}

  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'}></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <Body user={this.state.user} email={this.state.email} nis={this.state.nis} fullname={this.state.fullname}></Body>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 20, alignItems: 'center' }}>
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

const Body = ({ user, nis, email, fullname }) => (
  <View style={{ backgroundColor: '#FFF', paddingVertical: 20, paddingHorizontal: 35 }}>
    <View style={{ paddingBottom: 10 }}>
      <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#000' }}>Account Information</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 30, paddingTop: 10}}>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000' }}>Fullname</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12.5, color: '#A3A3A3' }}>{fullname}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 30 }}>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000' }}>Email</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12.5, color: '#A3A3A3' }}>{email}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 30 }}>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000' }}>NIS</Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12.5, color: '#A3A3A3' }}>{nis}</Text>
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