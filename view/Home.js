import { Text, View, Image, StyleSheet, StatusBar, ScrollView, Modal, Pressable, AsyncStorage, Alert } from 'react-native'
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



export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            user: '',
            listPost: [],
            listLike: [],
            parmsMapel: '',
            status_like: '',
            listLikeOn: []
        }
    }

    UNSAFE_componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        let Home = JSON.parse(value)
        let user = Home.data.fullname
        this.setState({ user: Home.data.fullname })
        console.log('nama user', user)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/post/read'
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
    }

    componentDidMount = async () => {
        this.props.navigation.addListener('focus', async () => {
            const value = await AsyncStorage.getItem('users');
            let Home = JSON.parse(value)
            let user = Home.data.fullname
            this.setState({ user: Home.data.fullname })
            console.log('nama user', user)
            axios({
                method: 'GET',
                url: Constant.api_url + 'api/post/read'
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                let listPost = back.data.data.reverse()
                this.setState({ listPost: back.data.data.reverse() })
                console.log('listPost', listPost)
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
            "id_post_forum" : 0
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
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('home')
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
            url: Constant.api_url + 'api/post/read'
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

    render() {
        return (
            <View style={style.home}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation} user={this.state.user} Mapel={(materi) => { this.props.navigation.navigate('listpostmapel', materi) }}></Header>
                <ScrollView>
                    {this.state.listPost.map((item, index) => {
                        console.log('yyy', item, index)
                        if (item.type_file == 'Image') {
                            return <PostRecommentImage navigation={this.props.navigation} OpenModal={this.OpenModal} key={index} data={item} PostLike={(data) => this.PostLike(data)} status_like={this.state.status_like} user={this.state.user} DeletePost={(data) => { this.DeletePost(data) }} Download={(file) => this.Download(file)} listLikeOn={this.state.listLikeOn}></PostRecommentImage>
                        } else {
                            return <PostRecommentPdf navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} status_like={this.state.status_like} user={this.state.user} DeletePost={(data) => { this.DeletePost(data) }} Download={(file) => this.Download(file)} listLikeOn={this.state.listLikeOn}></PostRecommentPdf>
                        }
                    })}
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation, user, Mapel }) => (
    <View style={{ backgroundColor: '#FFF' }}>
        <View style={{ backgroundColor: '#FFF', flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, paddingBottom: 18, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BaseButton
                    onPress={() => { navigation.navigate('profile') }}>
                    <Image source={require('../assets/logo/user_profile.png')} style={{ width: 42, height: 42 }}></Image>
                </BaseButton>
                <View style={{ flexDirection: 'row', paddingStart: 10 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: 'black' }}>Hallo,</Text>
                    <BaseButton
                        onPress={() => { navigation.navigate('profile') }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#38C6C6', paddingStart: 2 }}>{user}</Text>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#FF8C00' }}>!</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <BaseButton style={{ padding: 5 }}
                    onPress={() => { navigation.navigate('createpost') }}>
                    <Feather name='plus-square' size={22} color='black'></Feather>
                </BaseButton>
                <BaseButton style={{ padding: 5 }}
                    onPress={() => { navigation.navigate('notification') }}>
                    <MaterialCommunityIcons name='bell-badge' size={22} color='black'></MaterialCommunityIcons>
                </BaseButton> */}
                <BaseButton style={{ padding: 5 }}
                    onPress={() => { navigation.navigate('notification') }}>
                    <MaterialCommunityIcons name='bell-badge' size={23} color='#000'></MaterialCommunityIcons>
                </BaseButton>
            </View>
        </View>
        <View style={{ paddingBottom: 8, paddingHorizontal: 20, backgroundColor: '#FFF' }}>
            <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>Let's learn!</Text>
            <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>Choose the lesson you want to learn!</Text>
        </View>
        <ScrollView horizontal style={{ paddingHorizontal: 0 }} showsHorizontalScrollIndicator={false}>
            <BaseButton style={{ marginLeft: 20 }}
                onPress={() => { Mapel('Bahasa Indonesia') }}>
                <Image source={require('../assets/logo/mapel_indo.png')} style={{ width: 110, height: 110 }}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
                onPress={() => { Mapel('Bahasa Inggris') }}>
                <Image source={require('../assets/logo/mapel_inggris.png')} style={{ width: 110, height: 110 }}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
                onPress={() => { Mapel('Biologi') }}>
                <Image source={require('../assets/logo/mapel_biologi.png')} style={{ width: 110, height: 110 }}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
                onPress={() => { Mapel('Fisika') }}>
                <Image source={require('../assets/logo/mapel_fis.png')} style={{ width: 110, height: 110 }}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
                onPress={() => { Mapel('Geografi') }}>
                <Image source={require('../assets/logo/mapel_geografi.png')} style={{ width: 110, height: 110 }}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
                onPress={() => { Mapel('Kimia') }}>
                <Image source={require('../assets/logo/mapel_kim.png')} style={{ width: 110, height: 110 }}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8, marginRight: 20 }}
                onPress={() => { Mapel('Matematika') }}>
                <Image source={require('../assets/logo/mapel_mat.png')} style={{ width: 110, height: 110 }}></Image>
            </BaseButton>
        </ScrollView>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 17, color: 'black', paddingVertical: 15, paddingHorizontal: 20 }}>Recommended</Text>
    </View>
)




const PostRecommentPdf = ({ navigation, data, PostLike, user, DeletePost, Download, listLikeOn }) => {
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

const PostRecommentImage = ({ navigation, data, PostLike, user, DeletePost, Download, listLikeOn }) => {
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

const Fouter = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 6, marginTop: 2, elevation: 5 }}>
        <View style={{ backgroundColor: '#FFF', borderRadius: 50, marginTop: - 20, padding: 3 }}>
            <BaseButton>
                <View style={{ backgroundColor: '#38C6C6', borderRadius: 50, padding: 10 }}>
                    <Ionicons name="home" size={23} color='#FFF'></Ionicons>
                </View>
            </BaseButton>
        </View>
        {/* <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <Ionicons name="home" size={23} color='#38C6C6'></Ionicons>
        </BaseButton> */}
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('notes') }}>
            <MaterialCommunityIcons name='notebook-outline' size={23} color='#38C6C6'></MaterialCommunityIcons>
        </BaseButton>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('search') }}>
            <Ionicons name='ios-search' size={23} color='#38C6C6'></Ionicons>
        </BaseButton>
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
    home: {
        flex: 1,
        backgroundColor: 'rgba(80,80,80,0)'
    }
})

export default Home