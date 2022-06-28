import { Text, View, Image,StyleSheet, StatusBar } from 'react-native'
import React, { Component } from 'react'

export class SplashScreen extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <Image source={require('../assets/logo/orange.png')} ></Image>
                <View style={{alignItems:'center', paddingTop: 70, paddingBottom: 80}}>
                    <Image source={require('../assets/logo/logo_share_learn.png')} ></Image>
                </View>
                <Image source={require('../assets/logo/blue.png')} ></Image>
            </View>
        )
    }
}

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingVertical: 50
    }
})

export default SplashScreen