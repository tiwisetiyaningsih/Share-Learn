import { Text, View, StyleSheet, Image, TextInput, StatusBar, Modal, Pressable, AsyncStorage, Alert, Dimensions, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import DocumentPicker, { isInProgress, isCancel } from 'react-native-document-picker'


const { width, height } = Dimensions.get('screen')
export class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            openModal1: false,
            openModal2: false,
            mapel_post: 'Learn?',
            file: '',
            user: '',
            judul_post: '',
            sub_judul_post: '',
            camera: '',
            source: '',
            photoSize: '',
            type_file_post: '',
            file_pdf: '',
            file_name_pdf: ''
        }
    }

    componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        console.log(Account.data.username)
        this.setState({ user: Account.data.username })
    }

    UploadGambar = (method) => { // fungsi upload bukti bayar
        try {
            // pengaturan untuk menjalankan library kamera
            const options = {
                quality: 1.0,
                maxWidth: 1000,
                maxHeight: 1000,
                cameraType: 'back',
                includeBase64: true
            }

            if (method === 'camera') {
                launchCamera(options, async (response) => { this.callbackUpload(response) })
            } else if (method === 'select-from-gallery') {
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
                this.setState({ camera: photoAttachment, source, photoSize, type_file_post: 'image' })

            }
        } catch (error) {
            console.log(error)
        }
    }

    PostImage = () => {
        const { judul_post, sub_judul_post, mapel_post, user, camera } = this.state

        let postData = {
            "user_post": user,
            "judul_post": judul_post,
            "sub_judul_post": sub_judul_post,
            "mapel_post": mapel_post,
            "file_post": camera
        }
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/post/upload',
            data: postData
        }).then((back) => {
            console.log(JSON.stringify(back))
            console.log(back.data)
            if (back.data.massage === 'success') {
                console.log("hello")
                Alert.alert("Berhasil", back.data.massage, [
                    {
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('listpostmapel', this.state.mapel_post)
                    }
                ])
                this.setState({judul_post: '', sub_judul_post: '', mapel_post:'Learn?', type_file_post: ''})

            } else {
                Alert.alert("Gagal", back.data.massage)
            }
        })

    }

    GetPdf = async () => {
        this.setState({openModal: false})
        let document = await DocumentPicker.pick({
            allowMultiSelection: false,
            copyTo: 'cachesDirectory'
        })

        console.log(JSON.stringify(document, null, 2))
        let file_name_pdf = document[0].name
        console.log('name_file', file_name_pdf)

        this.setState({ file_pdf: document[0], type_file_post: 'pdf', openModal: false, file_name_pdf: file_name_pdf })
    }

    PostPDF = async () => {
        try {
            // console.log(JSON.stringify(document, null, 2))
            // let decode = decodeURIComponent(document[0].uri)
            // console.log(decode)
            // fileToBase64(document[0].name, decode).then(result => {
            //     console.log('result', result);
            // })

            let body_form_data = new FormData()
            // body_form_data.append('id_pegawai', '19')
            body_form_data.append('file_post', this.state.file_pdf)
            body_form_data.append('user_post', this.state.user)
            body_form_data.append('judul_post', this.state.judul_post)
            body_form_data.append('sub_judul_post', this.state.sub_judul_post)
            body_form_data.append('mapel_post', this.state.mapel_post)

            let push_to_server = await axios({
                method: 'POST',
                url: Constant.api_url + 'api/post/uploadpdf',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: body_form_data
            })

            console.log(JSON.stringify(push_to_server))

            if (push_to_server.data.massage === 'success') {
                console.log("hello")
                Alert.alert("Berhasil", push_to_server.data.massage, [
                    {
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('listpostmapel',this.state.mapel_post)
                    }
                ])
                this.setState({judul_post: '', sub_judul_post: '', mapel_post: 'Learn?', type_file_post: ''})

            } else {
                Alert.alert("Gagal", push_to_server.data.massage)
            }
        } catch (error) {
            console.log(error);
        }
    }

    OpenModal = () => {
        this.setState({ openModal: true })
    }

    CloseModal = () => {
        this.setState({ openModal: false })
    }

    OpenModal1 = () => {
        this.setState({ openModal1: true })
    }

    CloseModal1 = () => {
        this.setState({ openModal1: false })
    }

    MapelPost = (value) => {
        this.setState({ mapel_post: value })
    }

    SetJudul = (text) => {
        this.setState({ judul_post: text })
    }
    SetSubJudul = (text) => {
        this.setState({ sub_judul_post: text })
    }

    render() {
        const { source, photoSize, file_name_pdf } = this.state
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation} Post={() => {
                    if (this.state.type_file_post == 'image') {
                        this.PostImage()
                    } else {
                        this.PostPDF()
                    }
                    // // imge
                    // this.PostImage()

                    // // pdf
                    // this.PostPDF()
                }}> </Header>
                <ScrollView style={{paddingBottom: 60}}>
                    <FormPost navigation={this.props.navigation} OpenModal={this.OpenModal} OpenModal1={this.OpenModal1} mapel_post={this.state.mapel_post}
                        judul_post={this.state.judul_post} sub_judul_post={this.state.sub_judul_post} file={this.state.file} SetJudul={(text) => { this.SetJudul(text) }}
                        SetSubJudul={(text) => { this.SetSubJudul(text) }} user={this.state.user} source={source} photoSize={photoSize} file_name_pdf={file_name_pdf} type_file_post={this.state.type_file_post}></FormPost>
                </ScrollView>
                <Modal visible={this.state.openModal1} transparent>
                    <View style={{
                        flex: 1, paddingHorizontal: 50, marginTop: -210, alignItems: 'flex-start', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,0)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 8, minWidth: 100, elevation: 5, borderRadius: 10, alignItems: 'center' }}>
                            <Pressable style={{ padding: 5, paddingStart: 65, marginEnd: -8, marginTop: -3, borderBottomColor: '#AAA', borderBottomWidth: .2 }}
                                onPress={() => {
                                    this.setState({ openModal1: false })
                                }}>
                                <Ionicons name='ios-close' size={15} color='#000' style={{ paddingHorizontal: 8 }}></Ionicons>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Matematika')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Matematika</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Kimia')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Kimia</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Fisika')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Fisika</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Bahasa Indonesia')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>B.Indonesia</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Bahasa Inggris')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>B.Inggris</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Modal visible={this.state.openModal} transparent>
                    <View style={{
                        flex: 1, paddingHorizontal: 50, marginTop: -150, alignItems: 'flex-start', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,0)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 5, minWidth: 100, elevation: 5, borderRadius: 10 }}>
                            <Pressable style={{ padding: 5, paddingStart: 65, marginTop: -3, borderBottomColor: '#AAA', borderBottomWidth: .5 }}
                                onPress={() => {
                                    this.setState({ openModal: false })
                                }}>
                                <Ionicons name='ios-close' size={15} color='#000' style={{ paddingEnd: -5 }}></Ionicons>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.setState({ openModal2: true, openModal: false }) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: -10 }}>
                                    <MaterialCommunityIcons name='file-image-plus' size={20} color='#0CBA1D'></MaterialCommunityIcons>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black', paddingStart: 9 }}>Image</Text>
                                </View>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasOlahraga() }}>
                                onPress={() => { this.GetPdf() }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: -25 }}>
                                    <MaterialCommunityIcons name='file-plus' size={20} color='#C62828'></MaterialCommunityIcons>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black', paddingStart: 9 }}>PDF</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Modal visible={this.state.openModal2} transparent>
                    <View style={{ backgroundColor: 'rgba(80,80,80,.5)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#FFF', padding: 10, borderRadius: 10 }}>
                            <Pressable style={{ padding: 5, paddingStart: 95, marginTop: -8, borderBottomColor: '#AAA', borderBottomWidth: .3 }}
                                onPress={() => {
                                    this.setState({ openModal2: false })
                                }}>
                                <Ionicons name='ios-close' size={15} color='#000' ></Ionicons>
                            </Pressable>
                            <Pressable style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => { this.UploadGambar('select-from-gallery', this.setState({ openModal2: false })) }}>
                                <EvilIcons name='image' size={25} color='#000'></EvilIcons>
                                <Text style={{ fontFamily: 'Inter-Medium', color: '#000', fontSize: 12, paddingStart: 5 }}>Pilih Galeri</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => { this.UploadGambar('camera', this.setState({ openModal2: false })) }}>
                                <EvilIcons name='camera' size={25} color='#000'></EvilIcons>
                                <Text style={{ fontFamily: 'Inter-Medium', color: '#000', fontSize: 12, paddingStart: 5 }}>Buka Kamera</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const Header = ({ navigation, Post }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='chevron-left' size={25} color='black'></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Create Post</Text>
        <BaseButton style={{ padding: 5 }}
            onPress={() => {
                console.log('yuhuuu');
                Post()
            }}>
            <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
        </BaseButton>
    </View>
)

const FormPost = ({ navigation, OpenModal, OpenModal1, mapel_post, judul_post, sub_judul_post, file_name_pdf, SetJudul, SetSubJudul, user, source, photoSize, type_file_post }) => (
    <View style={{ paddingHorizontal: 30, marginTop: 20, marginBottom: 40 }}>
        <BaseButton style={{ marginEnd: 200 }}
            onPress={() => { navigation.navigate('profile') }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/logo/user_profile.png')}></Image>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#000', paddingHorizontal: 10 }}>{user}</Text>
            </View>
        </BaseButton>
        <View style={{ flexDirection: 'row', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingVertical: 15 }}>
            <Pressable
                onPress={() => { OpenModal1() }}>
                <MaterialIcons name='category' size={20} color='#000'></MaterialIcons>
            </Pressable>
            <View style={{ backgroundColor: '#38C6C6', marginLeft: 10, borderRadius: 5, minWidth: 80, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#FFF' }}>{mapel_post}</Text>
            </View>
        </View>
        <View style={{ paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingBottom: 10}}>
            <Pressable style={{ flexDirection: 'row' }}
                onPress={() => { OpenModal() }}>
                <MaterialCommunityIcons name='file-plus-outline' size={20} color='#000'></MaterialCommunityIcons>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000', paddingHorizontal: 10, minHeight: 40 }}>Input materi</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    type_file_post == 'pdf'

                        // kondisi tipe file
                        ?
                        <MaterialCommunityIcons name='file-pdf-box' color={'#F24E1E'} size={25}></MaterialCommunityIcons>
                        : null
                }
                {
                    type_file_post == 'pdf'

                    // kondisi tipe file
                    ?
                    <Text style={{ fontFamily: 'Itim-Regular', fontSize: 13, color: '#000' }}>{file_name_pdf}</Text>
                    : null
                }
                
            </View>
            {
                type_file_post == 'image'
                ?
                <Image source={source} style={photoSize} ></Image>
                :null
            }
            
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Judul</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
                placeholder='What do you think?'
                value={judul_post}
                onChangeText={(text) => { SetJudul(text) }}></TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Sub Judul</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
                placeholder='What do you think?'
                value={sub_judul_post}
                onChangeText={(text) => { SetSubJudul(text) }}></TextInput>
        </View>
    </View>
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default CreatePost