import firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCRZhgWIsKVl6eKVCFHl3gWPKZNSRvdOkw",
    authDomain: "awesome-timer.firebaseapp.com",
    databaseURL: "https://awesome-timer.firebaseio.com",
    projectId: "awesome-timer",
    storageBucket: "awesome-timer.appspot.com",
    messagingSenderId: "613445332513"
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;

export const db = firebase.database();

export const getAll = (collection) => db.ref(`${collection}`)

export const getOne = (collection, attr) => db.ref(`${collection}/${attr}`)

export const insert = (collection, value) => db.ref(`${collection}`).set({ ...value })

export const auth = firebase.auth