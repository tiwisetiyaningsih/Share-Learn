import { Text, View, StatusBar, StyleSheet, Image, ScrollView, TextInput, Modal, Pressable, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'

export class Reply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listComment: [],
            user: '',
            reply: '',
            id_comment: this.props.route.params.data.id_comment,
            user_comment: this.props.route.params.data.user_comment,
            id_post: this.props.route.params.data.id_post,
            id_user: '',
            listReply: []
        }
    }


    UNSAFE_componentWillMount = async () => {

        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        console.log(Account.data.fullname)
        this.setState({ user: Account.data.fullname, id_user: Account.data.id_users })

        let id_comment = this.state.id_comment
        console.log('cek', Constant.api_url + 'api/comment/getComment/' + id_comment)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/getComment/' + id_comment
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listComment: back.data.data })
            console.log('List Comment', this.state.listComment)
        }).catch((error) => {
            console.log("error", error)
        })

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/reply/getReply/' + id_comment
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listReply: back.data.data })
            console.log('List Reply', this.state.listReply)
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
            let id_user = Account.data.id_users
            this.setState({ id_user: Account.data.id_users })
            console.log('id user', id_user)

            let id_comment = this.state.id_comment
            console.log('cek', Constant.api_url + 'api/comment/getComment/' + id_comment)
            axios({
                method: 'GET',
                url: Constant.api_url + 'api/comment/getComment/' + id_comment
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                this.setState({ listComment: back.data.data })
                console.log('List Comment', this.state.listComment)
            }).catch((error) => {
                console.log("error", error)
            })

            axios({
                method: 'GET',
                url: Constant.api_url + 'api/reply/getReply/' + id_comment
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                this.setState({ listReply: back.data.data })
                console.log('List Reply', this.state.listReply)
            }).catch((error) => {
                console.log("error", error)
            })
        })

    }

    DeleteComment = (id) => {
        console.log(id)
        console.log(Constant.api_url + 'api/comment/delete/' + id)

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/delete/' + id
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

        const { user, id_comment } = this.state
        console.log(user)
        console.log('cek', Constant.api_url + 'api/comment/getComment/' + id_comment)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/getComment/' + id_comment
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listComment: back.data.data })
            console.log('List Comment', this.state.listComment)
        }).catch((error) => {
            console.log("error", error)
        })
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/reply/getReply/' + id_comment
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listReply: back.data.data })
            console.log('List Reply', this.state.listReply)
        }).catch((error) => {
            console.log("error", error)
        })
    }

    DeleteReply = (id) => {
        console.log(id)
        console.log(Constant.api_url + 'api/reply/delete/' + id)

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/reply/delete/' + id
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

        const { user, id_comment } = this.state
        console.log(user)
        console.log('cek', Constant.api_url + 'api/comment/getComment/' + id_comment)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/reply/getReply/' + id_comment
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listReply: back.data.data })
            console.log('List Reply', this.state.listReply)
        }).catch((error) => {
            console.log("error", error)
        })

    }

    SetReply = (text) => {
        this.setState({ reply: text })
    }

    PostReply = () => {
        const { user, reply, id_comment, id_user, user_comment } = this.state
        console.log(user, reply, id_comment, id_user, user_comment)

        let postData =
        {
            "id_comment": id_comment,
            "user_comment": user_comment,
            "id_user_reply_comment": id_user,
            "user_reply_comment": user,
            "reply_comment": reply
        }
        console.log(Constant.api_url + 'api/reply/create')

        axios({
            method: 'POST',
            url: Constant.api_url + 'api/reply/create',
            data: postData
        }).then((back) => {
            console.log(JSON.stringify(back))
            console.log(back.data)
            if (back.status === 200) {
                console.log("hello")
                let Reply = this.state.listReply
                Reply = [...Reply, back.data.data]
                this.setState({ listReply: Reply, reply: '' })
            } else {
                Alert.alert("Failed", back.data.message)
            }
        }).catch((error) => {
            console.log(error)
        })
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/reply/getReply/' + id_comment
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            this.setState({ listReply: back.data.data })
            console.log('List Reply', this.state.listReply)
        }).catch((error) => {
            console.log("error", error)
        })
    }

    render() {
        const dataKirim = this.props.route.params.data
        console.log('dataKirim', dataKirim)
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation} dataKirim={dataKirim}></Header>
                <ScrollView style={{ marginBottom: 8 }}>
                    {this.state.listComment.map((item, index) => {
                        console.log(item, index)
                        return <ListComment key={index} data={item} DeleteComment={(data) => { this.DeleteComment(data) }} user={this.state.user} navigation={this.props.navigation}></ListComment>
                    })}
                    {this.state.listReply.map((item, index) => {
                        console.log(item, index)
                        return <ListReply key={index} data={item} DeleteReply={(data) => { this.DeleteReply(data) }} user={this.state.user} navigation={this.props.navigation}></ListReply>
                    })}
                </ScrollView>
                <Fouter SetReply={(text) => { this.SetReply(text) }} PostReply={() => { this.PostReply() }} reply={this.state.reply}></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation, dataKirim }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 15, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF', marginBottom: 10, elevation: 5 }}>
        {/* <BaseButton style={{ padding: 5, marginLeft: -170 }}
            onPress={() => {
                let kirim = {
                    dataKirim
                }
                navigation.navigate('comment', kirim)
            }}>
            <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
        </BaseButton> */}
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', justifyContent: 'center' }}>Reply</Text>
    </View>
)

const ListComment = ({ data, DeleteComment, user, navigation }) => (
    <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: '#FFF' }}>
        <BaseButton>
            <Image source={require('../assets/logo/user_profile.png')} ></Image>
        </BaseButton>
        <View style={{ backgroundColor: '#ECECEC', paddingHorizontal: 15, paddingTop: 5, margin: 10, marginEnd: 20, elevation: 5, flexDirection: 'column', justifyContent: 'space-between', borderBottomEndRadius: 10, borderBottomStartRadius: 10, borderTopEndRadius: 10, borderColor: '#ECECEC', borderWidth: 1, elevation: 2, width: 310 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'baseline', width: 235 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: 'black' }}>{data.user_comment},</Text>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#000', paddingStart: 2 }}>{data.comment}</Text>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 10, paddingTop: 5 }}>{data.updated_at}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
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

const ListReply = ({ data, DeleteReply, user, navigation }) => (
    <View style={{ marginLeft: 50, flexDirection: 'row', backgroundColor: '#FFF', paddingHorizontal: 20 }}>
        <BaseButton>
            <Image source={require('../assets/logo/user_profile.png')} ></Image>
        </BaseButton>
        <View style={{ backgroundColor: '#ECECEC', paddingHorizontal: 15, paddingTop: 5, margin: 10, marginEnd: 20, elevation: 5, flexDirection: 'column', justifyContent: 'space-between', borderBottomEndRadius: 10, borderBottomStartRadius: 10, borderTopEndRadius: 10, borderColor: '#ECECEC', borderWidth: 1, elevation: 2, width: 260 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'baseline', width: 190 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: 'black' }}>{data.user_reply_comment},</Text>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#000', paddingStart: 2 }}>{data.reply_comment}</Text>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black', paddingBottom: 10, paddingTop: 5 }}>{data.created_at}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    {
                        data.user_reply_comment === user
                            ?
                            <Pressable android_ripple={{ color: '#FFDDDD' }} style={{ marginBottom: 3 }}
                                onPress={() => {
                                    Alert.alert('Delete', 'Are you sure to delete?',
                                        [

                                            {
                                                text: 'Yes',
                                                style: 'default',
                                                onPress: () => { DeleteReply(data.id_reply_comment) }
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

const Fouter = ({ reply, SetReply, PostReply }) => (
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
        <BaseButton style={{ backgroundColor: '#EEE', paddingHorizontal: 10, borderRadius: 50, marginBottom: 8, flex: 1, padding: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextInput style={{ backgroundColor: '#EEE', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 3, fontFamily: 'Inter-Regular', fontSize: 12 }}
                    placeholder='Reply'
                    value={reply}
                    onChangeText={(text) => { SetReply(text) }}
                >
                </TextInput>
                <BaseButton style={{ paddingHorizontal: 5 }}
                    onPress={() => { PostReply() }}>
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


export default Reply