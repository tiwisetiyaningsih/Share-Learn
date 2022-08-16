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
export class CreatePostForum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            thread: '',
            user: '',
            id_user: '',
            camera: '',
            source: '',
            photoSize: '',
            type_post: ''
        }
    }

    componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        console.log(Account.data.fullname)
        this.setState({ user: Account.data.fullname, id_user: Account.data.id_users })
    }

    SetThread = (text) => {
        this.setState({ thread: text })
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
                this.setState({ camera: photoAttachment, source, photoSize, type_post: 'image' })

            }
        } catch (error) {
            console.log(error)
        }
    }

    PostImage = () => {
        const { user, camera, id_user, thread } = this.state

        let postData = {
            "id_user_thread": id_user,
            "user_thread": user,
            "thread": thread,
            "file_thread": camera
        }
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/postForum/create',
            data: postData
        }).then((back) => {
            console.log(JSON.stringify(back))
            console.log(back.data)
            if (back.data.massage === 'success') {
                console.log("hello")
                Alert.alert("Successfully", 'Your post was already uploaded.', [
                    {
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('forum')
                    }
                ])
                this.setState({ thread: '', type_post: '' })

            } else {
                Alert.alert("Failed", 'Your postings failed to upload.')
            }
        })
    }
    PostText = () => {
        const { user, id_user, thread } = this.state

        let postData = {
            "id_user_thread": id_user,
            "user_thread": user,
            "thread": thread,
            "file_thread": 'No Image'
        }
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/postForum/createnoimage',
            data: postData
        }).then((back) => {
            console.log(JSON.stringify(back))
            console.log(back.data)
            if (back.data.massage === 'success') {
                console.log("hello")
                Alert.alert("Successfully", 'Your post was already uploaded.', [
                    {
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('forum')
                    }
                ])
                this.setState({ thread: '' })

            } else {
                Alert.alert("Failed", 'Your postings failed to upload.')
            }
        })

    }

    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <ScrollView>
                    <FormPost SetThread={(text) => { this.SetThread(text) }} thread={this.state.thread} source={this.state.source}></FormPost>
                </ScrollView>
                <Fouter UploadGambar={(image) => { this.UploadGambar(image) }} Post={() => {
                    if (this.state.type_post == 'image') {
                        this.PostImage()
                    } else {
                        this.PostText()
                    }
                }}></Fouter>
            </View >
        )
    }
}
const FormPost = ({ SetThread, thread, source }) => (
    <View style={{ backgroundColor: '#FFF', padding: 20, marginBottom: 4 }}>
        <View style={{ flexDirection: 'row', width: 350 }}>
            <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
            <View style={{ padding: 10, marginTop: -15 }}>
                <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10, width: 300 }}
                    placeholder='What do you think?'
                    value={thread}
                    multiline={true}
                    onChangeText={(text) => { SetThread(text) }}></TextInput>
            </View>
        </View>
        <View style={{ paddingHorizontal: 50 }}>
            <Image source={source} style={{ width: 200, height: 150, borderRadius: 10 }}></Image>
        </View>
    </View>
)
const Fouter = ({ navigation, UploadGambar, Post }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 5, borderTopColor: '#EEE', borderTopWidth: .8 }}>
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
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#FFF' }}>Publish</Text>
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
export default CreatePostForum