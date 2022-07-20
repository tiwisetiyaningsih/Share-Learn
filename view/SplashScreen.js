import { View, Image, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import { CommonActions } from '@react-navigation/native'

export class SplashScreen extends Component {
    UNSAFE_componentWillMount = async () => {

        let json = await AsyncStorage.getItem('users')
        let dataUser = JSON.parse(json)

        console.log(dataUser)
        if (dataUser?.data){
            console.log ('masuk')
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0, 
                    routes: [
                        {
                            name:'home'
                        }
                    ]
                })
            )
        } else {
            this.props.navigation.replace('pengenalanapp1')
        }
    //    return console.log(dataUser.data)
    //     setTimeout(() => {
    //         this.props.navigation.replace('pengenalanapp1')
    //     }, 3000);
    }
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
        <View style={{ alignItems: 'center', paddingTop: 70, paddingBottom: 80 }}
            onPress={() => { navigation.navigate('pengenalanapp1') }}>
            <Image source={require('../assets/logo/logo_share_learn.png')} ></Image>
        </View>
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