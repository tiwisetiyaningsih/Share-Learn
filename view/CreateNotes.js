import { Text, View, StatusBar, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'




export class CreateNotes extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <FormNotes></FormNotes>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
        <BaseButton
            onPress={() => { navigation.navigate('notes') }}>
            <Octicons name='chevron-left' size={25} color='black'></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Create Notes</Text>
        <BaseButton>
            <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
        </BaseButton>
    </View>
)

const FormNotes = () => (
    <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Judul</Text>
            <TextInput placeholder='What do you think?' style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}></TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Sub Judul</Text>
            <TextInput placeholder='What do you think?' style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}></TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Notes</Text>
            <TextInput placeholder='What do you think?' style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }} multiline={true}></TextInput>
        </View>
    </View>
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default CreateNotes