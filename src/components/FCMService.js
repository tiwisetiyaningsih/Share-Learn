import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'

class FCMService {

    register = (onRegister, onNotification, onOpenNotification, navigation) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification, navigation)
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages()
            await messaging().setAutoInitEnabled(true)
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.getToken(onRegister)
                } else {
                    this.requestPermission(onRegister)
                }
            }).catch(error => {
                console.log("[FCMService] Permission rejected", error)
            })
    }

    // getToken = (onRegister) => {
    //     messaging().getToken()
    //         .then(fcmToken => {
    //             if (fcmToken) {
    //                 onRegister(fcmToken)
    //             } else {
    //                 console.log("[FCM Service] USer does not have a device token")
    //             }
    //         }).catch(error => {
    //             console.log("[FCM Service] getToken rejected", error)
    //         })
    // }

    getToken = async (onRegister) => {
        try {
            PushNotification.configure({
                onRegister: function ({ token }) {
                    onRegister(token)
                }
            })
        } catch (error) {
            console.log("[FCM Service] getToken rejected", error)
        }
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            }).catch(error => {
                console.log("[FCM Service] Request Permimssion Rejected", error)
            })
    }

    deleteToken = () => {
        console.log("[FCM Service] deleteToken")
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCM Service] Delete token error", error)
            })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification, navigation) => {

        messaging()
            .onNotificationOpenedApp(async remoteMessage => {
                try {
                    console.log("[FCM Service] onNotificationOpenedApp Notification caused app to open")
                    if (remoteMessage) {
                        const notification = remoteMessage.notification
                        await onOpenNotification(notification, navigation)

                    }
                } catch (error) {
                    console.log('error', error)
                }
            })

        messaging()
            .getInitialNotification()
            .then(async remoteMessage => {
                try {
                    console.log("[FCM Service] getInitialNotification Notification caused app to open")

                    if (remoteMessage) {
                        const notification = remoteMessage.notification
                        await onOpenNotification(notification, navigation)
                    }
                } catch (error) {
                    console.log('error', error)
                }
            })

        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCM Service] A new FCM message arrived!", remoteMessage)

            if (remoteMessage) {
                let notification = null
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data.notification
                } else {
                    notification = remoteMessage.notification
                }
                onNotification(notification)
            }
        })

        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCM Service] New token refresh: ", fcmToken);
            onRegister(fcmToken)
        })

    }

    unRegister = () => {
        this.messageListener()
    }
}

export const fcmService = new FCMService()