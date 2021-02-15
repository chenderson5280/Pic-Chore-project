import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import {auth, db} from '../firebase'

const HomeScreen = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Let's get er done",
            headerStyle: { backgroundColor: "light-gray"},
            headerTitleStyle: { color: "blue"},
            headerTintColor: "green",
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <Avatar rounded source={{ uri: auth?.currentuser?.photoURL}}/>
                </View>
            )
        });
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
