import { Text, View, StatusBar, StyleSheet, Image, ScrollView, TextInput, Modal, Pressable, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'


export class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            listComment: [],
            user: '',
            comment: '',
            id_post: this.props.route.params.data.id
        }
    }

    UNSAFE_componentWillMount = async () => {
        
        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        console.log(Account.data.username)
        this.setState({ user: Account.data.username })

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


    SetComment = (text) => {
        this.setState({ comment: text })
    }

    PostComment = () => {
        const { user, comment, id_post } = this.state
        console.log(user, comment, id_post)

        let postData =
        {
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
                this.setState({ listComment: Comment , comment: ''})
                // this.setState({ comment: ''})
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


    render() {
        const dataKirim = this.props.route.params.data
        console.log('hello', dataKirim)
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView style={{marginBottom: 20}}>
                    {
                        dataKirim.type_file === 'Pdf'
                        ?
                        <PostPdf dataKirim={dataKirim}></PostPdf>
                        :null
                    }
                    {
                        dataKirim.type_file === 'Image'
                        ?
                        <PostImage dataKirim={dataKirim}></PostImage>
                        :null
                    }
                    <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', paddingBottom: 10, paddingStart: 20, marginTop: 10}}>Komentar</Text>
                    {this.state.listComment.map((item, index) => {
                        console.log(item, index)
                        return <ListComment OpenModal={this.OpenModal} key={index} data={item}></ListComment>
                    })}
                </ScrollView>
                <Fouter SetComment={(text) => { this.SetComment(text) }} PostComment={() => { this.PostComment() }} comment={this.state.comment}></Fouter>
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
                                onPress={() => { this.CloseModal(this.props.navigation.navigate('editpost')) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: -10 }}>
                                    <FontAwesome5 name='pencil-alt' size={18} color='#FF8C00'></FontAwesome5>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black', paddingStart: 9 }}>Edit</Text>
                                </View>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                onPress={() => { this.CloseModal() }}>
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

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 15, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF', marginBottom: 10, elevation: 5 }}>
        <BaseButton style={{ padding: 5, marginLeft: -140 }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', justifyContent: 'center', marginLeft: -10 }}>Comment</Text>
    </View>
)

const PostPdf = ({ navigation, OpenModal, dataKirim }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 15, marginBottom: 4, elevation: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <BaseButton
                    onPress={() => { navigation.navigate('profile') }}>
                    <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                </BaseButton>
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingHorizontal: 8 }}>{dataKirim.user_post}</Text>
            </View>
            <Pressable android_ripple={{ color: '#FFDDDD' }}>
                <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
            </Pressable>
        </View>
        <View style={{ backgroundColor: '#FFF', paddingTop: 20, borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5, borderTopColor: '#DADADA', borderTopWidth: .5, marginTop: 10,marginBottom:-2 }}>
            <View style={{ backgroundColor: '#C00000', borderBottomColor: '#7F7F7F', borderBottomWidth: 5, borderTopColor: '#7F7F7F', borderTopWidth: 5, paddingVertical: 20, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Itim-Regular', fontSize: 20, color: '#FFF' }}>{dataKirim.judul_post}</Text>
            </View>
            <View style={{ backgroundColor: '#FFF', alignItems: 'center', borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5 }}>
                <Text style={{ fontFamily: 'Inder-Regular', fontSize: 12, color: 'black', paddingTop: 20, paddingBottom: 10 }}>{dataKirim.sub_judul_post}</Text>
            </View>
            <Image source={require('../assets/images/pdf.png')} style={{ width: 371.5, height: 42.5 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton
                        onPress={() => {
                            PostLike(data.id)
                        }}>
                        <AntDesign name='staro' size={23} color='#000'></AntDesign>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black'}}>{dataKirim.jumlah_like}</Text>
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
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>{dataKirim.jumlah_comment}</Text>
                </View>
            </View>
            <BaseButton>
                <Feather name='download' size={23} color='black'></Feather>
            </BaseButton>
        </View>
        <View style={{ width: 320 }}>
            <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: 'black', paddingBottom: 5 }}>{data.sub_judul_post}</Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 15 }}>{data.updated_at}</Text>
        </View>
    </View>
)

const PostImage = ({ navigation, OpenModal, dataKirim }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 15, marginBottom: 4, elevation: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <BaseButton
                    onPress={() => { navigation.navigate('profile') }}>
                    <Image source={require('../assets/logo/user_profile.png')} style={{ width: 35, height: 35 }}></Image>
                </BaseButton>
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingHorizontal: 8 }}>{dataKirim.user_post}</Text>
            </View>
            <Pressable android_ripple={{ color: '#FFDDDD' }}>
                <Entypo name='dots-three-horizontal' size={16} color='black'></Entypo>
            </Pressable>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 8 }}>
            <Image source={{ uri: Constant.api_url + dataKirim.file_post }} style={{ width: 370, height: 370, borderRadius: 5 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton
                        onPress={() => {
                            PostLike(dataKirim.id)
                        }}>
                        <AntDesign name='staro' size={23} color='#000'></AntDesign>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>{dataKirim.jumlah_like}</Text>
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
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>{dataKirim.jumlah_comment}</Text>
                </View>
            </View>
            <BaseButton>
                <Feather name='download' size={23} color='black'></Feather>
            </BaseButton>
        </View>
        <View style={{width: 320}}>
            <Text style={{ fontFamily: 'Inter-Reguler', fontSize: 12, color: 'black', paddingBottom: 5 }}>{dataKirim.sub_judul_post}</Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 25 }}>{dataKirim.updated_at}</Text>
        </View>
    </View>
)

const ListComment = ({ OpenModal, data }) => (
    <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: '#FFF'}}>
        <BaseButton
            onPress={() => { navigation.navigate('profile') }}>
            <Image source={require('../assets/logo/user_profile.png')} ></Image>
        </BaseButton>
        <View style={{ backgroundColor: '#ECECEC', paddingHorizontal: 15, paddingTop: 5, margin: 10, marginEnd: 20, elevation: 3, flexDirection: 'column', justifyContent: 'space-between', borderBottomEndRadius: 10, borderBottomStartRadius: 10, borderTopEndRadius: 10, borderColor: '#ECECEC', borderWidth: 1, elevation: 2, width: 310 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: 'black' }}>{data.user_comment},</Text>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: '#4F4F4F', paddingStart: 2 }}>{data.comment}</Text>
                </View>
                <Pressable android_ripple={{ color: '#FFDDDD' }}
                    onPress={() => { OpenModal() }}>
                    <Feather name='more-horizontal' size={15} color='#000'></Feather>
                </Pressable>
            </View>
            <View style={{ alignItems: 'flex-start', paddingBottom: 8, paddingTop: 8 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black' }}>{data.updated_at}</Text>
            </View>
        </View>
    </View>

)

const Fouter = ({ comment, SetComment, PostComment }) => (
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
        <BaseButton style={{ backgroundColor: '#EEE', paddingHorizontal: 10, borderRadius: 50, marginVertical: 8, flex: 1, padding: 3 }}>
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