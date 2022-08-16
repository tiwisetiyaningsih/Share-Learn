import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Profile from './Profile'
import Notes from './Notes'
import SplashScreen from './SplashScreen'
import PengenalanApp_1 from './PengenalanApp_1'
import PengenalanApp_2 from './PengenalanApp_2'
import PengenalanApp_3 from './PengenalanApp_3'
import GetStarted from './GetStarted'
import CreatePost from './CreatePost'
import ListPostMapel from './ListPostMapel'
import EditPost from './EditPost'
import DetailNotes from './DetailNotes'
import CreateNotes from './CreateNotes'
import EditNotes from './EditNotes'
import Comment from './Comment'
import Notification from './Notification'
import Information from './Information'
import LikedPosts from './LikedPosts'
import MyPost from './MyPost'
import EditProfile from './EditProfile'
import MyAccount from './MyAccount'
import Search from './Search'
import Forum from './Forum'
import DetailNotif from './DetailNotif'
import CreatePostForum from './CreatePostForum'
import CommentPostForum from './CommentPostForum'
import DetailnotifForum from './DetailnotifForum'
import Reply from './Reply'


const Stack = createStackNavigator()

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='splashscreen'>
        <Stack.Screen name='splashscreen' component={SplashScreen}>

        </Stack.Screen>

        <Stack.Screen name='pengenalanapp1' component={PengenalanApp_1}>

        </Stack.Screen>

        <Stack.Screen name='pengenalanapp2' component={PengenalanApp_2}>

        </Stack.Screen>

        <Stack.Screen name='pengenalanapp3' component={PengenalanApp_3}>

        </Stack.Screen>

        <Stack.Screen name='getstarted' component={GetStarted}>

        </Stack.Screen>

        <Stack.Screen name='register' component={Register}>

        </Stack.Screen>
        <Stack.Screen name='login' component={Login}>

        </Stack.Screen>

        <Stack.Screen name='home' component={Home}>

        </Stack.Screen>

        <Stack.Screen name='notes' component={Notes}>

        </Stack.Screen>

        <Stack.Screen name='profile' component={Profile}>

        </Stack.Screen>

        <Stack.Screen name='createpost' component={CreatePost}>

        </Stack.Screen>

        <Stack.Screen name='listpostmapel' component={ListPostMapel}>

        </Stack.Screen>

        <Stack.Screen name='editpost' component={EditPost}>

        </Stack.Screen>

        <Stack.Screen name='detailnotes' component={DetailNotes}>

        </Stack.Screen>

        <Stack.Screen name='createnotes' component={CreateNotes}>

        </Stack.Screen>

        <Stack.Screen name='editnotes' component={EditNotes}>

        </Stack.Screen>

        <Stack.Screen name='notification' component={Notification}>

        </Stack.Screen>

        <Stack.Screen name='comment' component={Comment}>

        </Stack.Screen>

        <Stack.Screen name='information' component={Information}>

        </Stack.Screen>

        <Stack.Screen name='likedposts' component={LikedPosts}>

        </Stack.Screen>

        <Stack.Screen name='mypost' component={MyPost}>

        </Stack.Screen>

        <Stack.Screen name='editprofile' component={EditProfile}>

        </Stack.Screen>

        <Stack.Screen name='myaccount' component={MyAccount}>

        </Stack.Screen>

        <Stack.Screen name='search' component={Search}>

        </Stack.Screen>

        <Stack.Screen name='forum' component={Forum}>

        </Stack.Screen>

        <Stack.Screen name='detailnotif' component={DetailNotif}>

        </Stack.Screen>

        <Stack.Screen name='createpostforum' component={CreatePostForum}>

        </Stack.Screen>

        <Stack.Screen name='commentpostforum' component={CommentPostForum}>

        </Stack.Screen>

        <Stack.Screen name='detailnotifForum' component={DetailnotifForum}>
          
        </Stack.Screen>

        <Stack.Screen name='reply' component={Reply}>

        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}