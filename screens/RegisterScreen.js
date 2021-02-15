import React, {useState, useLayoutEffect} from 'react';
import { StyleSheet,  View, KeyboardAvoidingView} from 'react-native';
import { Button ,Text, Input } from 'react-native-elements';
import {StatusBar} from 'expo-status-bar';
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back it up!"
        })
    }, [navigation]);


    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then( authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=",
            });
        })
        .catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />

            <Text h2 style={{marginBottom: 50 }}> 
                Create new account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Full Name' 
                    // autoFocus 
                    type='text' 
                    value={name} 
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder='Email' 
                    type='email' 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder='Password' 
                    type='password' 
                    secureTextEntry
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder='Profile Pic' 
                    type='text' 
                    value={imageUrl} 
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button 
                onPress={register} 
                title='Register' 
                raised
                containerStyle={styles.button}
            />
            <View style={{height:80}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor:'white'
    },
    inputContainer:{
        width:340
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
