import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from "react-native-elements"

const CustomListItem = ({id, chatName, enterChat }) => {
    return (
        <ListItem>
            <Avatar 
                rounded
                source={{
                    uri: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}}>
                    Check Excusses 
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    Lets hear what you got this time 
                    Lets hear what you got this time 
                    Lets hear what you got this time 
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
