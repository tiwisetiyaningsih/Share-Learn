import { Text, View, StatusBar, StyleSheet, Image, ScrollView, TextInput } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'


export class Comment extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    {/* <PostRecommentPdf></PostRecommentPdf> */}
                    <ListComment></ListComment>
                    <ListComment></ListComment>
                </ScrollView>
                <Fouter></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 15, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF', marginBottom: 15, elevation: 8}}>
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

const ListComment = () => (
    <View style={{ paddingHorizontal: 20, flexDirection: 'row', backgroundColor: '#FFF' }}>
        <BaseButton
            onPress={() => { navigation.navigate('profile') }}>
            <Image source={require('../assets/logo/user_profile.png')} ></Image>
        </BaseButton>
        <View style={{ backgroundColor: '#ECECEC', paddingHorizontal: 10, paddingTop: 10, margin: 10, marginEnd: 20, elevation: 3, flexDirection: 'row', justifyContent: 'space-between', borderBottomEndRadius: 10, borderBottomStartRadius: 10, borderTopEndRadius: 10, borderColor: '#ECECEC', borderWidth: 1, elevation: 2, width: 310 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30 }}>
                <View style={{ flexDirection: 'column', alignContent: 'center' }}>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 10, justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: 'black' }}>Username</Text>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 8, color: 'black' }}>25 April 2022, 10.05</Text>
                    </View>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: 'black', paddingVertical: 10, paddingHorizontal: 10 }}>thanks....</Text>
                </View>
            </View>
            <BaseButton style={{paddingHorizontal: 10}}>
                <Entypo name='dots-three-horizontal' size={15} color='black'></Entypo>
            </BaseButton>
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