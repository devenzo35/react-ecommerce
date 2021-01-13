import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBRsL4iqt9FMj04S6ihwK8BnoxgO03tXos",
  authDomain: "react-ecommerce-46ef0.firebaseapp.com",
  projectId: "react-ecommerce-46ef0",
  storageBucket: "react-ecommerce-46ef0.appspot.com",
  messagingSenderId: "532923523303",
  appId: "1:532923523303:web:85221fcf10a9f2b67c0242",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
