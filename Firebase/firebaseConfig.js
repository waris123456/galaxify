import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, set, get, ref } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFyyCPoDZohpRZu9E2fyNH178VwOKEwcQ",
    authDomain: "fir-realtime-database-8bb68.firebaseapp.com",
    databaseURL: "https://fir-realtime-database-8bb68-default-rtdb.firebaseio.com",
    projectId: "fir-realtime-database-8bb68",
    storageBucket: "fir-realtime-database-8bb68.appspot.com",
    messagingSenderId: "881922040912",
    appId: "1:881922040912:web:b9f161d2f0733e0ee01d55",
    measurementId: "G-BD56MFK4V1"
};

const app = initializeApp(firebaseConfig);
const appDatabase = getDatabase(app);

export {
    appDatabase,
    get,
    ref,
    set,
}