import { Text, View, Image, StatusBar, ScrollView, StyleSheet, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'


export class Notes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      user: '',
      listNotes: [],
      id_notes: ''
    }
  }

  UNSAFE_componentWillMount = async () => {
    const value = await AsyncStorage.getItem('users');
    let Account = JSON.parse(value)
    let user = Account.data.username
    this.setState({ user: Account.data.username })
    console.log('nama user', user)

    axios({
      method: 'GET',
      url: Constant.api_url + 'api/notes/read/' + user
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      let listNotes = back.data.data.reverse()
      this.setState({ listNotes: back.data.data.reverse() })
      console.log('listNotes', listNotes)
    }).catch((error) => {
      console.log("error", error)
    })
  }

  DeleteNote = (id_notes) => {
    console.log(id_notes)
    console.log(Constant.api_url + 'api/notes/delete/' + id_notes)

    axios({
      method: 'GET',
      url: Constant.api_url + 'api/notes/delete/' + id_notes
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      if (back.data.massage === 'success') {
        console.log("hello")
        Alert.alert("Berhasil", 'Note berhasil terhapus', [
          {
            text: "oke",
            style: 'default',
            onPress: this.props.navigation.navigate('notes')
          }
        ])

      } else {
        Alert.alert("Gagal", 'Note gagal terhapus')
      }
    }).catch((error) => {
      console.log(error)
    })

    const { user } = this.state
    console.log(user)
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/notes/read/' + user
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      let listNotes = back.data.data.reverse()
      this.setState({ listNotes: back.data.data.reverse() })
      console.log('listNotes', listNotes)
    }).catch((error) => {
      console.log("error", error)
    })
  }

  render() {
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          {this.state.listNotes.map((item, index) => {
            console.log('yyy', item, index)
            return <ListNotes navigation={this.props.navigation} key={index} data={item} DeleteNote={(data) => this.DeleteNote(data)}></ListNotes>
          })}
        </ScrollView>
        <Fouter navigation={this.props.navigation}></Fouter>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 15, alignItems: 'center', borderBottomWidth: .2, marginBottom: 5, elevation: 1}}>
    <BaseButton style={{ padding: 5 }}
      onPress={() => { navigation.navigate('home') }}>
      <Octicons name='chevron-left' size={25} color='black'></Octicons>
    </BaseButton>
    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 17, color: 'black' }}>Notes</Text>
    <BaseButton
      onPress={() => { navigation.navigate('createnotes') }}>
      <AntDesign name='pluscircle' size={20} color='#38C6C6'></AntDesign>
    </BaseButton>
  </View>
)

const ListNotes = ({ navigation, data, DeleteNote }) => (
  <View style={{ flexDirection: 'row', paddingHorizontal: 25, justifyContent: 'space-between', paddingVertical: 15, borderBottomColor: '#DADADA', borderBottomWidth: 1, alignItems: 'center' }}>
    <BaseButton style={{ flexDirection: 'row', paddingVertical: 5 }}
      onPress={() => {
        let kirim = {
          data
        }
        navigation.navigate('detailnotes', kirim)
      }}>
      <MaterialIcons name='notes' size={30} color='#38C6C6'></MaterialIcons>
      {/* FF8C00 */}
      <View style={{ width: 300, flexDirection: 'column', paddingHorizontal: 10 }}>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#FF8C00' }}>{data.judul_notes}</Text>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: 'black' }}>{data.sub_judul_notes}</Text>
      </View>
    </BaseButton>
    <BaseButton style={{ padding: 5, marginTop: -15 }}
      onPress={() => {
        Alert.alert('Delete Note', 'Are you sure?',
          [
            {
              text: 'Yes, delete',
              style: 'default',
              onPress: () => { DeleteNote(data.id_notes) }
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ])
      }}>
      <Ionicons name='remove-circle-outline' size={20}></Ionicons>
    </BaseButton>
  </View>
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
        <Image source={require('../assets/icons/icons-note-off.png')} style={{ tintColor: '#38C6C6', height: 25, width: 25 }}></Image>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#38C6C6' }}>Notes</Text>
      </View>
    </BaseButton>
    <BaseButton style={{ padding: 5 }}
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