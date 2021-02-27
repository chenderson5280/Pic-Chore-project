import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input, Image} from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");
    const handlePress = () => {
        navigation.navigate("CameraScreen")
    } 

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Create',
            headerBacktitle: 'Chats',
        })
    }, [navigation]);

    const createChat = async () => {
        await db
        .collection('chats')
        .add({
            chatName: input,
        })
        
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error))
        .then(handlePress)
    };

    return (
        <View style={styles.container}>
            <Input 
                placeholder="let's get it done"
                value={input}
                onChangeText={(text) => setInput(text )}
                onSubmitEditing={createChat}
                // leftIcon={
                //     <Icon name='wechat' type='antdesign' size={24} color='black' />
                // }
            />
            <Button title='Create Chore' onPress={ createChat }  style={styles.button} />
            
            <View style={styles.recommendation}>
            <Text style={styles.example}> EXAMPLE : </Text>
                <Image 
                source={{ uri: 'https://alternativetechnology.zendesk.com/hc/article_attachments/115004208746/4_views.jpg' }}
                style={styles.image}
                />
                <Text style={styles.text}> We recommend capturing multiple angles.  </Text>
            </View>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#ffffe6',
        padding:30,
        height:"100%"
    },
    image:{
        width: '100%', height: 300
    },
    recommendation:{
        marginTop:50
    },
    text:{
        fontSize: 10,
        fontWeight: "700"
    },
    example:{
        fontSize:30,
        fontWeight:'600',
        color: '#ff9900'
    }
    // button:{
    //     padding:40
    // }
})
