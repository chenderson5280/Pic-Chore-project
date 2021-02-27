import React, { useState, useEffect } from 'react';
import { Alert, AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import {StatusBar} from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { db } from '../firebase';


export default function CameraScreen({navigation}){

  const [input, setInput] = useState("");


  const createImage = async () => {
    await db
    .collection('images')
    .add({
        chatName: input,
    })
    .then(() => {
        navigation.goBack();
    })
    .catch((error) => alert(error));
};
  
    // const [previewVisible, setPreviewVisible] = useState(false)
    // const [capturedImage, setCapturedImage] = useState(null)
    // const [startCamera,setStartCamera] = useState(false)
  
    let camera: Camera;
  
  
    const __startCamera = async ()=>{
      const {status} = await Camera.requestPermissionsAsync()
      if(status === 'granted'){
        setStartCamera(true)
      }
      else{
        Alert.alert("Access denied")
      }
    }

    const __takePicture = async () => {
      if (!camera) return
      const photo = await camera.takePictureAsync()
      console.log(photo)

      setPreviewVisible(true)
      setCapturedImage(photo)
     
    }

    return (
      // {previewVisible && capturedImage ? (
      //   <CameraPreview photo={capturedImage} />
      // ) : (

      <SafeAreaView style={styles.container}>
        <Camera 
          style={styles.camera}
          ref={(r) => {
            camera=r
          }}
          >
          <View
        style={{
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
        }}
      >
        <View
        style={{
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
        }}
        >
            <TouchableOpacity
            onPress={createImage}
            style={{
            width: 100,
            height: 100,
            bottom: 0,
            borderRadius: 50,
            backgroundColor: '#fff'
            }}
            />
    </View>
    </View>
          </Camera>
         
      </SafeAreaView>

    )}
      

          
    


  const styles = StyleSheet.create({

    container: {
      flex: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: "center",
      marginTop: 1,
  },
  camera: {
    flex: 4, 
    height:'80%',
    width:'100%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  cameracontainer:{
    alignItems: 'center',
      justifyContent: "center",
      flex:1
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
  })
