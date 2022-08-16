import { View, Image, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import { CommonActions } from '@react-navigation/native'
import { fcmService } from '../src/components/FCMService'
import { localNotificationService } from '../src/components/LocalNotificationService'

export class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.fcmNotif = null
        this.localNotif = null
    }
    UNSAFE_componentWillMount = async () => {

        let json = await AsyncStorage.getItem('users')
        let dataUser = JSON.parse(json)

        console.log(dataUser)
        if (dataUser?.data) {
            console.log('masuk')
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'home'
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

    componentDidMount = async () => {
        this.fcmNotif = fcmService
        this.localNotif = localNotificationService

        await this.fcmNotif.registerAppWithFCM()
        this.fcmNotif.register(this.onRegister, this.onNotification, this.onOpenNotification)

        this.localNotif.createDefaultChannels()
        this.localNotif.configure(this.onOpenNotification)
    }

    onRegister = async (token) => { // fungsi register token utk firebase notifikasi
        console.log("[App] onRegister: ", token);
        await AsyncStorage.setItem('fcmToken', token)
    }

    onNotification(notify) { // fungsi memberikan notifikasi ke device setelah menerima data dari firebase
        console.log("[App] onNotification: ", notify);
        const options = {
            soundName: 'default',
            playSound: true
        }
        let body = notify.body

        localNotificationService.showNotification(
            0,
            notify.title,
            body,
            notify,
            options
        )
    }

    onOpenNotification() {

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

const SS = ({ navigation }) => (
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