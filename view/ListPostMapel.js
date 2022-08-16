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


export class ListPostMapel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            listPost: [],
            listLike: [],
            mapel: '',
            listLikeOn: [],
            searchText: ''
        }
    }

    UNSAFE_componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        let user = Account.data.fullname
        this.setState({ user: Account.data.fullname })
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
                        onPress: this.props.navigation.navigate('listpostmapel')
                    }
                ])

            } else {
                Alert.alert("Failed", 'The posts failed to deleted.')
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

    FilterMapel = () => {
        const { mapel } = this.state
        let filterPostingan = this.state.listPost
        filterPostingan = filterPostingan.filter((mapel_post) => {
            console.log(mapel_post.mapel_post == mapel)
            return mapel_post.mapel_post == mapel
        })
        console.log(filterPostingan)
        this.setState({ listPost: filterPostingan })
    }

    search = (text) => {
        this.setState({ searchText: text })
        if (text === '') {
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
    }

    searchPost = () => {
        if (this.state.searchText === '') {
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
        } else {
            axios({
                method: 'GET',
                url: Constant.api_url + 'api/post/seacrhPost/' + this.state.searchText
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                let hasilSearch = back.data.data.reverse()
                console.log(hasilSearch)
                this.setState({ listPost: hasilSearch })
                //untuk filter tiap lategori
                this.FilterMapel(this.state.mapel)
            })
        }
    }

    render() {
        const { mapel } = this.state
        console.log('mapelHeader', mapel)
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <Header navigation={this.props.navigation} mapelHeader={mapel} searchText={this.state.searchText} search={(text) => { this.search(text) }}
                    searchPost={() => { this.searchPost() }}></Header>
                <ScrollView>
                    {this.state.listPost.map((item, index) => {
                        console.log('yyy', item, index)
                        if (item.type_file == 'Image') {
                            return <PostImage navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} DeletePost={(data) => { this.DeletePost(data) }} user={this.state.user} listLikeOn={this.state.listLikeOn} Download={(file) => { this.Download(file) }}></PostImage>
                        } else {
                            return <PostPdf navigation={this.props.navigation} key={index} data={item} PostLike={(data) => this.PostLike(data)} DeletePost={(data) => { this.DeletePost(data) }} user={this.state.user} listLikeOn={this.state.listLikeOn} Download={(file) => { this.Download(file) }}></PostPdf>
                        }

                    })}
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation, mapelHeader, searchText, search, searchPost }) => (
    <View style={{ paddingHorizontal: 20, paddingTop: 15, paddingBottom: 15, alignItems: 'center', backgroundColor: '#38C6C6' }}>
        {/* <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='arrow-left' size={25} color='#FFF' style={{ marginBottom: 5 }}></Octicons>
        </BaseButton> */}
        <View style={{ paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
            {
                mapelHeader == 'Bahasa Indonesia'
                    ?
                    <Image source={require('../assets/logo/b-indo.png')} style={{ width: 50, height: 50 }}></Image>
                    : null
            }
            {
                mapelHeader == 'Bahasa Inggris'
                    ?
                    <Image source={require('../assets/logo/english.png')} style={{ width: 50, height: 50, rotation: 10 }}></Image>
                    : null
            }
            {
                mapelHeader == 'Biologi'
                    ?
                    <Image source={require('../assets/logo/biologi.png')} style={{ width: 50, height: 50, rotation: 10 }}></Image>
                    : null
            }
            {
                mapelHeader == 'Fisika'
                    ?
                    <Image source={require('../assets/logo/fisika.png')} style={{ width: 50, height: 50, rotation: 10 }}></Image>
                    : null
            }
            {
                mapelHeader == 'Geografi'
                    ?
                    <Image source={require('../assets/logo/geografi.png')} style={{ width: 50, height: 50, rotation: 10 }}></Image>
                    : null
            }
            {
                mapelHeader == 'Kimia'
                    ?
                    <Image source={require('../assets/logo/kimia.png')} style={{ width: 50, height: 50, rotation: 10 }}></Image>
                    : null
            }
            {
                mapelHeader == 'Matematika'
                    ?
                    <Image source={require('../assets/logo/matematika.png')} style={{ width: 50, height: 50, rotation: 10 }}></Image>
                    : null
            }
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 18, color: '#FFF', justifyContent: 'center', paddingHorizontal: 5 }}>{mapelHeader}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <View style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, marginBottom: 8, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
                    {
                        mapelHeader == 'Bahasa Indonesia'
                            ?
                            <TextInput style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 2, fontFamily: 'Inter-Regular', fontSize: 12 }}
                                placeholder='Search Bahasa Indonesia'
                                value={searchText}
                                onChangeText={(text) => { search(text) }}
                            >
                            </TextInput>
                            : null
                    }
                    {
                        mapelHeader == 'Matematika'
                            ?
                            <TextInput style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 2, fontFamily: 'Inter-Regular', fontSize: 12 }}
                                placeholder='Search Matematika'
                                value={searchText}
                                onChangeText={(text) => { search(text) }}
                            >
                            </TextInput>
                            : null
                    }
                    {
                        mapelHeader == 'Bahasa Inggris'
                            ?
                            <TextInput style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 2, fontFamily: 'Inter-Regular', fontSize: 12 }}
                                placeholder='Search Bahasa Inggris'
                                value={searchText}
                                onChangeText={(text) => { search(text) }}
                            >
                            </TextInput>
                            : null
                    }
                    {
                        mapelHeader == 'Biologi'
                            ?
                            <TextInput style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 2, fontFamily: 'Inter-Regular', fontSize: 12 }}
                                placeholder='Search Biologi'
                                value={searchText}
                                onChangeText={(text) => { search(text) }}
                            >
                            </TextInput>
                            : null
                    }
                    {
                        mapelHeader == 'Fisika'
                            ?
                            <TextInput style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 2, fontFamily: 'Inter-Regular', fontSize: 12 }}
                                placeholder='Search Fisika'
                                value={searchText}
                                onChangeText={(text) => { search(text) }}
                            >
                            </TextInput>
                            : null
                    }
                    {
                        mapelHeader == 'Kimia'
                            ?
                            <TextInput style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 2, fontFamily: 'Inter-Regular', fontSize: 12 }}
                                placeholder='Search Kimia'
                                value={searchText}
                                onChangeText={(text) => { search(text) }}
                            >
                            </TextInput>
                            : null
                    }
                    {
                        mapelHeader == 'Geografi'
                            ?
                            <TextInput style={{ backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 2, fontFamily: 'Inter-Regular', fontSize: 12 }}
                                placeholder='Search Geografi'
                                value={searchText}
                                onChangeText={(text) => { search(text) }}
                            >
                            </TextInput>
                            : null
                    }
                    <BaseButton style={{ padding: 5 }}
                        onPress={() => { searchPost() }}>
                        <Octicons name='search' size={16} color='#AAA'></Octicons>
                    </BaseButton>
                </View>
            </View>
        </View>
    </View>
)

const PostPdf = ({ navigation, data, PostLike, user, DeletePost, listLikeOn, Download }) => {
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
const Fouter = ({ navigation }) => (
    <View style={{flexDirection:'column'}}>
        <View style={{ marginTop: -60, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 10 }}>
            <BaseButton style={{ marginRight: 20, backgroundColor: '#38C6C6', borderRadius: 50, padding: 13, elevation: 10 }}
                onPress={() => {
                    navigation.navigate('createpost')
                }}>
                <MaterialCommunityIcons name='plus' size={25} color='#FFF'></MaterialCommunityIcons>
            </BaseButton>
        </View>
        <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 6, marginTop: 2, elevation: 5 }}>
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
            <BaseButton style={{ padding: 5 }}
                onPress={() => { navigation.navigate('forum') }}>
                <FontAwesome name='comments-o' size={23} color='#38C6C6'></FontAwesome>
            </BaseButton>
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

export default ListPostMapel