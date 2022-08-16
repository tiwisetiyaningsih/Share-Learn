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
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import RNFetchBlob from 'rn-fetch-blob'

export class Forum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            id_user: '',
            listPostForum: [],
            listLikeOnThread: [],
            listLikeForum: []
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
                url: Constant.api_url + 'api/postForum/readAllpost'
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                let listPostForum = back.data.data.reverse()
                this.setState({ listPostForum: back.data.data.reverse() })
                console.log('listPostForum', listPostForum)
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

    DeletePost = (id) => {
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
                        onPress: this.props.navigation.navigate('forum')
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

    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <Header></Header>
                <ScrollView>
                    {this.state.listPostForum.map((item, index) => {
                        console.log('yyy', item, index)
                        if (item.file_thread == 'No Image') {
                            return <ThreadText key={index} data={item} PostLike={(id) => { this.PostLike(id) }} listLikeOnThread={this.state.listLikeOnThread} navigation={this.props.navigation} DeletePost={(data) => { this.DeletePost(data) }} user={this.state.user}></ThreadText>
                        } else {
                            return <ThreadImage key={index} data={item} PostLike={(id) => { this.PostLike(id) }} listLikeOnThread={this.state.listLikeOnThread} navigation={this.props.navigation} DeletePost={(data) => { this.DeletePost(data) }} user={this.state.user}></ThreadImage>
                        }
                    })}
                    {/* <ThreadText></ThreadText>
                    <ThreadImage></ThreadImage> */}
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
            </View>
        )
    }
}

const Header = () => (
    <View style={{ paddingVertical: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#38C6C6', marginBottom: 2, elevation: 5 }}>
        <Image source={require('../assets/logo/logo_share_learn.png')} style={{ width: 40, height: 35, tintColor: '#FFF' }} ></Image>
    </View>
)

const ThreadText = ({ data, PostLike, listLikeOnThread, navigation, DeletePost, user }) => {
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
                                                onPress: () => { DeletePost(data.id_thread) }
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
        </View >
    )
}

const ThreadImage = ({ data, PostLike, listLikeOnThread, navigation, DeletePost, user }) => {
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
                                                onPress: () => { DeletePost(data.id_thread) }
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



const Fouter = ({ navigation }) => (
    <View style={{ flexDirection: 'column' }}>
        <View style={{ marginTop: -67, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 15 }}>
            <BaseButton style={{ marginRight: 20, backgroundColor: '#38C6C6', borderRadius: 50, padding: 13, elevation: 5 }}
                onPress={() => {
                    navigation.navigate('createpostforum')
                }}>
                <Feather name='edit-3' size={25} color='#FFF'></Feather>
            </BaseButton>
        </View>
        <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 6, elevation: 5 }}>
            <BaseButton style={{ padding: 5 }}
                onPress={() => { navigation.navigate('home') }}>
                <Ionicons name="home-outline" size={23} color='#38C6C6'></Ionicons>
            </BaseButton>
            <BaseButton style={{ padding: 5 }}
                onPress={() => { navigation.navigate('notes') }}>
                <MaterialCommunityIcons name='notebook-outline' size={23} color='#38C6C6'></MaterialCommunityIcons>
            </BaseButton>
            <BaseButton style={{ padding: 5 }}
                onPress={() => { navigation.navigate('search') }}>
                <Ionicons name='ios-search' size={23} color='#38C6C6'></Ionicons>
            </BaseButton>
            <View style={{ backgroundColor: '#FFF', borderRadius: 50, marginTop: - 20, padding: 3 }}>
                <BaseButton>
                    <View style={{ backgroundColor: '#38C6C6', borderRadius: 50, padding: 10 }}>
                        <FontAwesome name='comments' size={23} color='#FFF'></FontAwesome>
                    </View>
                </BaseButton>
            </View>
            {/* <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('forum') }}>
            <FontAwesome name='comments-o' size={23} color='#38C6C6'></FontAwesome>
        </BaseButton> */}
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
        backgroundColor: "#FFF"
    }
})
export default Forum