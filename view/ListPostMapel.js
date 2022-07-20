import { Text, View, StyleSheet, StatusBar, Image, AsyncStorage, Alert, Pressable } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import Constant from '../Componen/Constant'
import Feather from 'react-native-vector-icons/Feather'


export class ListPostMapel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            listPost: [],
            listLike: [],
            mapel: ''
        }
    }

    UNSAFE_componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        let user = Account.data.username
        this.setState({ user: Account.data.username })
        console.log('nama user', user)

        const mapel = this.props.route.params
        // return console.log (mapel)
        this.setState({ mapel: mapel })

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/post/readmapel/' + mapel
        }).then((back) => {
            console.log('mapelllll', back.data)
            this.setState({ listPost: back.data.data })
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
            } else {
                Alert.alert("Gagal", back.data.message)
            }
        }).catch((error) => {
            console.log(error)
        })
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
                        onPress: this.props.navigation.navigate('listpostmapel')
                    }
                ])

            } else {
                Alert.alert("Gagal", 'Postingan gagal terhapus')
            }
        }).catch((error) => {
            console.log(error)
        })

        const { mapel } = this.state
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/post/readmapel/' + mapel
        }).then((back) => {
            console.log('mapelllll', back.data)
            this.setState({ listPost: back.data.data })
        }).catch((error) => {
            console.log("error", error)
        })
    }

    render() {
        const { mapel } = this.state
        console.log('mapelHeader', mapel)
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <Header navigation={this.props.navigation} mapelHeader={mapel}></Header>
                <ScrollView>
                    {this.state.listPost.map((item, index) => {
                        console.log('yyy', item, index)
                        if (item.type_file == 'Image') {
                            return <PostImage navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} DeletePost={(data) => { this.DeletePost(data) }} user={this.state.user}></PostImage>
                        } else {
                            return <PostPdf navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} DeletePost={(data) => { this.DeletePost(data) }} user={this.state.user} ></PostPdf>
                        }

                    })}


                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation, mapelHeader }) => (
    <View style={{ paddingHorizontal: 30, paddingTop: 25, paddingBottom: 15, alignItems: 'center', backgroundColor: '#38C6C6' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <BaseButton style={{ padding: 5 }}
                onPress={() => { navigation.navigate('home') }}>
                <Octicons name='chevron-left' size={25} color='#FFF' ></Octicons>
            </BaseButton>
            <View style={{ alignItems: 'center', flex: 1, marginStart: -15 }}>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 18, color: '#FFF', justifyContent: 'center' }}>{mapelHeader}</Text>
            </View>
        </View>
    </View>
)

const PostPdf = ({ navigation, data, PostLike, user, DeletePost }) => (
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

const PostImage = ({ navigation, data, PostLike, user, DeletePost }) => (
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
        <BaseButton style={{ paddingVertical: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Entypo name="home" size={23} color='#A3A3A3'></Entypo>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Home</Text>
            </View>
        </BaseButton>
        <BaseButton style={{ paddingVertical: 5 }}
            onPress={() => { navigation.navigate('notes') }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/icons/icons-note-off.png')} style={{ tintColor: '#A3A3A3', height: 25, width: 25 }}></Image>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Notes</Text>
            </View>
        </BaseButton>
        <BaseButton style={{ paddingVertical: 5 }}
            onPress={() => { navigation.navigate('profile') }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="happy-outline" size={23} color='#A3A3A3'></Ionicons>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#A3A3A3' }}>Profile</Text>
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

export default ListPostMapel