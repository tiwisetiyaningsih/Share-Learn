import { Text, View, StyleSheet, Image, TextInput, StatusBar, Modal, Pressable, Dimensions, Alert } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import DocumentPicker, { isInProgress, isCancel } from 'react-native-document-picker'
import axios from 'axios'
import Constant from '../Componen/Constant'

const { width, height } = Dimensions.get('screen')
export class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            openModal1: false,
            openModal2: false,
            mapel_post: this.props.route.params.data.mapel_post,
            user: this.props.route.params.data.user_post,
            judul_post: this.props.route.params.data.judul_post,
            sub_judul_post: this.props.route.params.data.sub_judul_post,

            camera: '',
            source: '',
            photoSize: '',
            file_pdf: '',
            file_name_pdf: '',
            type_file_post: this.props.route.params.data.type_file,
            input_materi: false,
            file_name_pdf_baru: '',
            type_file_post_baru: '',

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
                let ISH = ((height - 500) / response.assets[0].height)
                let _width = response.assets[0].width * IS
                let _height = response.assets[0].height * ISH

                let source = { uri: response.assets[0].uri }
                let photoAttachment = 'data:image/jpeg;base64,' + response.assets[0].base64
                let photoSize = {
                    width: _width,
                    height: _height,
                    borderRadius: 10
                }
                this.setState({ camera: photoAttachment, source: source, photoSize, type_file_post: 'Image', input_materi: true })

            }
        } catch (error) {
            console.log(error)
        }
    }

    GetPdf = async () => {
        this.setState({ openModal: false })
        let document = await DocumentPicker.pick({
            allowMultiSelection: false,
            copyTo: 'cachesDirectory'
        })

        console.log(JSON.stringify(document, null, 2))
        let file_name_pdf = document[0].name
        console.log('name_file', file_name_pdf)

        this.setState({ file_pdf: document[0], type_file_post: 'Pdf', openModal: false, file_name_pdf: file_name_pdf, input_materi: true })
    }

    UpdatepostImage = (id) => {
        const { user, judul_post, sub_judul_post, mapel_post, camera } = this.state
        console.log(user, judul_post, sub_judul_post, mapel_post, camera)
        let postData = {
            "user_post": user,
            "judul_post": judul_post,
            "sub_judul_post": sub_judul_post,
            "mapel_post": mapel_post,
            "file_post": camera,
            "type_file": 'Image'
        }
        console.log(Constant.api_url + 'api/post/updatePost/' + id)
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/post/updatePost/' + id,
            data: postData
        }).then((back) => {
            console.log(back.data)
            if (back.data.massage === "success update") {
                Alert.alert("Successfully", "Post was successfully updated", [
                    {
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('mypost')
                    }
                ])
            }
        }).catch((error) => {
            // console.log("error", JSON.stringify(error))
            if(error){
                if(error.response){
                    console.log(error.response.data.message)
                }
            }
        })
    }

    UpdatepostPdf = (id) => {
        const { user, judul_post, sub_judul_post, mapel_post, file_pdf } = this.state
        console.log(user, judul_post, sub_judul_post, mapel_post, file_pdf)
        // let postData = {
        //     "user_post": user,
        //     "judul_post": judul_post,
        //     "sub_judul_post": sub_judul_post,
        //     "mapel_post": mapel_post,
        //     "file_post": file_pdf
        // }

        const postData = new FormData()
        postData.append('user_post', user)
        postData.append('judul_post', judul_post)
        postData.append('sub_judul_post', sub_judul_post)
        postData.append('mapel_post', mapel_post)
        postData.append('file_post', file_pdf)
        postData.append('type_file', 'Pdf')

        console.log(Constant.api_url + 'api/post/updatePostPdf/' + id)
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/post/updatePostPdf/' + id,
            data: postData,     
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(async (back) => {
            console.log(back.data)
            console.log(back.data.massage === 'success update')
            // const value = await AsyncStorage.getItem('users');
            // let Account = JSON.parse(value)
            if (back.data.massage === 'success update') {
                console.log('yuhu');
                // Account.data.fullname = user
                // await AsyncStorage.setItem("users", JSON.stringify(Account))
                Alert.alert("Successfully", "Post was successfully updated", [
                    {
                        text: "Oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('mypost')
                    }
                ])
            }
        }).catch((error) => {
            // console.log("error", JSON.stringify(error))
            if(error){
                if(error.response){
                    console.log(error.response.data.message)
                }
            }
        })
    }

    render() {
        const hasilKirim = this.props.route.params.data
        console.log('hasilkirim', hasilKirim)
        console.log(this.state.type_file_post)
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation} Updatepost={(data) => {
        console.log(this.state.type_file_post)
                    if (this.state.type_file_post == 'Image') {
                        this.UpdatepostImage(data)
                    } else {
                        this.UpdatepostPdf(data)
                    }
                }} hasilKirim={hasilKirim}> </Header>
                <ScrollView style={{ paddingBottom: 60 }}>
                    <FormEditPost navigation={this.props.navigation} OpenModal={this.OpenModal} OpenModal1={this.OpenModal1} mapel_post={this.state.mapel_post} user={this.state.user} judul_post={this.state.judul_post} sub_judul_post={this.state.sub_judul_post} source={this.state.source} SetJudul={(text) => this.SetJudul(text)} SetSubJudul={(text) => { this.SetSubJudul(text) }} type_file_post={this.state.type_file_post} file_name_pdf={this.state.file_name_pdf} photoSize={this.state.photoSize} input_materi={this.state.input_materi} hasilKirim={hasilKirim}></FormEditPost>
                </ScrollView>
                <Modal visible={this.state.openModal1} transparent>
                <View style={{
                        flex: 1, paddingHorizontal: 50, marginTop: -90, alignItems: 'flex-start', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,0)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 8, minWidth: 100, elevation: 5, borderRadius: 10, alignItems: 'center' }}>
                            <Pressable style={{ padding: 5, paddingStart: 65, marginEnd: -50, marginTop: -3 }}
                                onPress={() => {
                                    this.setState({ openModal1: false })
                                }}>
                                <Ionicons name='close-circle' size={23} color='#38C6C6' style={{ marginRight:- 20 }}></Ionicons>
                            </Pressable>
                            <Pressable style={{ margin: 5, justifyContent: 'flex-start', alignItems: 'center', width: 150, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#38C6C6' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Bahasa Indonesia')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: '#000' }}>Bahasa Indonesia</Text>
                            </Pressable>
                            <Pressable style={{ margin: 5, justifyContent: 'flex-start', alignItems: 'center', width: 150, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#38C6C6' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Bahasa Inggris')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: '#000' }}>Bahasa Inggris</Text>
                            </Pressable>
                            <Pressable style={{ margin: 5, justifyContent: 'flex-start', alignItems: 'center', width: 150, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#38C6C6' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Biologi')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: '#000' }}>Biologi</Text>
                            </Pressable>
                            <Pressable style={{ margin: 5, justifyContent: 'flex-start', alignItems: 'center', width: 150, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#38C6C6' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Fisika')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: '#000' }}>Fisika</Text>
                            </Pressable>
                            <Pressable style={{ margin: 5, justifyContent: 'flex-start', alignItems: 'center', width: 150, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#38C6C6' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Geografi')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: '#000' }}>Geografi</Text>
                            </Pressable>
                            <Pressable style={{ margin: 5, justifyContent: 'flex-start', alignItems: 'center' , width: 150, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#38C6C6'}} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Kimia')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: '#000'}}>Kimia</Text>
                            </Pressable>
                            <Pressable style={{ margin: 5, justifyContent: 'flex-start', alignItems: 'center' , width: 150, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#38C6C6'}} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1(this.MapelPost('Matematika')) }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: '#000' }}>Matematika</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Modal visible={this.state.openModal} transparent>
                    <View style={{
                        flex: 1, paddingHorizontal: 50, marginTop: 245, alignItems: 'flex-start', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,0)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 5, minWidth: 100, elevation: 5, borderRadius: 10 }}>
                            <Pressable style={{ padding: 5, paddingStart: 65, marginTop: -3, borderBottomColor: '#000', borderBottomWidth: .5 }}
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
                            <Pressable style={{ padding: 5, paddingLeft: 145, marginTop: -8, borderBottomColor: '#AAA', borderBottomWidth: .3 }}
                                onPress={() => {
                                    this.setState({ openModal2: false })
                                }}>
                                <Ionicons name='ios-close' size={15} color='#000' ></Ionicons>
                            </Pressable>
                            <Pressable style={{ padding: 5, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
                                onPress={() => { this.UploadGambar('select-from-gallery', this.setState({ openModal2: false })) }}>
                                <EvilIcons name='image' size={25} color='#000'></EvilIcons>
                                <Text style={{ fontFamily: 'Inter-Medium', color: '#000', fontSize: 12, paddingStart: 5 }}>Pick from the gallery</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => { this.UploadGambar('camera', this.setState({ openModal2: false })) }}>
                                <EvilIcons name='camera' size={25} color='#000'></EvilIcons>
                                <Text style={{ fontFamily: 'Inter-Medium', color: '#000', fontSize: 12, paddingStart: 5 }}>Open the camera</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const Header = ({ navigation, Updatepost, hasilKirim }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='chevron-left' size={25} color='black'></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Edit Post</Text>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { Updatepost(hasilKirim.id) }}>
            <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
        </BaseButton>
    </View>
)

const FormEditPost = ({ navigation, OpenModal, OpenModal1, mapel_post, user, judul_post, sub_judul_post, source, SetJudul, SetSubJudul, type_file_post, file_name_pdf, photoSize, input_materi, hasilKirim }) => (
    <View style={{ paddingHorizontal: 30, marginTop: 20, marginBottom: 40 }}>
        <BaseButton style={{ marginEnd: 100 }}
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
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Tittle</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
                placeholder='What do you think?'
                value={judul_post}
                onChangeText={(text) => { SetJudul(text) }}>
            </TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Subtitles</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
                placeholder='What do you think?'
                value={sub_judul_post}
                onChangeText={(text) => { SetSubJudul(text) }}>
            </TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingVertical: 10 }}>
            <Pressable style={{ flexDirection: 'row' }}
                onPress={() => { OpenModal() }}>
                <MaterialCommunityIcons name='file-plus-outline' size={20} color='#000'></MaterialCommunityIcons>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000', paddingHorizontal: 10, minHeight: 50 }}>Lesson material</Text>
            </Pressable>
            {
                input_materi
                    ?
                    <View>
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
                                <Image source={source} style={{ width: 330, height: 230, borderRadius: 10 }} ></Image>
                                : null
                        }
                    </View>
                    :
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {
                                hasilKirim.type_file == 'Pdf'

                                    // kondisi tipe file
                                    ?
                                    <MaterialCommunityIcons name='file-pdf-box' color={'#F24E1E'} size={25}></MaterialCommunityIcons>
                                    : null
                            }
                            {
                                hasilKirim.type_file == 'Pdf'

                                    // kondisi tipe file
                                    ?
                                    <Text style={{ fontFamily: 'Itim-Regular', fontSize: 13, color: '#000' }}>{hasilKirim.judul_post + '.pdf'}</Text>
                                    : null
                            }

                        </View>
                        {
                            hasilKirim.type_file == 'Image'
                                ?
                                <Image source={{ uri: Constant.api_url + hasilKirim.file_post }} style={{ width: 330, height: 230, borderRadius: 10 }} ></Image>
                                : null
                        }
                    </View>
            }
        </View>
    </View>
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default EditPost