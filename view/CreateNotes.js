import { Text, View, StatusBar, StyleSheet, TextInput, AsyncStorage, Alert, Image } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'




export class CreateNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            judul: '',
            sub_judul: '',
            notes: '',
            user: ''
        }
    }

    componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        let Account = JSON.parse(value)
        console.log(Account.data.fullname)
        this.setState({ user: Account.data.fullname })
    }

    PostNotes = () => {
        const { judul, sub_judul, notes, user } = this.state
        console.log('inputan notes', judul, sub_judul, notes, user)

        let postData =
        {
            "user_notes": user,
            "judul_notes": judul,
            "sub_judul_notes": sub_judul,
            "notes": notes,
        }

        console.log(Constant.api_url + 'api/notes/create')
        console.log('postData', postData)

        axios({
            method: 'POST',
            url: Constant.api_url + 'api/notes/create',
            data: postData
        }).then((back) => {
            console.log(JSON.stringify(back))
            console.log(back.data)
            if (back.status === 200 && back.data.message === "success") {
                console.log("hello")
                Alert.alert("Successfully", 'The note was successfully kept.', [
                    {
                        text: "Oke",
                        style: 'default',
                        onPress: this.props.navigation.navigate('notes')
                    }
                ])

            } else {
                Alert.alert("Failed", 'Note failed saved.')
            }
        })
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


    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation} PostNotes={() => { this.PostNotes() }}></Header>
                <ScrollView style={{marginBottom: 20}}>
                    <FormNotes judul={this.state.judul} sub_judul={this.state.sub_judul} notes={this.state.notes} SetJudul={(text) => { this.SetJudul(text) }}
                        SetSubJudul={(text) => { this.SetSubJudul(text) }} SetNotes={(text) => { this.SetNotes(text) }} ></FormNotes>
                </ScrollView>
            </View>
        )
    }
}

const Header = ({ navigation, PostNotes }) => (
    <View style={{ backgroundColor:'#FFF', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 25, alignItems: 'center' }}>
        <BaseButton style={{ padding: 5 }}
            onPress={() => { navigation.navigate('notes') }}>
            <Octicons name='chevron-left' size={25} color='black'></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: 'black' }}>Create Notes</Text>
        <BaseButton
            onPress={() => { PostNotes() }}>
            <MaterialCommunityIcons name='send-circle' size={25} color='#38C6C6' style={{ rotation: -26.15 }}></MaterialCommunityIcons>
        </BaseButton>
    </View>
)

const FormNotes = ({ SetJudul, SetSubJudul, SetNotes, judul, sub_judul, notes }) => (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal: 30, marginTop: 20 }}>
        <View style={{ alignItems:'center', justifyContent:'center'}}>
            <Image source={require('../assets/images/note.png')}></Image>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Tittle</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
                placeholder='What do you think?'
                value={judul}
                onChangeText={(text) => { SetJudul(text) }}></TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Subtitles</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }}
                placeholder='What do you think?'
                value={sub_judul}
                onChangeText={(text) => { SetSubJudul(text) }}></TextInput>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 30, marginHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 1.2 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000' }}>Note</Text>
            <TextInput style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#000', marginEnd: 10 }} multiline={true}
                placeholder='What do you think?'
                value={notes}
                onChangeText={(text) => { SetNotes(text) }}></TextInput>
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