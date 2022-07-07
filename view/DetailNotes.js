import { Text, View, StyleSheet, StatusBar, Modal, Pressable } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


export class DetailNotes extends Component {
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
        const dataKirim = this.props.route.params.data
        console.log('hello', dataKirim)
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <Header navigation={this.props.navigation} ></Header>
                <Detail OpenModal={this.OpenModal} dataKirim={dataKirim}></Detail>
                <Modal visible={this.state.openModal} transparent>
                    <View style={{
                        flex: 1, paddingHorizontal: 30, marginTop: -425, alignItems: 'flex-end', justifyContent: 'center',
                        backgroundColor: 'rgba(80,80,80,0)'
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 5, minWidth: 100, elevation: 5, borderRadius: 10 }}>
                            <Pressable style={{ paddingVertical: 5, justifyContent: 'flex-end', alignItems: 'flex-end', borderBottomColor: '#AAA', borderBottomWidth: .5 }} android_ripple={{ color: '#FFDDDD' }}
                                onPress={() => { this.CloseModal() }}>
                                <Ionicons name='ios-close' size={15} color='#000' style={{ paddingHorizontal: 8 }}></Ionicons>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasTravel() }}>
                                onPress={() => { let kirim = {
                                    dataKirim
                                  }
                                  this.CloseModal(this.props.navigation.navigate('editnotes', kirim))}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: -10 }}>
                                    <FontAwesome5 name='pencil-alt' size={18} color='#FF8C00'></FontAwesome5>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 12, color: 'black', paddingStart: 9 }}>Edit</Text>
                                </View>
                            </Pressable>
                            <Pressable style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'center' }} android_ripple={{ color: '#FFDDDD' }}
                                // onPress={() => { this.SetComunitasOlahraga() }}>
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
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 25, paddingBottom: 15, alignItems: 'center', backgroundColor: '#38C6C6' }}>
        <BaseButton style={{ padding: 5, marginLeft: -140 }}
            onPress={() => { navigation.navigate('notes') }}>
            <Octicons name='chevron-left' size={25} color='#FFF' ></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#FFF', justifyContent: 'center', marginLeft: -20 }}>Detail Notes</Text>
    </View>
)

const Detail = ({ OpenModal, dataKirim }) => (
    <View style={{ backgroundColor: '#FFF', padding: 20 }}>
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', maxWidth: 250, }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#000' }}>{dataKirim.judul_notes}</Text>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>{dataKirim.sub_judul_notes}</Text>
                </View>
            </View>
            <Pressable 
                onPress={() => { OpenModal() }}>
                <View style={{ marginBottom: 20, padding: 5, alignItems: 'flex-end', marginTop: -40 }}>
                    <Feather name='more-horizontal' size={18} color='#000'></Feather>
                </View>
            </Pressable>
        </View>
        <View style={{alignItems: 'center'}}>
            <View style={{ paddingVertical: 30, paddingHorizontal: 10, alignItems: 'center', maxWidth: 350 }}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>
                    {dataKirim.notes}
                </Text>
            </View>
        </View>
    </View >
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default DetailNotes