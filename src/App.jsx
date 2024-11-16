import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Nav from "./components/Nav.js";
import React, { useState } from "react";
import axios from './axios.js'
// import "./components/FoodDiary/FoodDiary.css";
import { Routes, Route  } from "react-router-dom";

import Calendar from "./components/Calendar/Calendar.jsx";

import FoodCalculator from "./components/FoodCalculator/FoodCalculator.jsx";
import Login from "./components/Login/Login.js";

import Form from "./components/SearchableDropdown/Form.jsx";

import Registration from "./components/Registration/Registration.js";

import MyTotals from "./components/MyTotals/MyTotals.jsx";
 
import CaloriesForTheDay from "./components/CaloriesForTheDay/CaloriesForTheDay.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

 
export default function App() {

//  React.useEffect( axios.get('mytotals') ,[])
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
 
  return [
    <Routes>
      <Route path="/calendar" element={[<Nav />, <Calendar />]} />
      <Route path="/login" element={[<Nav />, <Login />]} />
      <Route path="/register" element={[<Nav />, <Registration />]} />

      <Route path="/food-calculator" element={[<Nav />, <FoodCalculator />]} />

      <Route path="/my-totals" element={[<Nav />, <MyTotals />]} />
      <Route path="/form" element={[<Nav />, <Form />]} />
      <Route path="/calories-for-the-day" element={[<Nav />, <CaloriesForTheDay />]} />
      
      <Route path="/" element={[<Nav /> ]} />

    </Routes>
  ];
}
