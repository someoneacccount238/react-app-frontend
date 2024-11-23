import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// firebase.initializeApp({
//   apiKey: "AIzaSyBp1HY4L9i9uAyIIxGnUYTQARhvxGeKLVQ",
//   authDomain: "react-app-frontend-6c12c.firebaseapp.com",
//   projectId: "react-app-frontend-6c12c",
//   storageBucket: "react-app-frontend-6c12c.firebasestorage.app",
//   messagingSenderId: "307140458225",
//   appId: "1:307140458225:web:ed1c6d5760e753fb481b50"
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
