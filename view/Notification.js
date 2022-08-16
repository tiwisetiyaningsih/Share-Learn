import { Text, View, ScrollView, StatusBar, Image, StyleSheet, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'


export class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listNotif: [],
            user: '',
            id_to_user: '',
            listNotifold: []
        }
    }

    UNSAFE_componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        let user = Account.data.fullname
        let id_user = Account.data.id_users
        this.setState({ user: Account.data.fullname, id_to_user: id_user })
        console.log('id_user', id_user)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/notif/read/' + id_user
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            let listNotif = back.data.data.reverse()
            this.setState({ listNotif: back.data.data.reverse() })
            console.log('listNotif', listNotif)
        }).catch((error) => {
            console.log("error", error)
        })
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/notif/readAll/' + id_user
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            let listNotifold = back.data.data.reverse()
            this.setState({ listNotifold: back.data.data.reverse() })
            console.log('listNotifold', listNotifold)
        }).catch((error) => {
            console.log("error", error)
        })
    }

    componentDidMount = async () => {
        this.props.navigation.addListener('focus', async () => {
            const value = await AsyncStorage.getItem('users');
            let Account = JSON.parse(value)
            let user = Account.data.fullname
            let id_user = Account.data.id_users
            this.setState({ user: Account.data.fullname, id_to_user: id_user })
            console.log('nama user', user)
            axios({
                method: 'GET',
                url: Constant.api_url + 'api/notif/read/' + id_user
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                let listNotif = back.data.data.reverse()
                this.setState({ listNotif: back.data.data.reverse() })
                console.log('listNotif', listNotif)
            }).catch((error) => {
                console.log("error", error)
            })

            axios({
                method: 'GET',
                url: Constant.api_url + 'api/notif/readAll/' + id_user
            }).then((back) => {
                console.log(JSON.stringify(back.data, null, 2))
                let listNotifold = back.data.data.reverse()
                this.setState({ listNotifold: back.data.data.reverse() })
                console.log('listNotifold', listNotifold)
            }).catch((error) => {
                console.log("error", error)
            })
        })
    }

    DeleteNotif = (id_notif) => {
        console.log(id_notif)
        console.log(Constant.api_url + 'api/notif/delete/' + id_notif)

        axios({
            method: 'GET',
            url: Constant.api_url + 'api/notif/delete/' + id_notif
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            if (back.data.massage === 'success') {
                console.log("hello")
                Alert.alert("Successfully", 'Notification has been successfully deleted.', [
                    {
                        text: "oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('notification')
                    }
                ])

            } else {
                Alert.alert("Gagal", 'Note gagal terhapus')
            }
        }).catch((error) => {
            console.log(error)
        })

        const { id_to_user } = this.state
        console.log(id_to_user)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/notif/read/' + id_to_user
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            let listNotif = back.data.data.reverse()
            this.setState({ listNotif: back.data.data.reverse() })
            console.log('listNotif', listNotif)
        }).catch((error) => {
            console.log("error", error)
        })
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/notif/readAll/' + id_to_user
        }).then((back) => {
            console.log(JSON.stringify(back.data, null, 2))
            let listNotifold = back.data.data.reverse()
            this.setState({ listNotifold: back.data.data.reverse() })
            console.log('listNotifold', listNotifold)
        }).catch((error) => {
            console.log("error", error)
        })
    }

    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView style={{ paddingBottom: 20 }}>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: '#000', paddingHorizontal: 20, marginVertical: 10 }}>Recently</Text>
                    {this.state.listNotif.map((item, index) => {
                        console.log('notif', item, index)
                        return <ListnNotifNew key={index} data={item} DeleteNotif={(data) => { this.DeleteNotif(data) }} navigation={this.props.navigation}></ListnNotifNew>
                    })}
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: '#000', paddingHorizontal: 20, marginTop: 20, marginBottom: 10 }}>Earlier</Text>
                    {this.state.listNotifold.map((item, index) => {
                        console.log('notif', item, index)
                        return <ListnNotifOld key={index} data={item} DeleteNotif={(data) => { this.DeleteNotif(data) }} navigation={this.props.navigation}></ListnNotifOld>
                    })}
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', paddingHorizontal: 25, paddingTop: 25, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF' }}>
        <BaseButton style={{ padding: 5, justifyContent: 'flex-start' }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
        </BaseButton>
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', justifyContent: 'center', marginLeft: -10 }}>Notification</Text>
        </View>
    </View>
)

const ListnNotifNew = ({ data, DeleteNotif, navigation }) => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#FFF' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <BaseButton style={{ flexDirection: 'row', width: 340 }}
                onPress={() => {
                    let kirim = {
                        data
                    }
                    {
                        data.id_post !== 0
                        ?
                        navigation.navigate('detailnotif', kirim)
                        :null
                    }
                    {
                        data.id_post_forum !== 0
                        ?
                        navigation.navigate('detailnotifForum', kirim)
                        :null
                    }
                    {
                        data.id_comment !== 0
                        ?
                        navigation.navigate('reply', kirim)
                        :null
                    }
                }}>
                <Image source={require('../assets/logo/user_profile.png')}></Image>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', width: 280 }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#000', paddingLeft: 10 }}>{data.user_notif}</Text>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{data.notif}</Text>
                    </View>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 10, color: '#000', paddingLeft: 10 }}>{data.created_at}</Text>
                </View>
            </BaseButton>
            <BaseButton style={{ marginBottom: 10 }}
                onPress={() => {
                    Alert.alert('Delete', 'Are you sure?',
                        [
                            {
                                text: 'Yes, delete',
                                style: 'default',
                                onPress: () => { DeleteNotif(data.id_notif) }
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel'
                            }
                        ])
                }}>
                <View style={{ padding: 5 }}>
                    <Ionicons name='close' size={15} color='#000'></Ionicons>
                </View>
            </BaseButton>
        </View>
    </View>
)

const ListnNotifOld = ({ data, DeleteNotif, navigation }) => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#FFF' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <BaseButton style={{ flexDirection: 'row', width: 340 }}
                onPress={() => {
                    let kirim = {
                        data
                    }
                    {
                        data.id_post_forum === 0
                        ?
                        navigation.navigate('detailnotif', kirim)
                        :
                        navigation.navigate('detailnotifForum', kirim)
                    }
                }}>
                <Image source={require('../assets/logo/user_profile.png')}></Image>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#000', paddingLeft: 10 }}>{data.user_notif}</Text>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{data.notif}</Text>
                    </View>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 10, color: '#000', paddingLeft: 10 }}>{data.created_at}</Text>
                </View>
            </BaseButton>
            <BaseButton style={{ marginBottom: 10 }}
                onPress={() => {
                    Alert.alert('Delete', 'Are you sure?',
                        [
                            {
                                text: 'Yes, delete',
                                style: 'default',
                                onPress: () => { DeleteNotif(data.id_notif) }
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel'
                            }
                        ])
                }}>
                <View style={{ padding: 5 }}>
                    <Ionicons name='close' size={15} color='#000'></Ionicons>
                </View>
            </BaseButton>
        </View>
    </View>
)

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
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default Notification