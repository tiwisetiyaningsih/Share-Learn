import { Text, View, StyleSheet, Image, TextInput, StatusBar } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export class EditPost extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}> </Header>
                <FormEditPost navigation={this.props.navigation}></FormEditPost>
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
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Edit Post</Text>
        <BaseButton style={{ padding: 5 }}>
            <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
        </BaseButton>
    </View>
)

const FormEditPost = ({ navigation }) => (
    <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        <BaseButton style={{ marginEnd: 200 }}
            onPress={() => { navigation.navigate('profile') }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/logo/user_profile.png')}></Image>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#000', paddingHorizontal: 10 }}>Username</Text>
            </View>
        </BaseButton>
        <View style={{ flexDirection: 'row', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingVertical: 15 }}>
            <BaseButton>
                <MaterialIcons name='category' size={20} color='#000'></MaterialIcons>
            </BaseButton>
            <View style={{ backgroundColor: '#38C6C6', marginLeft: 10, borderRadius: 5, minWidth: 80, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#FFF' }}>Matematika</Text>
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
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2, paddingVertical: 15 }}>
            <BaseButton style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name='file-plus-outline' size={20} color='#000'></MaterialCommunityIcons>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000', paddingHorizontal: 10, minHeight: 50 }}>Input materi</Text>
            </BaseButton>
            <BaseButton>
                <Image source={require('../assets/images/image-post.png')}></Image>
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

export default EditPost