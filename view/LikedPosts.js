import { Text, View, StyleSheet, StatusBar, Image } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

export class LikedPosts extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    <PostPdf navigation={this.props.navigation}></PostPdf>
                    <PostImage navigation={this.props.navigation}></PostImage>
                    <PostPdf navigation={this.props.navigation}></PostPdf>
                    <PostPdf navigation={this.props.navigation}></PostPdf>
                    <PostPdf navigation={this.props.navigation}></PostPdf>
                    <PostImage navigation={this.props.navigation}></PostImage>
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 25, paddingBottom: 15, alignItems: 'center', backgroundColor: '#38C6C6' }}>
        <BaseButton style={{ padding: 5, marginLeft: -130 }}
            onPress={() => { navigation.navigate('profile') }}>
            <Octicons name='chevron-left' size={25} color='#FFF' ></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#FFF', justifyContent: 'center' }}>Liked Posts</Text>
    </View>
)

const PostPdf = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, marginBottom: 8, elevation: 3 }}>
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
            <Entypo name='dots-three-vertical' size={15} color='black'></Entypo>
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
                    <BaseButton>
                        <AntDesign name='star' size={20} color='#E49500'></AntDesign>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black', paddingLeft: 5 }}>1</Text>
                </View>
                <View style={{ paddingStart: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton>
                        <Ionicons name='chatbubble-ellipses-outline' size={20} color='black'></Ionicons>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black', paddingLeft: 5 }}>1</Text>
                </View>
            </View>
            <BaseButton>
                <Octicons name='download' size={20} color='black'></Octicons>
            </BaseButton>
        </View>
    </View>
)

const PostImage = ({ navigation }) => (
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
            <Entypo name='dots-three-vertical' size={15} color='black'></Entypo>
        </View>
        <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: 'black', paddingVertical: 10 }}>Materi  Kelas 11  - Rumus Peluang Kejadian</Text>
        <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/images/image-post.png')} style={{ width: 370, height: 200 }}></Image>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton>
                        <AntDesign name='star' size={20} color='#E49500'></AntDesign>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black', paddingLeft: 5 }}>1</Text>
                </View>
                <View style={{ paddingStart: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton>
                        <Ionicons name='chatbubble-ellipses-outline' size={20} color='black'></Ionicons>
                    </BaseButton>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 10, color: 'black', paddingLeft: 5 }}>1</Text>
                </View>
            </View>
            <BaseButton>
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

export default LikedPosts