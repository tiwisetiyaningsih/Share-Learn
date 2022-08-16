import { Text, View, StyleSheet, StatusBar, Image, Modal, Pressable, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import Feather from 'react-native-vector-icons/Feather'
import RNFetchBlob from 'rn-fetch-blob'



export class MyPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            user: '',
            listPost: [],
            listLike: [],
            listLikeOn: [],
            listLikeOnThread: [],
            listPostForum: [],
            listLikeForum: []
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
            url: Constant.api_url + 'api/post/read/' + user
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            let listPost = back.data.data.reverse()
            this.setState({ listPost: back.data.data.reverse() })
            console.log('listPost', listPost)
        }).catch((error) => {
            console.log("error", error)
        })
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

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/postForum/read/getPostbyUser/' + user
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
            let listLikeOnThread = back.data.data.reverse()
            this.setState({ listLikeOnThread: back.data.data.reverse() })
            console.log('listLikeOnThread', listLikeOnThread)
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
                url: Constant.api_url + 'api/post/read/' + user
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                let listPost = back.data.data.reverse()
                this.setState({ listPost: back.data.data.reverse() })
                console.log('listPost', listPost)
            }).catch((error) => {
                console.log("error", error)
            })
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
        })
    }

    PostLike = (id) => {
        const { user } = this.state
        console.log(user, id)

        let postData =
        {
            "user_like": user,
            "id_post": id,
            "id_post_forum": 0
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
                Alert.alert("Gagal", back.data.message)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    OpenModal = () => {
        this.setState({ openModal: true })
    }

    CloseModal = () => {
        this.setState({ openModal: false })
    }

    DeletePost = (id) => {
        console.log(id)
        console.log(Constant.api_url + 'api/post/delete/' + id)

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/post/delete/' + id
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            if (back.data.massage === 'success') {
                console.log("hello")
                Alert.alert("Successfully", 'The posts have been deleted.', [
                    {
                        text: "Oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('mypost')
                    }
                ])

            } else {
                Alert.alert("Failed", 'The posts failed to deleted.')
            }
        }).catch((error) => {
            console.log(error)
        })

        const { user } = this.state
        console.log(user)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/post/read/' + user
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            let listPost = back.data.data.reverse()
            this.setState({ listPost: back.data.data.reverse() })
            console.log('listPost', listPost)
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

    PostLikeThread = (id) => {
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
                let like = this.state.listLikeForum
                like = [...like, back.data.data]
                this.setState({ listLikeForum: like })
                axios({
                    method: 'GET',
                    url: Constant.api_url + 'api/postForum/IdPostbyUser/' + user
                }).then((back) => {
                    console.log(JSON.stringify(back.data, null, 2))
                    let listLikeOnThread = back.data.data.reverse()
                    this.setState({ listLikeOnThread: back.data.data.reverse() })
                    console.log('listLikeOnThread', listLikeOnThread)
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

    DeletePostThread = (id) => {
        console.log(id)
        console.log(Constant.api_url + 'api/postForum/delete/' + id)

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/postForum/delete/' + id
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            if (back.data.massage === 'success') {
                console.log("hello")
                Alert.alert("Successfully", 'The posts have been deleted.', [
                    {
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('mypost')
                    }
                ])

            } else {
                Alert.alert("Failed", 'The posts failed to deleted.')
            }
        }).catch((error) => {
            console.log(error)
        })

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/postForum/read/getPostbyUser/' + user
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            let listPostForum = back.data.data.reverse()
            this.setState({ listPostForum: back.data.data.reverse() })
            console.log('listPostForum', listPostForum)
        }).catch((error) => {
            console.log("error", error)
        })
    }

    render() {
        return (
            <View style={style.app} >
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    <View style={{ borderBottomColor: '#38C6C6', borderBottomWidth: 1, borderTopColor: "#38C6C6", borderTopWidth: 1, backgroundColor: '#FFF', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#FF8C00' }}>Material</Text>
                    </View>
                    {this.state.listPost.map((item, index) => {
                        console.log('yyy', item, index)
                        {
                            if (item.type_file == 'Image') {
                                return <PostImage user={this.state.user} navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} DeletePost={(data) => { this.DeletePost(data) }} listLikeOn={this.state.listLikeOn} Download={(file) => { this.Download(file) }}></PostImage>
                            } else {
                                return <PostPdf user={this.state.user} navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} DeletePost={(data) => { this.DeletePost(data) }} listLikeOn={this.state.listLikeOn} Download={(file) => { this.Download(file) }}></PostPdf>
                            }
                        }

                    })}
                    <View style={{ borderBottomColor: '#FF8C00', borderBottomWidth: 1, borderTopColor: "#FF8C00", borderTopWidth: 1, backgroundColor: '#FFF', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#38C6C6' }}>Thread</Text>
                    </View>
                    {this.state.listPostForum.map((item, index) => {
                        console.log('yyy', item, index)
                        return <Thread key={index} data={item} PostLikeThread={(id) => { this.PostLikeThread(id) }} listLikeOnThread={this.state.listLikeOnThread} navigation={this.props.navigation} DeletePostThread={(data) => { this.DeletePostThread(data) }} user={this.state.user}></Thread>
                    })}
                </ScrollView>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', paddingHorizontal: 25, paddingTop: 10, paddingBottom: 15, alignItems: 'center', backgroundColor: '#38C6C6' }}>
        <BaseButton style={{ padding: 5, justifyContent: 'flex-start' }}
            onPress={() => { navigation.navigate('profile') }}>
            <Octicons name='chevron-left' size={25} color='#FFF' ></Octicons>
        </BaseButton>
        <View style={{ alignItems: 'center', flex: 1, marginStart: -30 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 18, color: '#FFF', justifyContent: 'center' }}>My Post</Text>
        </View>
    </View>
)

const PostPdf = ({ navigation, data, DeletePost, user, listLikeOn, PostLike, Download }) => {
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
                    <BaseButton
                        onPress={() => { navigation.navigate('profile') }}>
                        <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingHorizontal: 8 }}>{data.user_post}</Text>
                </View>
                <Pressable android_ripple={{ color: '#FFDDDD' }}
                    onPress={() => {
                        {
                            data.user_post === user
                                ?
                                Alert.alert('Modification', 'You sure you want to edit it or delete it?',
                                    [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'Edit',
                                            style: 'default',
                                            onPress: () => {
                                                let kirim = {
                                                    data
                                                }
                                                navigation.navigate('editpost', kirim)
                                            }
                                        },
                                        {
                                            text: 'Delete',
                                            style: 'default',
                                            onPress: () => { DeletePost(data.id) }
                                        }
                                    ])
                                : null
                        }

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
                        <BaseButton style={{ padding: 5 }}
                            onPress={() => {
                                let kirim = {
                                    data
                                }
                                navigation.navigate('comment', kirim)
                            }}>
                            <Ionicons name='chatbubble-ellipses-outline' size={23} color='black'></Ionicons>
                        </BaseButton>
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


const PostImage = ({ navigation, data, PostLike, DeletePost, user, listLikeOn, Download }) => {
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
                    <BaseButton
                        onPress={() => { navigation.navigate('profile') }}>
                        <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingHorizontal: 8 }}>{data.user_post}</Text>
                </View>
                <Pressable android_ripple={{ color: '#FFDDDD' }}
                    onPress={() => {
                        {
                            data.user_post === user
                                ?
                                Alert.alert('Modification', 'You sure you want to edit it or delete it?',
                                    [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'Edit',
                                            style: 'default',
                                            onPress: () => {
                                                let kirim = {
                                                    data
                                                }
                                                navigation.navigate('editpost', kirim)
                                            }
                                        },
                                        {
                                            text: 'Delete',
                                            style: 'default',
                                            onPress: () => { DeletePost(data.id) }
                                        }
                                    ])
                                : null
                        }

                    }}>
                    <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
                </Pressable>
            </View>
            <View style={{ alignItems: 'center', paddingTop: 8 }}>
                <Image source={{ uri: Constant.api_url + data.file_post }} style={{ width: 370, height: 320, borderRadius: 5 }}></Image>
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
                                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: '#000' }}>{data.jumlah_like}</Text>
                        }
                    </View>
                    <View style={{ paddingStart: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <BaseButton style={{ padding: 5 }}
                            onPress={() => {
                                let kirim = {
                                    data
                                }
                                navigation.navigate('comment', kirim)
                            }}>
                            <Ionicons name='chatbubble-ellipses-outline' size={23} color='black'></Ionicons>
                        </BaseButton>
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

const Thread = ({ data, PostLikeThread, listLikeOnThread, navigation, DeletePostThread, user }) => {
    let like = false
    listLikeOnThread.map(item => {
        if (data.id_thread == item.id_post_thread) {
            like = true
        } else {

        }
    })
    console.log('LIKE POST,', data.id, like)
    return (
        <View style={{ backgroundColor: '#FFF', padding: 20, marginBottom: 4, elevation: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#000', marginLeft: 10 }}>{data.user_thread}</Text>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 10, color: '#AAA', marginLeft: 10 }}>{data.created_at}</Text>
                    </View>
                    <BaseButton
                        onPress={() => {
                            {
                                data.user_thread === user
                                    ?
                                    Alert.alert('Deleted', 'You sure you want to delete it?',
                                        [
                                            {
                                                text: 'Delete',
                                                style: 'default',
                                                onPress: () => { DeletePostThread(data.id_thread) }
                                            },
                                            {
                                                text: 'Cancel',
                                                style: 'cancel'
                                            }
                                        ])
                                    : null
                            }

                        }}>
                        <Feather name='more-horizontal' size={20} color='#000'></Feather>
                    </BaseButton>
                </View>
            </View>
            <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{data.thread}</Text>
            </View>
            {
                data.file_thread !== 'No Image'
                    ?
                    <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
                        <Image source={{ uri: Constant.api_url + data.file_thread }} style={{ width: 320, height: 150, borderRadius: 10 }}></Image>
                    </View>
                    : null
            }
            <View style={{ flexDirection: 'row', paddingHorizontal: 45, marginTop: 5, alignItems: 'center' }}>
                <BaseButton
                    onPress={() => {
                        let kirim = {
                            data
                        }
                        navigation.navigate('commentpostforum', kirim)
                    }}>
                    <Ionicons name='ios-chatbubble-outline' size={15} color='#000'></Ionicons>
                </BaseButton>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: '#000', marginLeft: 2 }}>{data.jumlah_comment}</Text>
                <BaseButton style={{ marginHorizontal: 2, marginLeft: 8 }}
                    onPress={() => {
                        PostLikeThread(data.id_thread)
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

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default MyPost