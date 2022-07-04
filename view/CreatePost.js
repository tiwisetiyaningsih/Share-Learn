import { Text, View, StyleSheet, Image, TextInput, StatusBar, Modal, Pressable } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



export class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            openModal1: false
        }
    }

    OpenModal = () => {
        this.setState({ openModal: true })
    }

    CloseModal = () => {
        this.setState({ openModal: false })
    }

    OpenModal1 = () => {
        this.setState({ openModal1: true })
    }

    CloseModal1 = () => {
        this.setState({ openModal1: false })
    }

    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}> </Header>
                <FormPost navigation={this.props.navigation} OpenModal={this.OpenModal} OpenModal1={this.OpenModal1}></FormPost>
                <Modal visible={this.state.openModal1} transparent>
                    <View style={{
                        flex: 1, paddingHorizontal: 50, marginTop: -230, alignItems: 'flex-start', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,0)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 8, minWidth: 100, elevation: 2, borderRadius: 10, alignItems: 'center' }}>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1() }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Matematika</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1() }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Kimia</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1() }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Fisika</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1() }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>B.Indonesia</Text>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal1() }}>
                                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>B.Inggris</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Modal visible={this.state.openModal} transparent>
                    <View style={{
                        flex: 1, paddingHorizontal: 50, marginBottom: -220, alignItems: 'flex-start', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,0)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 5, minWidth: 100, elevation: 2, borderRadius: 10 }}>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { this.CloseModal() }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: -10 }}>
                                    <MaterialCommunityIcons name='file-image-plus' size={20} color='#0CBA1D'></MaterialCommunityIcons>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black', paddingStart: 9 }}>Image</Text>
                                </View>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasOlahraga() }}>
                                onPress={() => { this.CloseModal() }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: -25 }}>
                                    <MaterialCommunityIcons name='file-plus' size={20} color='#C62828'></MaterialCommunityIcons>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black', paddingStart: 9 }}>PDF</Text>
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
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='chevron-left' size={25} color='black'></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Create Post</Text>
        <BaseButton style={{ padding: 5 }}>
            <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
        </BaseButton>
    </View>
)

const FormPost = ({ navigation, OpenModal, OpenModal1 }) => (
    <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        <BaseButton style={{ marginEnd: 200 }}
            onPress={() => { navigation.navigate('profile') }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/logo/user_profile.png')}></Image>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#000', paddingHorizontal: 10 }}>Username</Text>
            </View>
        </BaseButton>
        <View style={{ flexDirection: 'row', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingVertical: 15 }}>
            <Pressable
                onPress={() => { OpenModal1() }}>
                <MaterialIcons name='category' size={20} color='#000'></MaterialIcons>
            </Pressable>
            <View style={{ backgroundColor: '#38C6C6', marginLeft: 10, borderRadius: 5, minWidth: 80, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#FFF' }}>Learn?</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Judul</Text>
            <TextInput placeholder='What do you think?' style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}></TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Sub Judul</Text>
            <TextInput placeholder='What do you think?' style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}></TextInput>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingVertical: 15 }}>
            <Pressable style={{ flexDirection: 'row' }}
                onPress={() => { OpenModal() }}>
                <MaterialCommunityIcons name='file-plus-outline' size={20} color='#000'></MaterialCommunityIcons>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000', paddingHorizontal: 10, minHeight: 50 }}>Input materi</Text>
            </Pressable>
        </View>
    </View>
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default CreatePost