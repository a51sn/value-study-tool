import firebase from "firebase/app";
import "firebase/database";

const config = {
    // api keys
}

const db = firebase.initializeApp(config);
export default db;