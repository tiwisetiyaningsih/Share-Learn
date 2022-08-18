import { Text, View, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class PengenalanApp_3 extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <ScrollView>
                    <Header navigation={this.props.navigation}></Header>
                </ScrollView>
                <Body navigation={this.props.navigation}></Body>
            </View>
        )
    }
}


const Header = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF' }}>
        <View style={{ backgroundColor: '#FFF', paddingVertical: 15, paddingHorizontal: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
            <BaseButton style={{ padding: 5 }}
                onPress={() => { navigation.navigate('pengenalanapp2') }}>
                <Octicons name='chevron-left' size={25} color='#FF8C00'></Octicons>
            </BaseButton>
            <BaseButton style={{ padding: 5 }}
                onPress={() => { navigation.navigate('login') }}>
                <Text style={{ color: '#A3A3A3', fontFamily: 'Inter-Regular', fontSize: 12 }}>Skip</Text>
            </BaseButton>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <Image source={require('../assets/logo/logo_notes.png')}></Image>
        </View >
    </View>
)

const Body = ({ navigation }) => (
    <View style={{ justifyContent: 'flex-end' }}>
        <View style={{ alignItems: 'center', backgroundColor: '#38C6C6', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderTopColor: '#AAA', borderTopWidth: 2, elevation: 5, padding: 20 }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 32, marginTop: 20 }}>Notes</Text>
            <Text style={{ color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 20, paddingTop: 40, justifyContent: 'center' }}>Used to take notes on learning</Text>
            <Text style={{ color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 20, paddingHorizontal: 50, justifyContent: 'center' }}>materials.</Text>
            <View style={{ marginTop: 50, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: -280 }}>
                <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                    onPress={() => { navigation.navigate('getstarted') }}>
                    <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'row', borderRadius: 20, alignItems: 'center', paddingHorizontal: 5, paddingVertical: 5, elevation: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 15, marginRight: 13, marginLeft: 10 }}>Next</Text>
                        <MaterialCommunityIcons name='arrow-right-circle' size={25} color='#FF8C00'></MaterialCommunityIcons>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }
})

export default PengenalanApp_3