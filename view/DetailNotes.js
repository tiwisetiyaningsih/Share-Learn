import { Text, View, StyleSheet, StatusBar } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'


export class DetailNotes extends Component {
    render() {
        return (
            <View style={style.app}>
                <StatusBar backgroundColor={'#38C6C6'} barStyle='light-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <Detail></Detail>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 25, paddingBottom: 15, alignItems: 'center', backgroundColor: '#38C6C6' }}>
        <BaseButton style={{ padding: 5, marginLeft: -160 }}
            onPress={() => { navigation.navigate('notes') }}>
            <Octicons name='chevron-left' size={25} color='#FFF' ></Octicons>
        </BaseButton>
        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#FFF', justifyContent: 'center', marginLeft: -20 }}>Notes</Text>
    </View>
)

const Detail = () => (
    <View style={{ backgroundColor: '#FFF', padding: 20 }}>
        <View style={{ flexDirection:'row', justifyContent: 'space-between'}}>
            <View style={{ alignItems: 'center', justifyContent:'center', paddingLeft: 120}}>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#000'}}>Matematika</Text>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>Bab Logika Matematika</Text>
            </View>
            <Feather name='more-horizontal' size={18} color='#000'></Feather>
        </View>
        <View style={{ paddingVertical: 30, paddingHorizontal: 10}}>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#000' }}>
            A. Pengertian 
            Pernyataan adalah kalimat yang bisa benar atau bisa salah. Sementara kalimat terbuka adalah jenis kalimat yang belum diketahui kebenarannya. Contoh pernyataan, berikut adalah salah satu contohnya:
            1.Indonesia Raya adalah lagu kebangsaan Indonesia. -pernyataan benar
            2.Bika ambon berasal dari Ambon. -pernyataan salah
            
            B. Macam - macam kalimat Majemuk
            konjungsi
            Disjungsi
            Implikasi
            Biimplikasi
            </Text>
        </View>
    </View>
)

const style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})

export default DetailNotes