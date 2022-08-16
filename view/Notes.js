import { Text, View, Image, StatusBar, ScrollView, StyleSheet, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
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
    let user = Account.data.fullname
    this.setState({ user: Account.data.fullname })
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

  componentDidMount = async () => {
    this.props.navigation.addListener('focus', async () => {
      const value = await AsyncStorage.getItem('users');
      let Account = JSON.parse(value)
      let user = Account.data.fullname
      this.setState({ user: Account.data.fullname })
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
        Alert.alert("Successfully", 'The note was erased.', [
          {
            text: "oke",
            style: 'default',
            onPress: this.props.navigation.navigate('notes')
          }
        ])

      } else {
        Alert.alert("Failed", 'The note failed to be erased.')
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
        <StatusBar backgroundColor='#38C6C6' barStyle='light-content' ></StatusBar>
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
  <View style={{ backgroundColor: '#38C6C6', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 20, alignItems: 'center', }}>
    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 18, color: '#FFF' }}>Notes</Text>
    <Image source={require('../assets/logo/logo_share_learn.png')} style={{ width: 40, height: 35, tintColor: '#FFF' }} ></Image>
  </View>
)

const ListNotes = ({ navigation, data, DeleteNote }) => (
  <View style={{ backgroundColor: '#FFF', flexDirection: 'row', paddingHorizontal: 25, justifyContent: 'space-between', paddingVertical: 10, borderBottomColor: '#DADADA', borderBottomWidth: 1, alignItems: 'center' }}>
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
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#FF8C00' }}>{data.judul_notes}</Text>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 11, color: 'black' }}>{data.sub_judul_notes}</Text>
      </View>
    </BaseButton>
    <BaseButton style={{ padding: 5, marginTop: -15 }}
      onPress={() => {
        Alert.alert('Delete', 'Are you sure you want to delete it?',
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
      <Ionicons name='remove-circle-outline' size={20} color='#000'></Ionicons>
    </BaseButton>
  </View>
)

const Fouter = ({ navigation }) => (
  <View style={{ flexDirection: 'column' }}>
    <View style={{ marginTop: -67, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 15 }}>
      <BaseButton style={{ marginRight: 20, backgroundColor: '#38C6C6', borderRadius: 50, padding: 13, elevation: 5 }}
        onPress={() => {
          navigation.navigate('createnotes')
        }}>
        <MaterialCommunityIcons name='plus' size={25} color='#FFF'></MaterialCommunityIcons>
      </BaseButton>
    </View>
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 6, marginTop: 2, elevation: 5 }}>
      <BaseButton style={{ padding: 5 }}
        onPress={() => { navigation.navigate('home') }}>
        <Ionicons name="home-outline" size={23} color='#38C6C6'></Ionicons>
      </BaseButton>
      {/* <BaseButton style={{ padding: 5 }}
      onPress={() => { navigation.navigate('notes') }}>
      <MaterialCommunityIcons name='notebook-outline' size={23} color='#A3A3A3'></MaterialCommunityIcons>
    </BaseButton> */}
      <View style={{ backgroundColor: '#FFF', borderRadius: 50, marginTop: - 20, padding: 3 }}>
        <BaseButton>
          <View style={{ backgroundColor: '#38C6C6', borderRadius: 50, padding: 10 }}>
            <MaterialCommunityIcons name='notebook' size={23} color='#FFF'></MaterialCommunityIcons>
          </View>
        </BaseButton>
      </View>
      <BaseButton style={{ padding: 5 }}
        onPress={() => { navigation.navigate('search') }}>
        <Ionicons name='ios-search' size={23} color='#38C6C6'></Ionicons>
      </BaseButton>
      <BaseButton style={{ padding: 5 }}
        onPress={() => { navigation.navigate('forum') }}>
        <FontAwesome name='comments-o' size={23} color='#38C6C6'></FontAwesome>
      </BaseButton>
      <BaseButton style={{ padding: 5 }}
        onPress={() => { navigation.navigate('profile') }}>
        <Ionicons name="happy-outline" size={23} color='#38C6C6'></Ionicons>
      </BaseButton>
    </View>
  </View>
)

const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "rgba(80,80,80,0)"
  }
})

export default Notes