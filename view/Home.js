import { Text, View, Image, StyleSheet, StatusBar, ScrollView, Modal, Pressable, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from "react-native-gesture-handler";
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios';



export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            user: '',
            listPost: [],
            listLike: [],
            parmsMapel: '',
            status_like: ''
        }
    }

    UNSAFE_componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        let Home = JSON.parse(value)
        let user = Home.data.username
        this.setState({ user: Home.data.username })
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

            console.log(back.data.data.id_post)
            if (back.status === 200) {
                if (back.data.massage == 'success like') {
                    let like_list = this.state.listPost
                    console.log('like_list', like_list)
                    like_list.map((item, index) => {
                        // console.log('like_list index', like_list[index]['jumlah_like']++)
                        if (item.id == id) { like_list[index]['jumlah_like']++ }
                    })
                    this.setState({ listPost: like_list, status_like: 'success like' })
                } else if (back.data.massage == 'success unlike') {
                    let like_list = this.state.listPost
                    like_list.map((item, index) => {
                        // console.log('like_list index', like_list[index]['jumlah_like']--)
                        if (item.id == id) { like_list[index]['jumlah_like']-- }
                    })
                    this.setState({ listPost: like_list, status_like: 'success unlike' })
                }
                console.log("hello")
                let like = this.state.listLike
                like = [...like, back.data.data]
                this.setState({ listLike: like })
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
                Alert.alert("Berhasil", 'Postingan berhasil terhapus', [
                    {
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('home')
                    }
                ])

            } else {
                Alert.alert("Gagal", 'Postingan gagal terhapus')
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

    render() {
        return (
            <View style={style.home}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation} user={this.state.user} Mapel={(materi) => { this.props.navigation.navigate('listpostmapel', materi) }}></Header>
                <ScrollView>
                    {this.state.listPost.map((item, index) => {
                        console.log('yyy', item, index)
                        if (item.type_file == 'Image') {
                            return <PostRecommentImage navigation={this.props.navigation} OpenModal={this.OpenModal} key={index} data={item} PostLike={(data) => this.PostLike(data)} status_like={this.state.status_like} user={this.state.user} DeletePost={(data) => { this.DeletePost(data) }}></PostRecommentImage>
                        } else {
                            return <PostRecommentPdf navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} status_like={this.state.status_like} user={this.state.user} DeletePost={(data) => { this.DeletePost(data) }}></PostRecommentPdf>
                        }
                    })}
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
                <Modal visible={this.state.openModal} transparent>
                    <View style={{
                        flex: 1, paddingHorizontal: 30, alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,.2)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 5, minWidth: 150, elevation: 2, borderRadius: 10 }}>
                            <Pressable style={{ paddingVertical: 5, justifyContent: 'flex-end', alignItems: 'flex-end', borderBottomColor: '#AAA', borderBottomWidth: .5 }} android_ripple={{ color: '#FFDDDD' }}
                                onPress={() => { this.CloseModal() }}>
                                <Ionicons name='ios-close' size={15} color='#000' style={{ paddingHorizontal: 8 }}></Ionicons>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center', marginTop: 5 }} android_ripple={{ color: '#FFDDDD' }}
                                onPress={() => {

                                    this.CloseModal(this.props.navigation.navigate('editpost'))
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: -10 }}>
                                    <FontAwesome5 name='pencil-alt' size={18} color='#FF8C00'></FontAwesome5>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black', paddingStart: 9 }}>Edit</Text>
                                </View>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                onPress={() => { this }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name='delete-forever' size={25} color='#C62828'></MaterialCommunityIcons>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black', paddingStart: 5 }}>Delete</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

const Header = ({ navigation, user, Mapel }) => (
    <View style={{ backgroundColor: '#FFF' }}>
        <View style={{ backgroundColor: '#FFF', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 30, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BaseButton
                    onPress={() => { navigation.navigate('profile') }}>
                    <Image source={require('../assets/logo/user_profile.png')} style={{ width: 42, height: 42 }}></Image>
                </BaseButton>
                <View style={{ flexDirection: 'row', paddingStart: 10 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Hallo,</Text>
                    <BaseButton
                        onPress={() => { navigation.navigate('profile') }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#38C6C6', paddingStart: 2 }}>{user}</Text>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#FF8C00' }}>!</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BaseButton style={{ padding: 5 }}
                    onPress={() => { navigation.navigate('createpost') }}>
                    <Feather name='plus-square' size={20} color='black'></Feather>
                </BaseButton>
                <BaseButton style={{ padding: 5 }}
                    onPress={() => { navigation.navigate('notification') }}>
                    <MaterialCommunityIcons name='bell-badge' size={20} color='black'></MaterialCommunityIcons>
                </BaseButton>
            </View>
        </View>
        <View style={{ paddingBottom: 10, paddingHorizontal: 20, backgroundColor: '#FFF' }}>
            <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>Let's learn!</Text>
            <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>Pilih Materi yang ingin kamu pelajari!</Text>
        </View>
        <ScrollView horizontal style={{ paddingHorizontal: 0 }} showsHorizontalScrollIndicator={false}>
            <BaseButton style={{ marginLeft: 20 }}
                onPress={() => { Mapel('Matematika') }}>
                <Image source={require('../assets/logo/mapel_mat.png')}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
                onPress={() => { Mapel('Kimia') }}>
                <Image source={require('../assets/logo/mapel_kim.png')}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
                onPress={() => { Mapel('Fisika') }}>
                <Image source={require('../assets/logo/mapel_fis.png')}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
                onPress={() => { Mapel('Bahasa Indonesia') }}>
                <Image source={require('../assets/logo/mapel_indo.png')}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8, marginRight: 20 }}
                onPress={() => { Mapel('Bahasa Inggris') }}>
                <Image source={require('../assets/logo/mapel_inggris.png')}></Image>
            </BaseButton>
        </ScrollView>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 18, color: 'black', paddingVertical: 20, paddingHorizontal: 20 }}>Recommended</Text>
    </View>
)

const PostRecommentPdf = ({ navigation, data, PostLike, status_like, user, DeletePost }) => (
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
                            Alert.alert('Modification', 'Are you sure to edit or delete?',
                                [
                                    {
                                        text: 'Yes,edit',
                                        style: 'default',
                                        onPress: () => {
                                            let kirim = {
                                                data
                                            }
                                            navigation.navigate('editpost', kirim)
                                        }
                                    },
                                    {
                                        text: 'Yes,delete',
                                        style: 'default',
                                        onPress: () => { DeletePost(data.id) }
                                    },
                                    {
                                        text: 'Cancel',
                                        style: 'cancel'
                                    }
                                ])
                            : null
                    }

                }}>
                <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
            </Pressable>
        </View>
        <View style={{ backgroundColor: '#FFF', paddingTop: 20, borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5, borderTopColor: '#DADADA', borderTopWidth: .5, marginTop: 10, marginBottom: -2 }}>
            <View style={{ backgroundColor: '#C00000', borderBottomColor: '#7F7F7F', borderBottomWidth: 5, borderTopColor: '#7F7F7F', borderTopWidth: 5, paddingVertical: 20, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Itim-Regular', fontSize: 20, color: '#FFF' }}>{data.judul_post}</Text>
            </View>
            <View style={{ backgroundColor: '#FFF', alignItems: 'center', borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5 }}>
                <Text style={{ fontFamily: 'Inder-Regular', fontSize: 12, color: 'black', paddingTop: 20, paddingBottom: 10 }}>{data.sub_judul_post}</Text>
            </View>
            <Image source={require('../assets/images/pdf.png')} style={{ width: 371.5, height: 42.5 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton style={{ padding: 5 }}
                        onPress={() => {
                            PostLike(data.id)
                        }}>
                        <AntDesign name='staro' size={23} color='#000'></AntDesign>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>{data.jumlah_like}</Text>
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
            <BaseButton style={{ padding: 5 }}>
                <Feather name='download' size={23} color='black'></Feather>
            </BaseButton>
        </View>
        <View style={{ width: 320 }}>
            <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: 'black', paddingBottom: 5 }}>{data.sub_judul_post}</Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 15 }}>{data.updated_at}</Text>
        </View>
    </View>
)

const PostRecommentImage = ({ navigation, OpenModal, data, PostLike, status_like, user, DeletePost }) => (
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
                            Alert.alert('Modification', 'Are you sure to edit or delete?',
                                [
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
                                        text:'Delete',
                                        style: 'default',
                                        onPress: () => { DeletePost(data.id) }
                                    },
                                    {
                                        text: 'Cancel',
                                        style: 'cancel'
                                    }
                                ])
                            : null
                    }

                }}>
                <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
            </Pressable>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 8 }}>
            <Image source={{ uri: Constant.api_url + data.file_post }} style={{ width: 370, height: 370, borderRadius: 5 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton style={{ padding: 5 }}
                        onPress={() => {
                            PostLike(data.id)
                        }}>
                        <AntDesign name='staro' size={23} color='#000'></AntDesign>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>{data.jumlah_like}</Text>
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
            <BaseButton style={{ padding: 5 }}>
                <Feather name='download' size={23} color='black'></Feather>
            </BaseButton>
        </View>
        <View style={{ width: 320 }}>
            <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: 'black', paddingBottom: 5 }}>{data.sub_judul_post}</Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 15 }}>{data.updated_at}</Text>
        </View>
    </View>
)

const Fouter = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50, paddingVertical: 5 }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Entypo name="home" size={23} color='#38C6C6'></Entypo>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#38C6C6' }}>Home</Text>
            </View>
        </BaseButton>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('notes') }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/icons/icons-note-off.png')} style={{ tintColor: '#A3A3A3', height: 25, width: 25 }}></Image>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Notes</Text>
            </View>
        </BaseButton>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('profile') }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="happy-outline" size={23} color='#A3A3A3'></Ionicons>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Profile</Text>
            </View>
        </BaseButton>
    </View>
)


const style = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: "fff"
    }
})

export default Home