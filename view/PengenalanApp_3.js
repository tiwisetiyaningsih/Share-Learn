import { Text, View, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class PengenalanApp_3 extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <Body navigation={this.props.navigation}></Body>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', paddingVertical: 15, paddingHorizontal: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
        <BaseButton style={{ padding: 5}}
            onPress={() => { navigation.navigate('pengenalanapp2') }}>
            <Octicons name='chevron-left' size={25} color='#FF8C00'></Octicons>
        </BaseButton>
        <BaseButton
            onPress={() => { navigation.navigate('login') }}>
            <Text style={{ color: '#A3A3A3', fontFamily: 'Inter-Regular', fontSize: 12 }}>Skip</Text>
        </BaseButton>
    </View>
)

const Body = ({ navigation }) => (
    <View>
        <View style={{ alignItems: 'center', paddingVertical: 40, paddingBottom: 104 }}>
            <Image source={require('../assets/logo/logo_notes.png')}></Image>
        </View>
        <Image source={require('../assets/images/p-app.png')}></Image>
        <View style={{ marginTop: -300, alignItems: 'center' }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 32 }}>Notes</Text>
            <Text style={{ color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 20, paddingTop: 40, paddingHorizontal: 50, justifyContent: 'center'}}>Used to take notes on learning</Text>
            <Text style={{ color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 20, paddingHorizontal: 50, justifyContent: 'center'}}> materials.</Text>
            <View style={{ paddingTop: 80, paddingLeft: 260 }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('getstarted') }}>
                    <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'row', borderRadius: 20, alignItems: 'center', paddingHorizontal: 5, paddingVertical: 5, justifyContent: 'center', elevation: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 15, paddingHorizontal: 13, paddingStart: 20 }}>Next</Text>
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