import { Text, View, StatusBar, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class EditNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            judul:'',
            sub_judul:'',
            notes:'',
            user: ''
        }
    }

    SetJudul = (text) => {
        this.setState({judul: text})
    }
    SetSubJudul = (text) => {
        this.setState({sub_judul: text})
    }
    SetNotes = (text) => {
        this.setState({notes: text})
    }

    render() {
        const hasilKirim = this.props.route.params.dataKirim
        console.log('hasilKirim', hasilKirim)
       
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <FormEditNotes hasilKirim={hasilKirim}></FormEditNotes>
                {/* <FormEditNotes hasilKirim={hasilKirim} judul={this.state.judul} sub_judul={this.state.sub_judul} notes={this.state.notes} 
                SetJudul={(text) => { this.SetJudul(text) }} SetSubJudul={(text)=>{this.SetSubJudul(text)}} SetNotes={(text)=>{this.SetNotes(text)}}
                ></FormEditNotes> */}
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('notes') }}>
            <Octicons name='chevron-left' size={25} color='black'></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Edit Notes</Text>
        <BaseButton>
            <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
        </BaseButton>
    </View>
)

const FormEditNotes = ({hasilKirim, SetJudul,SetSubJudul,SetNotes, judul, sub_judul, notes}) => (
    <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Judul</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}>{hasilKirim.judul_notes}</TextInput>
            {/* <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
            placeholder='What do you think?'
            value={judul}
            onChangeText={(text) => { SetJudul(text) }}>
            {hasilKirim.judul_notes}
            </TextInput> */}
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Sub Judul</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}>{hasilKirim.sub_judul_notes}</TextInput>
            {/* <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
            placeholder='What do you think?'
            value={sub_judul}
            onChangeText={(text) => { SetSubJudul(text) }}>
                {hasilKirim.sub_judul_notes}
            </TextInput> */}
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Notes</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}>{hasilKirim.notes}</TextInput>
            {/* <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }} multiline={true}
            placeholder='What do you think?'
            value={notes}
            onChangeText={(text) => { SetNotes(text) }}>
                {hasilKirim.notes}
            </TextInput> */}
        </View>
    </View>
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default EditNotes