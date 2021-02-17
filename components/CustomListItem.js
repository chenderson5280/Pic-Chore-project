import React from 'react'
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from "react-native-elements"
import { db } from '../firebase';

const CustomListItem = ({id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc('id')
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
            setChatMessages(snapshot.docs.map((doc) => doc.data()))
            );

            return unsubscribe
    });

    return (
        <ListItem 
        key={id}
        bottomDivider
        onPress={() => enterChat(id, chatName)}
        >
            <Avatar 
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL ||
                    "https://us.123rf.com/450wm/kannaa123rf/kannaa123rf1511/kannaa123rf151100273/48127175-word-job-isolated-on-white-background-with-a-red-check-mark-.jpg?ver=6",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                   notes:
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
