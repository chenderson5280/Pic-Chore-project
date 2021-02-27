import React, { useState, useLayoutEffect } from 'react'
import { Image } from 'react-native-elements'
import { StyleSheet, Text, View  } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { TextInput,Keyboard } from 'react-native'
import { auth,db } from '../firebase'
import * as firebase from 'firebase'
import { TouchableWithoutFeedbackBase } from 'react-native'

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const handlePress = () => {
        navigation.navigate("CameraScreen")
    }

    const sendMessage = () => {

        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot( (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
            return unsubscribe;
    }, [route])

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerTitleAlign: 'left',
            // headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={styles.container}>
                    {/* <Avatar rounded source={{ uri: "https://www.nicepng.com/png/detail/256-2569218_big-camera-vector-camera-logo.png"}}/> */}
                    <Text style={styles.text}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    width: 70,
                    marginRight: 4,
                }}>
                    <TouchableOpacity onPress={handlePress}>
                        <AntDesign name='camerao' size={40} color='black'/>
                    </TouchableOpacity>
                </View>
            )
            // headerLeft: () => (
            //     <TouchableOpacity>
            //         <AntDesign name='arrowleft' size={24} color='white'/>
            //     </TouchableOpacity>
            // )
        })
    })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffe6'}}>
            <KeyboardAvoidingView 
            behavior='padding' 
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                {/* <TouchableWithoutFeedback onPress={Keyboard.dissmiss} > */}
                <>
                    <ScrollView contentContainerStyle={{ paddingTop: 15} }>
                        {messages.map(({id, data}) => 
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                    <Avatar 
                                    position='absolute'
                                    rounded
                                    size={30}
                                    bottom={-15}
                                    right={-10}
                                    source={{ uri: data.photoURL}}
                                    />
                                    <Text style={styles.receiverText}> {data.message}</Text>
                                </View>
                            ) : (
                                <View  key={id} style={styles.sender}>
                                    <Avatar 
                                    position='absolute'
                                    rounded
                                    size={30}
                                    bottom={-15}
                                    left={-2}
                                    source={{ uri: data.photoURL}}
                                    />
                                    <Text style={styles.senderText}> {data.message }</Text>
                                    <Text style={{fontSize:10}} >{data.displayName}</Text>
                                </View>
                            )
                        )}
                    </ScrollView>
                    <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={0.5} >
                    <Image
                    borderRadius={20}
                    activeOpacity={0.1}
                    // onPress={Keyboard.dismiss}
            source={{
        
            uri:
                "https://i.pinimg.com/originals/bf/ea/6a/bfea6aa779e3e2e9ce2cd178b001c0b8.jpg",
            }}
            style={styles.image}
        />

                    </TouchableOpacity>
                    <View style={styles.submitView}>
                        <TouchableOpacity >
                            <Text style={styles.submitButton}> SUBMIT WORK </Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.footer}>
                        <TextInput  
                            value={input}
                            placeholder='message here...'
                            onChangeText={(text) => setInput(text)}
                            onSubmitEditing={sendMessage}
                            style={styles.textInput}
                        />
                        
                        <TouchableOpacity
                            onPress={sendMessage}
                            activeOpacity={0.5}
                        >
                            <Ionicons name='send' size={30} color='#ff9900'/>
                        </TouchableOpacity>
                    </View>
                </>
                {/* </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    image:{
        width: '100%', height: 300 
    },
    container:{
        flex:1,
        margin: 10,
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    sender:{
        padding:15,
        backgroundColor:'#e6e6e6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft:15,
        marginBottom: 20,
        maxWidth:"80%",
        position: 'relative'
    },
    receiver:{
        padding:15,
        backgroundColor:'white',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight:15,
        marginBottom: 20,
        maxWidth:"80%",
        position: 'relative'
    },
    text: {
        color: 'white',
        fontWeight:'700',
        fontSize: 18,
        marginLeft: 10
    },
    senderText:{
        fontSize:15,
        fontWeight:'600'
    },
    receiverText:{
        fontSize:15,
        fontWeight:'600'
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding: 15,
        
    },
    textInput:{
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight:15,
        backgroundColor: "white",
        padding:10,
        color: "black",
        borderRadius:3,
        borderColor:"black"
    },
    submitButton:{
        fontSize: 30,
        fontWeight: "700",
        // textDecorationLine: 'underline'
        color: '#ff9900',
        // textShadowColor:'#990000',
        // textShadowRadius:1

    },
    submitView: {
        alignItems: 'center',
    }
})
