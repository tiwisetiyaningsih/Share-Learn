import { Text, View, StatusBar, StyleSheet, Image, ScrollView, TextInput, Modal, Pressable, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'


export class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            listComment: [],
            user: '',
            comment: '',
            id_post: this.props.route.params.data.id,
            user_post: this.props.route.params.data.user_post,
            id_user: ''
        }
    }

    UNSAFE_componentWillMount = async () => {

        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        console.log(Account.data.fullname)
        this.setState({ user: Account.data.fullname, id_user: Account.data.id_users })

        let id_post = this.state.id_post
        console.log('cek', Constant.api_url + 'api/comment/read/' + id_post)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/read/' + id_post
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listComment: back.data.data })
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
            let nis = Account.data.nis
            this.setState({ nis: Account.data.nis })
            console.log('nis user', nis)
            let email = Account.data.email
            this.setState({ email: Account.data.email })
            console.log('email user', email)
            let fullname = Account.data.fullname
            this.setState({ fullname: Account.data.fullname })
            console.log('fullname user', fullname)
        })
    }


    SetComment = (text) => {
        this.setState({ comment: text })
    }

    PostComment = () => {
        const { user, comment, id_post, id_user, user_post } = this.state
        console.log(user, comment, id_post)

        let postData =
        {
            "user_post": user_post,
            "user_comment": user,
            "comment": comment,
            "id_post": id_post
        }
        console.log(Constant.api_url + 'api/comment/create')

        axios({
            method: 'POST',
            url: Constant.api_url + 'api/comment/create',
            data: postData
        }).then((back) => {
            console.log(JSON.stringify(back))
            console.log(back.data)
            if (back.status === 200) {
                console.log("hello")
                let Comment = this.state.listComment
                Comment = [...Comment, back.data.data]
                this.setState({ listComment: Comment, comment: '' })
                // this.setState({ comment: ''})
            } else {
                Alert.alert("Failed", back.data.message)
            }
        }).catch((error) => {
            console.log(error)
        })
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/read/' + id_post
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listComment: back.data.data })
        }).catch((error) => {
            console.log("error", error)
        })
    }

    DeleteComment = (id_comment) => {
        console.log(id_comment)
        console.log(Constant.api_url + 'api/comment/delete/' + id_comment)

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/delete/' + id_comment
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            if (back.data.massage === 'success') {
                console.log("hello")
                Alert.alert("Successfully", 'The comment has been deleted.')
            } else {
                Alert.alert("Failed", 'Comment failed to be deleted.')
            }
        }).catch((error) => {
            console.log(error)
        })

        const { user, id_post } = this.state
        console.log(user)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/read/' + id_post
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listComment: back.data.data })
        }).catch((error) => {
            console.log("error", error)
        })
    }

    Download = async (file) => {
        console.log(file)
        let download = await RNFetchBlob.config({
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
            }
        }).fetch('GET', Constant.api_url + file)
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        const dataKirim = this.props.route.params.data
        console.log('hello', dataKirim)
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView style={{ marginBottom: 8 }}>
                    {
                        dataKirim.type_file === 'Pdf'
                            ?
                            <PostPdf dataKirim={dataKirim} Download={(file) => this.Download(file)}></PostPdf>
                            : null
                    }
                    {
                        dataKirim.type_file === 'Image'
                            ?
                            <PostImage dataKirim={dataKirim} Download={(file) => this.Download(file)}></PostImage>
                            : null
                    }
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', paddingBottom: 10, paddingStart: 20, marginTop: 10 }}>Comment</Text>
                    {this.state.listComment.map((item, index) => {
                        console.log(item, index)
                        return <ListComment key={index} data={item} DeleteComment={(data) => { this.DeleteComment(data) }} user={this.state.user} navigation={this.props.navigation}></ListComment>
                    })}
                </ScrollView>
                <Fouter SetComment={(text) => { this.SetComment(text) }} PostComment={() => { this.PostComment() }} comment={this.state.comment}></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 15, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF', marginBottom: 10, elevation: 5 }}>
        <BaseButton style={{ padding: 5, marginLeft: -150 }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', justifyContent: 'center', marginLeft:-10}}>Comment</Text>
    </View>
)

const PostPdf = ({ navigation, Download, dataKirim }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 4, elevation: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                </View>
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingHorizontal: 8 }}>{dataKirim.user_post}</Text>
            </View>
            <Pressable android_ripple={{ color: '#FFDDDD' }}>
                <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
            </Pressable>
        </View>
        <View style={{ backgroundColor: '#FFF', paddingTop: 20, borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5, borderTopColor: '#DADADA', borderTopWidth: .5, marginTop: 10, marginBottom: -2 }}>
            <View style={{ backgroundColor: '#C00000', borderBottomColor: '#7F7F7F', borderBottomWidth: 5, borderTopColor: '#7F7F7F', borderTopWidth: 5, paddingVertical: 20, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Itim-Regular', fontSize: 20, color: '#FFF' }}>{dataKirim.judul_post}</Text>
            </View>
            <View style={{ backgroundColor: '#FFF', alignItems: 'center', borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5 }}>
                <Text style={{ fontFamily: 'Inder-Regular', fontSize: 12, color: 'black', paddingTop: 20, paddingBottom: 10 }}>{dataKirim.sub_judul_post}</Text>
            </View>
            <Image source={require('../assets/images/pdf.png')} style={{ width: 371.5, height: 42.5 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}>
            <View style={{ width: 320, flexDirection: 'column' }}>
                <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: 'black', paddingBottom: 5 }}>{dataKirim.sub_judul_post}</Text>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 12 }}>{dataKirim.updated_at}</Text>
            </View>
            <BaseButton style={{ padding: 5 }}
                onPress={() => { Download(dataKirim.file_post) }}>
                <Feather name='download' size={23} color='black'></Feather>
            </BaseButton>
        </View>
    </View>
)

const PostImage = ({ navigation, dataKirim, Download }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 4, elevation: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                </View>
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingHorizontal: 8 }}>{dataKirim.user_post}</Text>
            </View>
            <Pressable android_ripple={{ color: '#FFDDDD' }}>
                <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
            </Pressable>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 8 }}>
            <Image source={{ uri: Constant.api_url + dataKirim.file_post }} style={{ width: 370, height: 370, borderRadius: 5 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
            <View style={{ width: 320, flexDirection: 'column' }}>
                <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: 'black', paddingBottom: 5 }}>{dataKirim.sub_judul_post}</Text>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 15 }}>{dataKirim.updated_at}</Text>
            </View>
            <BaseButton style={{ padding: 5 }}
                onPress={() => { Download(dataKirim.file_post) }}>
                <Feather name='download' size={23} color='black'></Feather>
            </BaseButton>
        </View>
    </View>
)

const ListComment = ({ data, DeleteComment, user, navigation }) => (
    <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: '#FFF' }}>
        <View>
            <Image source={require('../assets/logo/user_profile.png')} ></Image>
        </View>
        <View style={{ backgroundColor: '#ECECEC', paddingHorizontal: 15, paddingTop: 5, margin: 10, marginEnd: 20, elevation: 5, flexDirection: 'column', justifyContent: 'space-between', borderBottomEndRadius: 10, borderBottomStartRadius: 10, borderTopEndRadius: 10, borderColor: '#ECECEC', borderWidth: 1, elevation: 2, width: 310 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'baseline', width: 235 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: 'black' }}>{data.user_comment},</Text>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#000', paddingStart: 2 }}>{data.comment}</Text>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 10, paddingTop: 5 }}>{data.updated_at}</Text>
                </View>
                <View style={{  alignItems:'center', justifyContent:'center' }}>
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
                    <BaseButton
                    onPress={()=>{
                        let kirim = {
                            data
                        }
                        navigation.navigate('reply',kirim)}}>
                        <MaterialIcons name='reply' size={20} color='#000'></MaterialIcons>
                    </BaseButton>
                </View>
            </View>
        </View>
    </View>

)

const Fouter = ({ comment, SetComment, PostComment }) => (
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
        <BaseButton style={{ backgroundColor: '#EEE', paddingHorizontal: 10, borderRadius: 50, marginBottom: 8, flex: 1, padding: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextInput style={{ backgroundColor: '#EEE', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 3, fontFamily: 'Inter-Regular', fontSize: 12 }}
                    placeholder='Comment'
                    value={comment}
                    onChangeText={(text) => { SetComment(text) }}
                >
                </TextInput>
                <BaseButton style={{ paddingHorizontal: 5 }}
                    onPress={() => { PostComment() }}>
                    <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
                </BaseButton>
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

export default Comment