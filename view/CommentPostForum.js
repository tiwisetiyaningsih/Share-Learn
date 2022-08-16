import { Text, View, StyleSheet, StatusBar, Image, AsyncStorage, Alert, Pressable, TextInput, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import Constant from '../Componen/Constant'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import RNFetchBlob from 'rn-fetch-blob'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'



const { width, height } = Dimensions.get('screen')
export class CommentPostForum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      id_user: '',
      listPostForum: [],
      listLikeOn: [],
      listLike: [],
      listReply: [],
      id_post_thread: this.props.route.params.data.id_thread,
      reply: '',
      user_post_thread: this.props.route.params.data.user_thread,
      id_user_post_thread: this.props.route.params.data.id_user_thread,
      camera: '',
      source: '',
      photoSize: '',
      type_comment: ''
    }
  }

  UNSAFE_componentWillMount = async () => {
    const value = await AsyncStorage.getItem('users');
    let Account = JSON.parse(value)
    let user = Account.data.fullname
    this.setState({ user: Account.data.fullname, id_user: Account.data.id_users })
    console.log('nama user', user)
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/postForum/readAllpost'
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      let listPostForum = back.data.data.reverse()
      this.setState({ listPostForum: back.data.data.reverse() })
      console.log('listPostForum', listPostForum)
    }).catch((error) => {
      console.log("error", error)
    })

    axios({
      method: 'GET',
      url: Constant.api_url + 'api/postForum/IdPostbyUser/' + user
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      let listLikeOn = back.data.data.reverse()
      this.setState({ listLikeOn: back.data.data.reverse() })
      console.log('listLikeOn', listLikeOn)
    }).catch((error) => {
      console.log("error", error)

    })

    let id_post = this.state.id_post_thread
    console.log('cek', Constant.api_url + 'api/commentForum/read/' + id_post)
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/commentForum/read/' + id_post
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      this.setState({ listReply: back.data.data })
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
        url: Constant.api_url + 'api/postForum/readAllpost'
      }).then((back) => {
        console.log(JSON.stringify(back.data, null, 2))
        let listPostForum = back.data.data.reverse()
        this.setState({ listPostForum: back.data.data.reverse() })
        console.log('listPostForum', listPostForum)
      }).catch((error) => {
        console.log("error", error)
      })

      let id_post = this.state.id_post_thread
      console.log('cek', Constant.api_url + 'api/commentForum/read/' + id_post)
      axios({
        method: 'GET',
        url: Constant.api_url + 'api/commentForum/read/' + id_post
      }).then((back) => {
        console.log(JSON.stringify(back.data, null, 2))
        this.setState({ listReply: back.data.data })
      }).catch((error) => {
        console.log("error", error)
      })

    })
  }

  PostLike = (id) => {
    const { user, id_user } = this.state
    console.log(user, id)

    let postData =
    {
      "id_post_thread": id,
      "id_user_like": id_user,
      "user_like": user
    }
    console.log(postData)
    console.log(Constant.api_url + 'api/likeForum/create')

    axios({
      method: 'POST',
      url: Constant.api_url + 'api/likeForum/create',
      data: postData
    }).then((back) => {
      console.log(back.data)
      if (back.status === 200) {
        if (back.data.massage == 'success like') {
          let like_list = this.state.listPostForum
          console.log('like_list', like_list)
          like_list.map((item, index) => {
            // console.log('like_list index', like_list[index]['jumlah_like']++)
            if (item.id_thread == id) { like_list[index]['jumlah_like']++ }
          })
          this.setState({ listPostForum: like_list })
        } else if (back.data.massage == 'success unlike') {
          let like_list = this.state.listPostForum
          like_list.map((item, index) => {
            // console.log('like_list index', like_list[index]['jumlah_like']--)
            if (item.id_thread == id) { like_list[index]['jumlah_like']-- }
          })
          this.setState({ listPostForum: like_list })
        }
        console.log("hello")
        let like = this.state.listLike
        like = [...like, back.data.data]
        this.setState({ listLike: like })
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/postForum/IdPostbyUser/' + user
        }).then((back) => {
          console.log(JSON.stringify(back.data, null, 2))
          let listLikeOn = back.data.data.reverse()
          this.setState({ listLikeOn: back.data.data.reverse() })
          console.log('listLikeOn', listLikeOn)
        }).catch((error) => {
          console.log("error", error)

        })
      } else {
        Alert.alert("Failed", back.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  SetReply = (text) => {
    this.setState({ reply: text })
  }

  UploadGambar = (image) => {
    try {
      // pengaturan untuk menjalankan library kamera
      const options = {
        quality: 1.0,
        maxWidth: 1000,
        maxHeight: 1000,
        cameraType: 'back',
        includeBase64: true
      }

      if (image === 'camera') {
        launchCamera(options, async (response) => { this.callbackUpload(response) })
      } else if (image === 'select-from-gallery') {
        launchImageLibrary(options, async (response) => { this.callbackUpload(response) })
      }
    } catch (error) {
      console.log(error)
    }
  }

  callbackUpload = async (response) => {
    try {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // rumus perbandingan image scale
        let IS = ((width - 80) / response.assets[0].width)
        let ISH = ((height - 600) / response.assets[0].height)
        let _width = response.assets[0].width * IS
        let _height = response.assets[0].height * ISH

        let source = { uri: response.assets[0].uri }
        let photoAttachment = 'data:image/jpeg;base64,' + response.assets[0].base64
        let photoSize = {
          width: _width,
          height: _height,
          borderRadius: 10
        }
        this.setState({ camera: photoAttachment, source, photoSize, type_comment: 'image' })

      }
    } catch (error) {
      console.log(error)
    }
  }

  PostReplyImage = () => {
    const { user, reply, id_post_thread, id_user, user_post_thread, id_user_post_thread, camera } = this.state
    console.log(user, reply, id_post_thread, id_user_post_thread, user_post_thread, id_user, camera)

    let postData =
    {
      "id_post_thread": id_post_thread,
      "id_user_post_thread": id_user_post_thread,
      "user_post_thread": user_post_thread,
      "id_user_comment": id_user,
      "user_comment": user,
      "comment": reply,
      "file_comment": camera
    }
    console.log(Constant.api_url + 'api/commentForum/create')

    axios({
      method: 'POST',
      url: Constant.api_url + 'api/commentForum/create',
      data: postData
    }).then((back) => {
      console.log(JSON.stringify(back))
      console.log(back.data)
      if (back.status === 200) {
        console.log("hello")
        let Reply = this.state.listReply
        Reply = [...Reply, back.data.data]
        this.setState({ listReply: Reply, reply: '', camera: '' })
      } else {
        Alert.alert("Failed", back.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/commentForum/read/' + id_post_thread
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      this.setState({ listReply: back.data.data })
    }).catch((error) => {
      console.log("error", error)
    })
  }

  PostReply = () => {
    const { user, reply, id_post_thread, id_user, user_post_thread, id_user_post_thread } = this.state
    console.log(user, reply, id_post_thread)

    let postData =
    {
      "id_post_thread": id_post_thread,
      "id_user_post_thread": id_user_post_thread,
      "user_post_thread": user_post_thread,
      "id_user_comment": id_user,
      "user_comment": user,
      "comment": reply,
      "file_comment": "No Image"
    }
    console.log(Constant.api_url + 'api/commentForum/createnoimage')

    axios({
      method: 'POST',
      url: Constant.api_url + 'api/commentForum/createnoimage',
      data: postData
    }).then((back) => {
      console.log(JSON.stringify(back))
      console.log(back.data)
      if (back.status === 200) {
        console.log("hello")
        let Reply = this.state.listReply
        Reply = [...Reply, back.data.data]
        this.setState({ listReply: Reply, reply: '' })
      } else {
        Alert.alert("Failed", back.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/commentForum/read/' + id_post_thread
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      this.setState({ listReply: back.data.data })
    }).catch((error) => {
      console.log("error", error)
    })
  }

  DeleteComment = (id_reply) => {
    console.log(id_reply)
    console.log(Constant.api_url + 'api/commentForum/delete/' + id_reply)

    axios({
      method: 'GET',
      url: Constant.api_url + 'api/commentForum/delete/' + id_reply
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      if (back.data.massage === 'success') {
        console.log("hello")
        Alert.alert("Successfully", 'The reply has been deleted.')
      } else {
        Alert.alert("Failed", 'Reply failed to be deleted.')
      }
    }).catch((error) => {
      console.log(error)
    })

    const { user, id_post_thread } = this.state
    console.log(user)
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/commentForum/read/' + id_post_thread
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      this.setState({ listReply: back.data.data })
    }).catch((error) => {
      console.log("error", error)
    })
  }



  render() {
    const dataKirim = this.props.route.params.data
    console.log('datakirim', dataKirim)
    return (
      <View style={style.app}>
        <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
        <ScrollView>
          {
            dataKirim.file_thread === 'No Image'
              ?
              <ThreadText dataKirim={dataKirim} PostLike={(id) => { this.PostLike(id) }} listLikeOn={this.state.listLikeOn} ></ThreadText>
              : null
          }
          {
            dataKirim.file_thread !== 'No Image'
              ?
              <ThreadImage dataKirim={dataKirim} PostLike={(id) => { this.PostLike(id) }} listLikeOn={this.state.listLikeOn} ></ThreadImage>
              : null
          }
          <View style={{ borderBottomColor: '#000', borderTopColor: '#000', borderBottomWidth: 1, borderTopWidth: 1, paddingHorizontal: 20, paddingBottom: 2, marginBottom: 10 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#000' }} >Reply</Text>
          </View>
          {this.state.listReply.map((item, index) => {
            console.log(item, index)
            return <Reply key={index} data={item} DeleteComment={(data) => { this.DeleteComment(data) }} user={this.state.user}></Reply>
          })}
        </ScrollView>
        <Fouter source={this.state.source} reply={this.state.reply} SetReply={(text) => { this.SetReply(text) }} UploadGambar={(image) => { this.UploadGambar(image) }} Post={() => {
          if (this.state.type_comment == 'image') {
            this.PostReplyImage()
          } else {
            this.PostReply()
          }
        }}></Fouter>
      </View>
    )
  }
}

const ThreadText = ({ dataKirim, PostLike, listLikeOn }) => {
  let like = false
  listLikeOn.map(item => {
    if (dataKirim.id_thread == item.id_post_thread) {
      like = true
    } else {

    }
  })
  console.log('LIKE POST,', dataKirim.id_thread, like)
  return (
    <View style={{ backgroundColor: '#FFF', padding: 20, marginBottom: 4, elevation: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
          <View>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#000', marginLeft: 10 }}>{dataKirim.user_thread}</Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 10, color: '#AAA', marginLeft: 10 }}>{dataKirim.created_at}</Text>
          </View>
          <BaseButton>
            <Feather name='more-horizontal' size={20} color='#000'></Feather>
          </BaseButton>
        </View>
      </View>
      <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{dataKirim.thread}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 45, marginTop: 5, alignItems: 'center' }}>
        <BaseButton>
          <Ionicons name='ios-chatbubble-outline' size={15} color='#000'></Ionicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: '#000', marginLeft: 2 }}>{dataKirim.jumlah_comment}</Text>
        <BaseButton style={{ marginHorizontal: 2, marginLeft: 8 }}
          onPress={() => {
            PostLike(dataKirim.id_thread)
          }}>
          {
            like == true
              ?
              <Ionicons name='ios-heart' size={16} color='red'></Ionicons>
              :
              <Ionicons name='ios-heart-outline' size={16} color='#000'></Ionicons>
          }
        </BaseButton>
        {
          like == true
            ?
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'red', marginLeft: 2 }}>{dataKirim.jumlah_like}</Text>
            :
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: '#000', marginLeft: 2 }}>{dataKirim.jumlah_like}</Text>
        }
      </View>
    </View >
  )
}

const ThreadImage = ({ dataKirim, PostLike, listLikeOn }) => {
  let like = false
  listLikeOn.map(item => {
    if (dataKirim.id_thread == item.id_post_thread) {
      like = true
    } else {

    }
  })
  console.log('LIKE POST,', dataKirim.id_thread, like)
  return (
    <View style={{ backgroundColor: '#FFF', padding: 20, marginBottom: 4, elevation: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
          <View>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#000', marginLeft: 10 }}>{dataKirim.user_thread}</Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 10, color: '#AAA', marginLeft: 10 }}>{dataKirim.created_at}</Text>
          </View>
          <BaseButton>
            <Feather name='more-horizontal' size={20} color='#000'></Feather>
          </BaseButton>
        </View>
      </View>
      <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{dataKirim.thread}</Text>
      </View>
      <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
        <Image source={{ uri: Constant.api_url + dataKirim.file_thread }} style={{ width: 320, height: 150, borderRadius: 10 }}></Image>
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 45, marginTop: 5, alignItems: 'center' }}>
        <BaseButton>
          <Ionicons name='ios-chatbubble-outline' size={15} color='#000'></Ionicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: '#000', marginLeft: 2 }}>{dataKirim.jumlah_comment}</Text>
        <BaseButton style={{ marginHorizontal: 2, marginLeft: 8 }}
          onPress={() => {
            PostLike(dataKirim.id_thread)
          }}>
          {
            like == true
              ?
              <Ionicons name='ios-heart' size={16} color='red'></Ionicons>
              :
              <Ionicons name='ios-heart-outline' size={16} color='#000'></Ionicons>
          }
        </BaseButton>
        {
          like == true
            ?
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'red', marginLeft: 2 }}>{dataKirim.jumlah_like}</Text>
            :
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: '#000', marginLeft: 2 }}>{dataKirim.jumlah_like}</Text>
        }
      </View>
    </View>
  )
}

const Reply = ({ data, user, DeleteComment }) => (
  <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: '#FFF' }}>
    <View>
      <Image source={require('../assets/logo/user_profile.png')} ></Image>
    </View>
    <View style={{ backgroundColor: '#ECECEC', paddingHorizontal: 15, paddingTop: 5, margin: 10, marginEnd: 20, elevation: 5, flexDirection: 'column', justifyContent: 'space-between', borderBottomEndRadius: 10, borderBottomStartRadius: 10, borderTopEndRadius: 10, borderColor: '#ECECEC', borderWidth: 1, elevation: 2, width: 310 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'baseline', width: 235 }}>
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: 'black' }}>{data.user_comment},</Text>
          <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#000', paddingStart: 2 }}>{data.comment}</Text>
          {
            data.file_comment != 'No Image'
              ?
              <View style={{ paddingVertical: 5 }}>
                <Image source={{ uri: Constant.api_url + data.file_comment }} style={{ width: 250, height: 150, borderRadius: 10 }}></Image>
              </View>
              : null
          }
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 10, paddingTop: 5 }}>{data.created_at}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {
            data.user_comment === user
              ?
              <Pressable android_ripple={{ color: '#FFDDDD' }} style={{ marginBottom: 3 }}
                onPress={() => {
                  Alert.alert('Delete', 'Are you sure to delete?',
                    [

                      {
                        text: 'Yes',
                        style: 'default',
                        onPress: () => { DeleteComment(data.id_comment) }
                      },
                      {
                        text: 'No',
                        style: 'cancel'
                      }

                    ])
                }}>
                <MaterialCommunityIcons name='delete' size={20} color='#000'></MaterialCommunityIcons>
              </Pressable>
              : null
          }
        </View>
      </View>
    </View>
  </View>
)

const Fouter = ({ reply, SetReply, UploadGambar, Post, source }) => (
  <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 5, borderTopColor: '#EEE', borderTopWidth: .8 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 30 }}>
      <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
      <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', paddingRight: 30, marginLeft: 5, width: 300 }} multiline={true}
        placeholder='Reply'
        value={reply}
        onChangeText={(text) => { SetReply(text) }}></TextInput>
    </View>
    {
      source !== ''
        ?
        <View style={{ paddingHorizontal: 45 }}>
          <Image source={source} style={{ width: 200, height: 150, borderRadius: 10 }}></Image>
        </View>
        : null
    }
    <View style={{ flexDirection: 'row', padding: 3, justifyContent: 'space-between', alignItems: 'center' }}>
      <BaseButton
        onPress={() => {
          Alert.alert('Image', 'Choose media type',
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'Camera',
                style: 'default',
                onPress: () => { UploadGambar('camera') }
              },
              {
                text: 'Gallery',
                style: 'default',
                onPress: () => { UploadGambar('select-from-gallery') }
              }
            ])
        }}>
        <MaterialCommunityIcons name='file-image-plus-outline' size={25} color='#38C6C6'></MaterialCommunityIcons>
      </BaseButton>
      <BaseButton
        onPress={() => { Post() }}>
        <View style={{ backgroundColor: '#38C6C6', padding: 10, borderRadius: 50 }}>
          <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#FFF' }}>Reply</Text>
        </View>
      </BaseButton>
    </View>
  </View>
)


const style = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})

export default CommentPostForum