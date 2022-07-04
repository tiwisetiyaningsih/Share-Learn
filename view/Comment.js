import { Text, View, StatusBar, StyleSheet, Image, ScrollView, TextInput, Modal, Pressable } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


export class Comment extends Component {
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
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    {/* <PostRecommentPdf></PostRecommentPdf> */}
                    <ListComment OpenModal={this.OpenModal}></ListComment>
                    <ListComment OpenModal={this.OpenModal}></ListComment>
                </ScrollView>
                <Fouter></Fouter>
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
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 15, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF', marginBottom: 15, elevation: 8 }}>
        <BaseButton style={{ padding: 5, marginLeft: -140 }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', justifyContent: 'center', marginLeft: -10 }}>Comment</Text>
    </View>
)

// const PostRecommentPdf = ({ navigation }) => (
//     <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 20 }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View style={{ flexDirection: 'row', alignContent: 'center' }}>
//                 <BaseButton
//                     onPress={() => { navigation.navigate('profile') }}>
//                     <Image source={require('../assets/logo/user_profile.png')}></Image>
//                 </BaseButton>
//                 <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
//                     <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black' }}>Username</Text>
//                     <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black' }}>25 April 2022, 10.05</Text>
//                 </View>
//             </View>
//             <Entypo name='dots-three-vertical' size={15} color='black'></Entypo>
//         </View>
//         <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: 'black', paddingVertical: 10 }}>Materi  Kelas XI  - Peluang Kejadian  Part 2</Text>
//         <View style={{ backgroundColor: '#FFF', paddingTop: 20, borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5, borderTopColor: '#DADADA', borderTopWidth: .5 }}>
//             <View style={{ backgroundColor: '#C00000', borderBottomColor: '#7F7F7F', borderBottomWidth: 5, borderTopColor: '#7F7F7F', borderTopWidth: 5, paddingVertical: 20, alignItems: 'center' }}>
//                 <Text style={{ fontFamily: 'Itim-Regular', fontSize: 20, color: '#FFF' }}>Peluang Kejadian</Text>
//             </View>
//             <View style={{ backgroundColor: '#FFF', alignItems: 'center', borderLeftColor: '#DADADA', borderLeftWidth: .5, borderRightColor: '#DADADA', borderRightWidth: .5 }}>
//                 <Text style={{ fontFamily: 'Inder-Regular', fontSize: 12, color: 'black', paddingTop: 20, paddingBottom: 10 }}>Materi  Kelas XI  - Peluang Kejadian  Part 2</Text>
//             </View>
//             <Image source={require('../assets/images/pdf.png')} style={{ width: 371.5, height: 42.5 }}></Image>
//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 10 }}>
//             <BaseButton style={{ padding: 5 }}>
//                 <Octicons name='download' size={20} color='black'></Octicons>
//             </BaseButton>
//         </View>
//     </View>
// )

const ListComment = ({ OpenModal }) => (
    <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: '#FFF' }}>
        <BaseButton
            onPress={() => { navigation.navigate('profile') }}>
            <Image source={require('../assets/logo/user_profile.png')} ></Image>
        </BaseButton>
        <View style={{ backgroundColor: '#ECECEC', paddingHorizontal: 15, paddingTop: 5, margin: 10, marginEnd: 20, elevation: 3, flexDirection: 'column', justifyContent: 'space-between', borderBottomEndRadius: 10, borderBottomStartRadius: 10, borderTopEndRadius: 10, borderColor: '#ECECEC', borderWidth: 1, elevation: 2, width: 310 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: 'black' }}>Username,</Text>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: 'black', paddingVertical: 5, paddingStart: 2 }}>thanks....</Text>
                </View>
                <Pressable android_ripple={{ color: '#FFDDDD' }}
                    onPress={() => { OpenModal() }}>
                    <Feather name='more-horizontal' size={15} color='#000'></Feather>
                </Pressable>
            </View>
            <View style={{ alignItems: 'flex-start', paddingBottom: 5 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black' }}>10.05</Text>
            </View>
        </View>
    </View>

)

const Fouter = () => (
    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
        <BaseButton style={{ backgroundColor: '#EEE', paddingHorizontal: 10, borderRadius: 50, marginVertical: 8, flex: 1, padding: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextInput style={{ backgroundColor: '#EEE', paddingHorizontal: 10, borderRadius: 50, flex: 1, padding: 3, fontFamily: 'Inter-Regular', fontSize: 12 }}
                    placeholder='Comment'
                >
                </TextInput>
                <BaseButton style={{ paddingHorizontal: 5 }}
                    onPress={() => { }}>
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