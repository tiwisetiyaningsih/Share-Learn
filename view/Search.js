import { Text, View, StyleSheet, StatusBar, Image, AsyncStorage, Alert, Pressable, TextInput } from 'react-native'
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
import RNFetchBlob from 'rn-fetch-blob'

export class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            listPost: [],
            listLike: [],
            listLikeOn: [],
            searchText: '',
            listLikeOnThread:[],
            listPostForum:[],
            listLikeForum:[]
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
            url: Constant.api_url + 'api/post/readAll'
        }).then((back) => {
            console.log('postingan', back.data)
            this.setState({ listPost: back.data.data.reverse() })
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
            let listLikeOnThread = back.data.data.reverse()
            this.setState({ listLikeOnThread: back.data.data.reverse() })
            console.log('listLikeOnThread', listLikeOnThread)
        }).catch((error) => {
            console.log("error", error)

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

    search = (text) => {
        this.setState({ searchText: text })
        if (text === '') {
            axios({
                method: 'GET',
                url: Constant.api_url + 'api/post/readAll'
            }).then((back) => {
                console.log('postingan', back.data)
                this.setState({ listPost: back.data.data })
            }).catch((error) => {
                console.log("error", error)
            })
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
        }
    }

    searchPost = () => {
        if (this.state.searchText === '') {
            axios({
                method: 'GET',
                url: Constant.api_url + 'api/post/readAll'
            }).then((back) => {
                console.log('postingan', back.data)
                this.setState({ listPost: back.data.data })
            }).catch((error) => {
                console.log("error", error)
            })
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
        } else {
            axios({
                method: 'GET',
                url: Constant.api_url + 'api/post/seacrhPost/' + this.state.searchText
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                let hasilSearch = back.data.data.reverse()
                console.log(hasilSearch)
                this.setState({ listPost: hasilSearch })
            })
            axios({
                method: 'GET',
                url: Constant.api_url + 'api/postForum/seacrhPost/' + this.state.searchText
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                let hasilSearch = back.data.data.reverse()
                console.log(hasilSearch)
                this.setState({ listPostForum: hasilSearch })
            })
        }
    }

    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <Header navigation={this.props.navigation} searchText={this.state.searchText} search={(text) => { this.search(text) }}
                    searchPost={() => { this.searchPost() }}></Header>
                <ScrollView>
                    <View style={{ borderBottomColor: '#38C6C6', borderBottomWidth: 1, borderTopColor: "#38C6C6", borderTopWidth: 1, backgroundColor: '#FFF', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#FF8C00' }}>Material</Text>
                    </View>
                    {this.state.listPost.map((item, index) => {
                        console.log('yyy', item, index)
                        if (item.type_file == 'Image') {
                            return <PostImage navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} user={this.state.user} listLikeOn={this.state.listLikeOn} Download={(file) => { this.Download(file) }}></PostImage>
                        } else {
                            return <PostPdf navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} user={this.state.user} listLikeOn={this.state.listLikeOn} Download={(file) => { this.Download(file) }}></PostPdf>
                        }

                    })}
                    <View style={{ borderBottomColor: '#FF8C00', borderBottomWidth: 1, borderTopColor: "#FF8C00", borderTopWidth: 1, backgroundColor: '#FFF', alignItems: 'center',marginTop: 5}}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#38C6C6' }}>Thread</Text>
                    </View>
                    {this.state.listPostForum.map((item, index) => {
                        console.log('yyy', item, index)
                        if (item.file_thread == 'No Image') {
                            return <ThreadText key={index} data={item} PostLikeThread={(id) => { this.PostLikeThread(id) }} listLikeOnThread={this.state.listLikeOnThread} navigation={this.props.navigation} DeletePostThread={(data) => { this.DeletePostThread(data) }} user={this.state.user}></ThreadText>
                        } else {
                            return <ThreadImage key={index} data={item} PostLikeThread={(id) => { this.PostLikeThread(id) }} listLikeOnThread={this.state.listLikeOnThread} navigation={this.props.navigation} DeletePostThread={(data) => { this.DeletePostThread(data) }} user={this.state.user}></ThreadImage>
                        }
                    })}
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
            </View>
        )
    }
}

const Header = ({ searchText, search, searchPost }) => (
    <View style={{ paddingHorizontal: 20, paddingTop: 15, paddingBottom: 15, alignItems: 'center', backgroundColor: '#38C6C6' }}>
        <View style={{ backgroundColor: '#FFF', borderRadius: 20, width: 350 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <TextInput style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 2, fontFamily: 'Inter-Regular', fontSize: 12 }}
                    placeholder='Search '
                    value={searchText}
                    onChangeText={(text) => { search(text) }}
                >
                </TextInput>
                <BaseButton style={{ padding: 5 }}
                    onPress={() => { searchPost() }}>
                    <Octicons name='search' size={16} color='#AAA'></Octicons>
                </BaseButton>
            </View>
        </View>
    </View>
)

const PostPdf = ({ navigation, data, PostLike, user, listLikeOn, Download }) => {
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
                    <BaseButton>
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

const PostImage = ({ navigation, data, PostLike, user, DeletePost, listLikeOn, Download }) => {
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

const ThreadText = ({ data, PostLikeThread, listLikeOnThread, navigation }) => {
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
                    <BaseButton>
                        <Feather name='more-horizontal' size={20} color='#000'></Feather>
                    </BaseButton>
                </View>
            </View>
            <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{data.thread}</Text>
            </View>
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
        </View >
    )
}

const ThreadImage = ({ data, PostLikeThread, listLikeOnThread, navigation }) => {
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
                    <BaseButton>
                        <Feather name='more-horizontal' size={20} color='#000'></Feather>
                    </BaseButton>
                </View>
            </View>
            <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{data.thread}</Text>
            </View>
            <View style={{ paddingHorizontal: 45, marginTop: 5 }}>
                <Image source={{ uri: Constant.api_url + data.file_thread }} style={{ width: 320, height: 150, borderRadius: 10 }}></Image>
            </View>
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

const Fouter = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 6, marginTop: 2, elevation: 5 }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <Ionicons name="home-outline" size={23} color='#38C6C6'></Ionicons>
        </BaseButton>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('notes') }}>
            <MaterialCommunityIcons name='notebook-outline' size={23} color='#38C6C6'></MaterialCommunityIcons>
        </BaseButton>
        <View style={{ backgroundColor: '#FFF', borderRadius: 50, marginTop: - 20, padding: 3 }}>
            <BaseButton>
                <View style={{ backgroundColor: '#38C6C6', borderRadius: 50, padding: 10 }}>
                    <Ionicons name='ios-search' size={23} color='#FFF'></Ionicons>
                </View>
            </BaseButton>
        </View>
        {/* <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('search') }}>
            <Ionicons name='ios-search' size={23} color='#38C6C6'></Ionicons>
        </BaseButton> */}
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('forum') }}>
            <FontAwesome name='comments-o' size={23} color='#38C6C6'></FontAwesome>
        </BaseButton>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('profile') }}>
            <Ionicons name="happy-outline" size={23} color='#38C6C6'></Ionicons>
        </BaseButton>
    </View>
)


const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "rgba(80,80,80,0)"
    }
})

export default Search