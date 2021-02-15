import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBUhbC64e9AnI_Gm3KC0_RuYkmDdnBMD4A",
    authDomain: "signal-clone-yt-build-54609.firebaseapp.com",
    projectId: "signal-clone-yt-build-54609",
    storageBucket: "signal-clone-yt-build-54609.appspot.com",
    messagingSenderId: "817327779206",
    appId: "1:817327779206:web:f759dc0067a4d45c5a9007"
};

let app;

if(firebase.apps.length === 0){
    app =firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export{ db, auth };
