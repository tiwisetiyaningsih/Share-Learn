import { Text, View, Image, StyleSheet, StatusBar, ScrollView, Modal, Pressable } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from "react-native-gesture-handler";
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
        }
    }

    OpenModal = () => {
        this.setState({ openModal: true })
    }

    CloseModal = () => {
        this.setState({ openModal: false })
    }

    render() {
        return (
            <View style={style.home}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    <PostRecommentPdf navigation={this.props.navigation} OpenModal={this.OpenModal}></PostRecommentPdf>
                    <PostRecommentImage navigation={this.props.navigation} OpenModal={this.OpenModal}></PostRecommentImage>
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
                <Modal visible={this.state.openModal} transparent>
                    <View style={{
                        flex: 1, paddingHorizontal: 30, alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,.2)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 5, minWidth: 150, elevation: 2, borderRadius: 10 }}>
                            <Pressable style={{ paddingVertical: 5, justifyContent: 'flex-end', alignItems: 'flex-end', borderBottomColor:'#AAA', borderBottomWidth:.5 }} android_ripple={{ color: '#FFDDDD' }}
                                onPress={() => { this.CloseModal() }}>
                                <Ionicons name='ios-close' size={15} color='#000'style={{paddingHorizontal: 8}}></Ionicons>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center', marginTop: 5}} android_ripple={{ color: '#FFDDDD' }}
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
    <View style={{ backgroundColor: '#FFF' }}>
        <View style={{ backgroundColor: '#FFF', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 30, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BaseButton
                    onPress={() => { navigation.navigate('profile') }}>
                    <Image source={require('../assets/logo/user_profile.png')}></Image>
                </BaseButton>
                <View style={{ flexDirection: 'row', paddingStart: 10 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Hallo,</Text>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#38C6C6', paddingStart: 2 }}>Username</Text>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#FF8C00' }}>!</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BaseButton style={{ paddingHorizontal: 5 }}
                    onPress={() => { navigation.navigate('createpost') }}>
                    <Feather name='plus-square' size={20} color='black'></Feather>
                </BaseButton>
                <BaseButton style={{ paddingHorizontal: 5 }}
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
                onPress={() => { navigation.navigate('listpostmapel') }}>
                <Image source={require('../assets/logo/mapel_mat.png')}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
            onPress={() => { navigation.navigate('listpostmapel') }}>
                <Image source={require('../assets/logo/mapel_kim.png')}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
            onPress={() => { navigation.navigate('listpostmapel') }}>
                <Image source={require('../assets/logo/mapel_fis.png')}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8 }}
            onPress={() => { navigation.navigate('listpostmapel') }}>
                <Image source={require('../assets/logo/mapel_indo.png')}></Image>
            </BaseButton>
            <BaseButton style={{ marginLeft: 8, marginRight: 20 }} 
            onPress={() => { navigation.navigate('listpostmapel') }}>
                <Image source={require('../assets/logo/mapel_inggris.png')}></Image>
            </BaseButton>
        </ScrollView>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 18, color: 'black', paddingVertical: 20, paddingHorizontal: 20 }}>Recommended</Text>
    </View>
)

const PostRecommentPdf = ({ navigation, OpenModal }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 20, marginBottom: 4, elevation: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <BaseButton
                    onPress={() => { navigation.navigate('profile') }}>
                    <Image source={require('../assets/logo/user_profile.png')}></Image>
                </BaseButton>
                <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Username</Text>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black' }}>25 April 2022, 10.05</Text>
                </View>
            </View>
            <Pressable android_ripple={{ color: '#FFDDDD' }}
                onPress={() => { OpenModal() }}>
                <Entypo name='dots-three-vertical' size={15} color='black'></Entypo>
            </Pressable>
        </View>
        <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: 'black', paddingVertical: 10 }}>Materi  Kelas XI  - Peluang Kejadian  Part 2</Text>
        <View style={{ backgroundColor: '#FFF', paddingTop: 20, borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5, borderTopColor: '#DADADA', borderTopWidth: .5 }}>
            <View style={{ backgroundColor: '#C00000', borderBottomColor: '#7F7F7F', borderBottomWidth: 5, borderTopColor: '#7F7F7F', borderTopWidth: 5, paddingVertical: 20, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Itim-Regular', fontSize: 20, color: '#FFF' }}>Peluang Kejadian</Text>
            </View>
            <View style={{ backgroundColor: '#FFF', alignItems: 'center', borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5 }}>
                <Text style={{ fontFamily: 'Inder-Regular', fontSize: 12, color: 'black', paddingTop: 20, paddingBottom: 10 }}>Materi  Kelas XI  - Peluang Kejadian  Part 2</Text>
            </View>
            <Image source={require('../assets/images/pdf.png')} style={{ width: 371.5, height: 42.5 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton style={{ padding: 5 }}>
                        <AntDesign name='staro' size={20} color='black'></AntDesign>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>1</Text>
                </View>
                <View style={{ paddingStart: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton style={{ padding: 5 }}
                        onPress={() => { navigation.navigate('comment') }}>
                        <Ionicons name='chatbubble-ellipses-outline' size={20} color='black'></Ionicons>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>1</Text>
                </View>
            </View>
            <BaseButton style={{ padding: 5 }}>
                <Octicons name='download' size={20} color='black'></Octicons>
            </BaseButton>
        </View>
    </View>
)

const PostRecommentImage = ({ navigation, OpenModal }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 20, marginBottom: 4, elevation: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <BaseButton
                    onPress={() => { navigation.navigate('profile') }}>
                    <Image source={require('../assets/logo/user_profile.png')}></Image>
                </BaseButton>
                <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Username</Text>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black' }}>25 April 2022, 10.05</Text>
                </View>
            </View>
            <Pressable android_ripple={{ color: '#FFDDDD' }}
                onPress={() => { OpenModal() }}>
                <Entypo name='dots-three-vertical' size={15} color='black'></Entypo>
            </Pressable>
        </View>
        <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: 'black', paddingVertical: 10 }}>Materi  Kelas 11  - Rumus Peluang Kejadian</Text>
        <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/images/image-post.png')} style={{ width: 370, height: 200 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton style={{ padding: 5 }}>
                        <AntDesign name='staro' size={20} color='black'></AntDesign>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>1</Text>
                </View>
                <View style={{ paddingStart: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton style={{ padding: 5 }}
                        onPress={() => { navigation.navigate('comment') }}>
                        <Ionicons name='chatbubble-ellipses-outline' size={20} color='black'></Ionicons>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black' }}>1</Text>
                </View>
            </View>
            <BaseButton style={{ padding: 5 }}>
                <Octicons name='download' size={20} color='black'></Octicons>
            </BaseButton>
        </View>
    </View>
)

const Fouter = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50, paddingVertical: 5 }}>
        <BaseButton style={{ paddingVertical: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Entypo name="home" size={23} color='#38C6C6'></Entypo>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#38C6C6' }}>Home</Text>
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
    home: {
        flex: 1,
        backgroundColor: "fff"
    }
})

export default Home