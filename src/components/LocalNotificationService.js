import PushNotification, { Importance } from 'react-native-push-notification'
// import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform } from 'react-native'

class LocalNotificationService {

    createDefaultChannels() {
        PushNotification.createChannel(
            {
                channelId: "default-channel-id", // (required)
                channelName: `Default channel`, // (required)
                channelDescription: "A default channel", // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.createChannel(
            {
                channelId: "sound-channel-id", // (required)
                channelName: `Sound channel`, // (required)
                channelDescription: "A sound channel", // (optional) default: undefined.
                soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    configure = (onOpenNotification, navigation) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[LocalNotificationService] onRegister: ", token)
            },
            onNotification: function (notification) {
                console.log("LocalNotificationService onNotification: ", notification)
                if (!notification?.data) {
                    return
                }

                notification.userInteraction = true

                if (notification.collapse_key !== undefined) {
                    let buildNotif = {
                        message: notification.message,
                        order_id: notification.order_id,
                        type: notification.type
                    }
                    onOpenNotification(Platform.OS === 'ios' ? notification.data.item : buildNotif, navigation, true)
                } else {
                    onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data, navigation)
                }


                // if (Platform.OS === 'ios') {
                //     notification.finish(PushNotificationIOS.FetchResult.NoData)
                // }
            },

            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: true,

            requestPermissions: true
        })
    }

    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            ...this.buildAndroidNotification(id, title, message, data, options),
            ...this.buildIOSNotification(id, title, message, data, options),

            channelId: 'default-channel-id',
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false,
            largeIcon: "",
            // bigPictureUrl: data.android.imageUrl || ""
        })
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        console.log(options?.smallIcon || "meyercustomer")
        return {
            id: id,
            autoCancel: true,
            largeIcon: options?.largeIcon || "meyercustomer",
            smallIcon: options?.smallIcon || "meyercustomer",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.priority || "high",
            data: data
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            // PushNotificationIOS.removeAllDeliveredNotifications()
        } else {
            PushNotification.cancelLocalNotifications()
        }
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID: ", notificationId);
        PushNotification.cancelLocalNotifications({ id: `${notificationId}` })
    }
}

export const localNotificationService = new LocalNotificationService()