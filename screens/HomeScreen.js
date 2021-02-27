import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import  { AntDesign, SimpleLineIcon, SimpleLineIcons} from '@expo/vector-icons';
import CustomListItem from '../components/CustomListItem'
import {auth, db} from '../firebase'

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);

    const handlePress = () => {
        navigation.navigate("CameraScreen")
    } 


    const signOutUser = () => {
        auth.signOut()
        .then(() => {
            navigation.replace('Login')
        });
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot( (snapshot) => (
            setChats(
                snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()

            })))
        ))
            return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "CHORES",
            headerStyle: { backgroundColor: "#ff9900"},
            headerTitleStyle: { color: "white"},
            headerTintColor: "blue",
            headerLeft: () => (
                <View style={{marginLeft: 15, flexDirection:'row', flex:2, marginTop:10 }}>
                    <TouchableOpacity onPress={ signOutUser } activeOpacity={0.5}>
                        <Text style={styles.logout}>  LogOut </Text>
                        {/* <Avatar rounded  size={45} source={{ uri: auth?.currentUser?.photoURL}} /> */}
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity onPress={handlePress}>
                        <AntDesign name='camerao' size={28} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('AddChat')}
                    >
                        <SimpleLineIcons name='pencil' size={24} color='black'/>
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName,
        })
    }

    return (
        <SafeAreaView>
            <View style={styles.avatar}>
                <Avatar rounded size='large' source={{ uri: auth?.currentUser?.photoURL}} />
            </View>
            <ScrollView style={styles.container}>
            
                {chats.map(({id, data: { chatName }}) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat }/>
                ))}
                <CustomListItem />
            </ScrollView>
            <View style={{height: 30}}/>

            <ScrollView>
            {chats.map(({id, data: { chatName }}) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat }/>
                ))}
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:'100%'
    },
    logout:{
        color: 'white',
        fontSize: 20,
        shadowColor:'green'
    },
    avatar:{
        justifyContent:'center',
        alignItems:'center',
        margin:5
    }
    
    
})
