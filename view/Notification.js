import { Text, View, ScrollView, StatusBar, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { BaseButton } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'


export class Notification extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    <ListnNotif></ListnNotif>
                    <ListnNotif></ListnNotif>
                </ScrollView>
                <Fouter navigation={this.props.navigation}></Fouter>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', paddingHorizontal: 25, paddingTop: 25, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF' }}>
        <BaseButton style={{ padding: 5, justifyContent: 'flex-start' }}
            onPress={() => { navigation.navigate('home') }}>
            <Octicons name='chevron-left' size={25} color='#000' ></Octicons>
        </BaseButton>
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#000', justifyContent: 'center', marginLeft: -10 }}>Notification</Text>
        </View>
    </View>
)

const ListnNotif = () => (
    <View style={{ padding: 20, backgroundColor: '#FFF', borderBottomColor: '#EEE', borderBottomWidth: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/logo/user_profile.png')}></Image>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#38C6C6', paddingStart: 10 }}>Usernm_1,</Text>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000', paddingHorizontal: 3 }}>Baru saja posting</Text>
                    </View>
                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 10, color: '#000', paddingStart: 10 }}>25 April 2022, 10.05</Text>
                </View>
            </View>
            <BaseButton style={{ marginBottom:10 }}>
                <View style={{padding: 5 }}>
                    <Ionicons name='close' size={15} color='#000'></Ionicons>
                </View>
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

export default Notification