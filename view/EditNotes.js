import { Text, View, StatusBar, StyleSheet, TextInput, Alert, ScrollView, Image } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'

export class EditNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            judul: this.props.route.params.dataKirim.judul_notes,
            sub_judul: this.props.route.params.dataKirim.sub_judul_notes,
            notes: this.props.route.params.dataKirim.notes,
            user: this.props.route.params.dataKirim.user_notes,
            listNotes: []

        }
    }

    SetJudul = (text) => {
        this.setState({ judul: text })
    }
    SetSubJudul = (text) => {
        this.setState({ sub_judul: text })
    }
    SetNotes = (text) => {
        this.setState({ notes: text })
    }

    EditNote = (id) => {
        const { judul, sub_judul, notes, user } = this.state
        console.log(judul, sub_judul, notes, user)
        let postData =
        {
            "user_notes": user,
            "judul_notes": judul,
            "sub_judul_notes": sub_judul,
            "notes": notes
        }
        console.log(Constant.api_url + 'api/notes/updateNotes/' + id)
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/notes/updateNotes/' + id,
            data: postData
        }).then((back) => {
            console.log(back.status)
            if (back.status === 200) {
                Alert.alert("Successfully", "Note was successfully updated", [
                    {
                        text: "Oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('notes')
                    }
                ])
            }
        }).catch((error) => {
            console.log("error", JSON.stringify(error))
        })
    }

    render() {
        const hasilKirim = this.props.route.params.dataKirim
        console.log('hasilKirim', hasilKirim)

        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation} hasilKirim={hasilKirim} EditNote={(data) => { this.EditNote(data) }}></Header>
                <ScrollView style={{ marginBottom: 20 }}>
                    <FormEditNotes SetJudul={(text) => { this.SetJudul(text) }} SetSubJudul={(text) => { this.SetSubJudul(text) }} SetNotes={(text) => { this.SetNotes(text) }} judul={this.state.judul} sub_judul={this.state.sub_judul} notes={this.state.notes}></FormEditNotes>
                </ScrollView>
            </View>
        )
    }
}

const Header = ({ navigation, EditNote, hasilKirim }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('notes') }}>
            <Octicons name='chevron-left' size={25} color='black'></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Edit Notes</Text>
        <BaseButton
            onPress={() => { EditNote(hasilKirim.id_notes) }}>
            <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
        </BaseButton>
    </View>
)

const FormEditNotes = ({ SetJudul, SetSubJudul, SetNotes, judul, sub_judul, notes }) => (
    <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/note.png')}></Image>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Tittle</Text>
            {/* <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}>{hasilKirim.judul_notes}</TextInput> */}
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
                placeholder='What do you think?'
                value={judul}
                onChangeText={(text) => { SetJudul(text) }}>
            </TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Subtitles</Text>
            {/* <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}>{hasilKirim.sub_judul_notes}</TextInput> */}
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
                placeholder='What do you think?'
                value={sub_judul}
                onChangeText={(text) => { SetSubJudul(text) }}>
            </TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Note</Text>
            {/* <TextInput  multiline style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}>{hasilKirim.notes}</TextInput> */}
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }} multiline={true}
                placeholder='What do you think?'
                value={notes}
                onChangeText={(text) => { SetNotes(text) }}>
            </TextInput>
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