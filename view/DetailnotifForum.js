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

export class DetailnotifForum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_thread: this.props.route.params.data.id_post_forum,
            id_user: '',
            user: '',
            listPost: [],
            listLikeOn: [],
            listReply: [],
            listLike: []
        }
    }

    UNSAFE_componentWillMount = async () => {

        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        console.log(Account.data.fullname)
        this.setState({ user: Account.data.fullname, id_user: Account.data.id_users })

        const { id_thread } = this.state
        console.log('cek post', Constant.api_url + 'api/postForum/read/getNotifPostbyId/' + id_thread)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/postForum/read/getNotifPostbyId/' + id_thread
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listPost: back.data.data })
            console.log('ListPost', this.state.listPost)
        }).catch((error) => {
            console.log("error", error)
        })
        const { user } = this.state
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
        console.log('cek', Constant.api_url + 'api/commentForum/read/' + id_thread)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/commentForum/read/' + id_thread
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listReply: back.data.data })
        }).catch((error) => {
            console.log("error", error)
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
                    let like_list = this.state.listPost
                    console.log('like_list', like_list)
                    like_list.map((item, index) => {
                        // console.log('like_list index', like_list[index]['jumlah_like']++)
                        if (item.id_thread == id) { like_list[index]['jumlah_like']++ }
                    })
                    this.setState({ listPost: like_list })
                } else if (back.data.massage == 'success unlike') {
                    let like_list = this.state.listPost
                    like_list.map((item, index) => {
                        // console.log('like_list index', like_list[index]['jumlah_like']--)
                        if (item.id_thread == id) { like_list[index]['jumlah_like']-- }
                    })
                    this.setState({ listPost: like_list })
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
                        return <Thread key={index} data={item} PostLike={(data) => this.PostLike(data)} listLikeOn={this.state.listLikeOn}></Thread>
                    })}
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#000', borderTopColor: '#000', borderTopWidth: 1, marginBottom: 10, justifyContent:'center', paddingVertical: 2 }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', paddingHorizontal: 20 }}>Reply</Text>
                    </View>
                    {this.state.listReply.map((item, index) => {
                        console.log(item, index)
                        return <Reply key={index} data={item} DeleteComment={(data) => { this.DeleteComment(data) }} user={this.state.user}></Reply>
                    })}
                </ScrollView>
            </View>
        )
    }
}

const Header = ({ navigation, data }) => (
    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('notification') }}>
            <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
        </BaseButton>
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>{data.user_thread}</Text>
        </View>
    </View>
)

const Thread = ({ data, PostLike, listLikeOn }) => {
    let like = false
    listLikeOn.map(item => {
        if (data.id_thread == item.id_post_thread) {
            like = true
        } else {

        }
    })
    console.log('LIKE POST,', data.id_thread, like)
    return (
        <View style={{ backgroundColor: '#FFF', padding: 20, marginBottom: 4, elevation: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#000', marginLeft: 10 }}>{data.user_thread}</Text>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 10, color: '#AAA', marginLeft: 10 }}>{data.created_at}</Text>
                    </View>
                    <BaseButton>
                        <Feather name='more-horizontal' size={20} color='#000'></Feather>
                    </BaseButton>
                </View>
            </View>
            <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{data.thread}</Text>
            </View>
            {
                data.file_thread != 'No Image'
                    ?
                    <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
                        <Image source={{ uri: Constant.api_url + data.file_thread }} style={{ width: 320, height: 150, borderRadius: 10 }}></Image>
                    </View>
                    : null
            }
            <View style={{ flexDirection: 'row', paddingHorizontal: 45, marginTop: 5, alignItems: 'center' }}>
                <BaseButton>
                    <Ionicons name='ios-chatbubble-outline' size={15} color='#000'></Ionicons>
                </BaseButton>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: '#000', marginLeft: 2 }}>{data.jumlah_comment}</Text>
                <BaseButton style={{ marginHorizontal: 2, marginLeft: 8 }}
                    onPress={() => {
                        PostLike(data.id_thread)
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
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'red', marginLeft: 2 }}>{data.jumlah_like}</Text>
                        :
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: '#000', marginLeft: 2 }}>{data.jumlah_like}</Text>
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



const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})


export default DetailnotifForum