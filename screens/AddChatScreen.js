import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input} from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");

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
        .catch((error) => alert(error));
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
            {/* <Input
            placeholder="Add photo here"
            /> */}
            <Button title='Create Chore' onPress={createChat} style={styles.button} />
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
    // button:{
    //     padding:40
    // }
})
