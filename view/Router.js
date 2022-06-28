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

const Stack = createStackNavigator()

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='login'>
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

      </Stack.Navigator>
    </NavigationContainer>
  )
}