'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import firebase from 'firebase/app';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyC-app2NDbvqGiuKLlSvNT599HcJWatLAY",
    authDomain: "ww3-game.firebaseapp.com",
    databaseURL: "https://ww3-game.firebaseio.com",
    projectId: "ww3-game",
    storageBucket: "ww3-game.appspot.com",
    messagingSenderId: "812556191009"
};
firebase.initializeApp(config);

ReactDOM.render(
    <App />,
    document.getElementById("root")
);