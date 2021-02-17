import React, { useState, useEffect } from 'react';
import { Alert, AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import {StatusBar} from 'expo-status-bar';

export default function CameraScreen(){
  
    const [startCamera,setStartCamera] = React.useState(false)
  
    // let camera: Camera;
  
  
    const __startCamera = async ()=>{
      const {status} = await Camera.requestPermissionsAsync()
      if(status === 'granted'){
        setStartCamera(true)
      }
      else{
        Alert.alert("Access denied")
      }
    }

    return (
      // startCamera ? (
        <Camera 
          style={styles.camera}
          // ref={(r) => {
          // camera = r
          // }}
          

          ></Camera>
          
    //   ):(
    //     <View style={styles.container}>
          
    //         <View style={styles.buttonContainer}>
    //           <TouchableOpacity
    //             style={styles.button}
    //             onPress={__startCamera}

            
    //           >
    //             <Text style={styles.text}> Take PIC </Text>
    //           </TouchableOpacity>
    //           </View>
           
          
    //       <StatusBar style="auto" />
    //     </View>
    //   )
    // )
    )
  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 5,
    },
    camera: {
      flex: 1, 
      height:'80%',
      width:'100%',
      // justifyContent: 'flex-end',
      // alignItems: 'center',
    },
    buttonContainer:{
      backgroundColor: 'black',
    },
    button: {
      width: 130,
      borderRadius: 4,
      backgroundColor: '#14274e',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    }
  
  });