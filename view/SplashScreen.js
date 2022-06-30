import { View, Image, StyleSheet, StatusBar } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'

export class SplashScreen extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#FFF'} barStyle='dark-content'></StatusBar>
                <SS navigation={this.props.navigation}></SS>
            </View>
        )
    }
}

const SS = ({navigation}) => (
    <View>
        <Image source={require('../assets/logo/orange.png')} ></Image>
        <BaseButton style={{ alignItems: 'center', paddingTop: 70, paddingBottom: 80 }}
            onPress={() => { navigation.navigate('pengenalanapp1') }}>
            <Image source={require('../assets/logo/logo_share_learn.png')} ></Image>
        </BaseButton>
        <Image source={require('../assets/logo/blue.png')} ></Image>
    </View>
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingVertical: 50
    }
})

export default SplashScreen