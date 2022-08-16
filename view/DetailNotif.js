import { Text, View, Image, StyleSheet, StatusBar, ScrollView, Modal, Pressable, AsyncStorage, Alert, TextInput } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from "react-native-gesture-handler";
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

export class DetailNotif extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            listPost: [],
            listComment: [],
            listLikeOn: [],
            listLike:[],
            user: '',
            comment: '',
            id_post: this.props.route.params.data.id_post,
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
        console.log('cek post', Constant.api_url + 'api/post/read/getNotifPostbyId/' + id_post)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/post/read/getNotifPostbyId/' + id_post
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listPost: back.data.data })
        }).catch((error) => {
            console.log("error", error)
        })
        const { user } = this.state
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/post/IdPostbyUser/' + user
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            let listLikeOn = back.data.data.reverse()
            this.setState({ listLikeOn: back.data.data.reverse() })
            console.log('listLikeOn', listLikeOn)
        }).catch((error) => {
            console.log("error", error)

        })
        console.log('cek comment', Constant.api_url + 'api/comment/read/' + id_post)
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

    PostLike = (id) => {
        const { user } = this.state
        console.log(user, id)

        let postData =
        {
            "user_like": user,
            "id_post": id
        }
        console.log(postData)
        console.log(Constant.api_url + 'api/like/create')

        axios({
            method: 'POST',
            url: Constant.api_url + 'api/like/create',
            data: postData
        }).then((back) => {

            console.log(back.data)
            if (back.status === 200) {
                if (back.data.massage == 'success like') {
                    let like_list = this.state.listPost
                    console.log('like_list', like_list)
                    like_list.map((item, index) => {
                        // console.log('like_list index', like_list[index]['jumlah_like']++)
                        if (item.id == id) { like_list[index]['jumlah_like']++ }
                    })
                    this.setState({ listPost: like_list })
                } else if (back.data.massage == 'success unlike') {
                    let like_list = this.state.listPost
                    like_list.map((item, index) => {
                        // console.log('like_list index', like_list[index]['jumlah_like']--)
                        if (item.id == id) { like_list[index]['jumlah_like']-- }
                    })
                    this.setState({ listPost: like_list })
                }
                console.log("hello")
                let like = this.state.listLike
                like = [...like, back.data.data]
                this.setState({ listLike: like })
                axios({
                    method: 'GET',
                    url: Constant.api_url + 'api/post/IdPostbyUser/' + user
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
                {this.state.listPost.map((item, index) => {
                    console.log('yyy', item, index)
                return <Header navigation={this.props.navigation} data={item}></Header>
                })}
                <ScrollView style={{ marginBottom: 8 }}>
                    {this.state.listPost.map((item, index) => {
                        console.log('yyy', item, index)
                        if (dataKirim.type_file === 'Image') {
                            return <PostImage key={index} data={item} PostLike={(data) => this.PostLike(data)} DeletePost={(data) => { this.DeletePost(data) }} Download={(file) => this.Download(file)} listLikeOn={this.state.listLikeOn}></PostImage>
                        } else {
                            return <PostPdf key={index} data={item} PostLike={(data) => this.PostLike(data)} DeletePost={(data) => { this.DeletePost(data) }} Download={(file) => this.Download(file)} listLikeOn={this.state.listLikeOn}></PostPdf>
                        }
                    })}
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', paddingBottom: 10, paddingStart: 20, marginTop: 10 }}>Comment</Text>
                    {this.state.listComment.map((item, index) => {
                        console.log(item, index)
                        return <ListComment key={index} data={item} DeleteComment={(data) => { this.DeleteComment(data) }} user={this.state.user}></ListComment>
                    })}
                </ScrollView>
            </View>
        )
    }
}

const Header = ({ navigation, data }) => (
    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', padding: 20, alignItems: 'center', justifyContent: 'space-between' }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('notification') }}>
            <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
        </BaseButton>
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>{data.user_post}</Text>
        </View>
    </View>
)

const PostPdf = ({ navigation, data, PostLike, Download, listLikeOn }) => {
    let like = false
    listLikeOn.map(item => {
        if (data.id == item.id_post) {
            like = true
        } else {

        }
    })
    console.log('LIKE POST,', data.id, like)
    return (
        <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 15, marginBottom: 4, elevation: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                    </View>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingHorizontal: 8 }}>{data.user_post}</Text>
                </View>
                <Pressable android_ripple={{ color: '#FFDDDD' }}
                    onPress={() => {

                    }}>
                    <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
                </Pressable>
            </View>
            <View style={{ backgroundColor: '#FFF', paddingTop: 20, borderLeftColor: '#DADADA', borderLeftWidth: .8, borderRightColor: '#DADADA', borderRightWidth: .8, borderTopColor: '#DADADA', borderTopWidth: .8, marginTop: 10, marginBottom: -2 }}>
                <View style={{ backgroundColor: '#C00000', borderBottomColor: '#7F7F7F', borderBottomWidth: 5, borderTopColor: '#7F7F7F', borderTopWidth: 5, paddingVertical: 20, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 20, color: '#FFF' }}>{data.judul_post}</Text>
                </View>
                <View style={{ backgroundColor: '#FFF', alignItems: 'center', paddingHorizontal: 15 }}>
                    <Text style={{ fontFamily: 'Inder-Regular', fontSize: 15, color: 'black', paddingTop: 20, paddingBottom: 8 }}>{data.sub_judul_post}</Text>
                </View>
            </View>
            <Image source={require('../assets/images/pdf.png')} style={{ width: 371.5, height: 42.5, marginTop: -4 }}></Image>
            <MaterialCommunityIcons name='file-pdf-box' size={32} style={{ paddingHorizontal: 11, marginTop: -38.5, paddingBottom: 5 }} color='#F24E1E'></MaterialCommunityIcons>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <BaseButton style={{ padding: 5 }}
                            onPress={() => {
                                PostLike(data.id)
                            }}>
                            {
                                like == true
                                    ?
                                    <AntDesign name={'star'} size={23} color='#E49500'></AntDesign>
                                    :
                                    <AntDesign name={'staro'} size={23} color='#000'></AntDesign>
                            }
                        </BaseButton>
                        {
                            like == true
                                ?
                                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: '#E49500' }}>{data.jumlah_like}</Text>
                                :
                                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: '#000' }}>{data.jumlah_like}</Text>
                        }
                    </View>
                    <View style={{ paddingStart: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 5 }}>
                            <Ionicons name='chatbubble-ellipses-outline' size={23} color='black'></Ionicons>
                        </View>
                        <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>{data.jumlah_comment}</Text>
                    </View>
                </View>
                <BaseButton style={{ padding: 5 }}
                    onPress={() => { Download(data.file_post) }}>
                    <Feather name='download' size={23} color='black'></Feather>
                </BaseButton>
            </View>
            <View style={{ width: 320 }}>
                <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: 'black', paddingBottom: 5 }}>{data.sub_judul_post}</Text>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 5 }}>{data.updated_at}</Text>
            </View>
        </View>
    )
}

const PostImage = ({ navigation, data, PostLike, DeletePost, Download, listLikeOn }) => {
    let like = false
    listLikeOn.map(item => {
        if (data.id == item.id_post) {
            like = true
        } else {

        }
    })
    console.log('LIKE POST,', data.id, like)
    return (
        <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 15, marginBottom: 4, elevation: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                    </View>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingHorizontal: 8 }}>{data.user_post}</Text>
                </View>
                <Pressable android_ripple={{ color: '#FFDDDD' }}
                    onPress={() => {
                    }}>
                    <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
                </Pressable>
            </View>
            <View style={{ alignItems: 'center', paddingTop: 8 }}>
                <Image source={{ uri: Constant.api_url + data.file_post }} style={{ width: 370, height: 250, borderRadius: 5 }}></Image>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <BaseButton style={{ padding: 5 }}
                            onPress={() => {
                                PostLike(data.id)
                            }}>
                            {
                                like == true
                                    ?
                                    <AntDesign name={'star'} size={23} color='#E49500'></AntDesign>
                                    :
                                    <AntDesign name={'staro'} size={23} color='#000'></AntDesign>
                            }
                        </BaseButton>
                        {
                            like == true
                                ?
                                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: '#E49500' }}>{data.jumlah_like}</Text>
                                :
                                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>{data.jumlah_like}</Text>
                        }
                    </View>
                    <View style={{ paddingStart: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 5 }}>
                            <Ionicons name='chatbubble-ellipses-outline' size={23} color='black'></Ionicons>
                        </View>
                        <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>{data.jumlah_comment}</Text>
                    </View>
                </View>
                <BaseButton style={{ padding: 5 }}
                    onPress={() => { Download(data.file_post) }}>
                    <Feather name='download' size={23} color='black'></Feather>
                </BaseButton>
            </View>
            <View style={{ width: 320 }}>
                <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: 'black', paddingBottom: 5 }}>{data.sub_judul_post}</Text>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 5 }}>{data.updated_at}</Text>
            </View>
        </View>
    )
}

const ListComment = ({ data, DeleteComment, user }) => (
    <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: '#FFF' }}>
        <View>
            <Image source={require('../assets/logo/user_profile.png')} ></Image>
        </View>
        <View style={{ backgroundColor: '#ECECEC', paddingHorizontal: 15, paddingTop: 5, margin: 10, marginEnd: 20, elevation: 5, flexDirection: 'column', justifyContent: 'space-between', borderBottomEndRadius: 10, borderBottomStartRadius: 10, borderTopEndRadius: 10, borderColor: '#ECECEC', borderWidth: 1, elevation: 2, width: 310 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', width: 235 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: 'black' }}>{data.user_comment},</Text>
                    <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: '#000', paddingStart: 2 }}>{data.comment}</Text>
                </View>
                <Pressable android_ripple={{ color: '#FFDDDD' }}
                    onPress={() => {
                        {
                            data.user_comment === user
                                ?
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
                                : null
                        }
                    }}>
                    <Feather name='more-horizontal' size={15} color='#000'></Feather>
                </Pressable>
            </View>
            <View style={{ alignItems: 'flex-start', paddingBottom: 8, paddingTop: 5 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black' }}>{data.updated_at}</Text>
            </View>
        </View>
    </View>

)


const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default DetailNotif