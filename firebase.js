import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    get,
    child
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

  apiKey: "AIzaSyCvo9glEjGTpjITO1IcB7Jn906pO7oFZkM",

  authDomain:
  "smart-workplace-safety-system.firebaseapp.com",

  databaseURL:
  "https://smart-workplace-safety-system-default-rtdb.firebaseio.com/",

  projectId:
  "smart-workplace-safety-system",

  storageBucket:
  "smart-workplace-safety-system.firebasestorage.app",

  messagingSenderId:
  "55416173886",

  appId:
  "1:55416173886:web:5681c8a4f3abc313cee86f"
};

const app =
initializeApp(firebaseConfig);

const database =
getDatabase(app);

window.database = database;
window.ref = ref;
window.push = push;
window.get = get;
window.child = child;

console.log("Firebase Connected Successfully");
console.log(database);