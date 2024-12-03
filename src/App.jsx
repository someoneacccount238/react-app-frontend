import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Nav from "./components/Nav.js";
import React, { useState, useEffect } from "react";
import axios from "./axios.js";
// import "./components/FoodDiary/FoodDiary.css";
import { Routes, Route } from "react-router-dom";

import Calendar from "./components/Calendar/Calendar.jsx";

import FoodCalculator from "./components/FoodCalculator/FoodCalculator.jsx";
import Login from "./components/Login/Login.js";
import WorkHoursTracker from "./components/WorkHours/WorkHoursTracker/WorkHoursTracker.jsx";

import Registration from "./components/Registration/Registration.js";

import MyTotals from "./components/MyTotals/MyTotals.jsx";

import CaloriesForTheDay from "./components/CaloriesForTheDay/CaloriesForTheDay.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

import i18next from "i18next";
import global_en from "./translations/en/global.json";

import global_ru from "./translations/ru/global.json";
import { I18nextProvider } from "react-i18next";

export const LangContext = React.createContext();

export default function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  // if (isAuth) document.getElementById("checkbox").style.right = "10rem";

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  i18next.init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
      en: {
        global: global_en,
      },
      ru: {
        global: global_ru,
      },
    },
  });

  return [
    <I18nextProvider i18n={i18next}>
      <Routes>
        <Route path="/calendar" element={[<Nav />, <Calendar />]} />
        <Route path="/login" element={[<Nav />, <Login />]} />
        <Route path="/register" element={[<Nav />, <Registration />]} />

        <Route
          path="/food-calculator"
          element={[<Nav />, <FoodCalculator />]}
        />

        <Route path="/my-totals" element={[<Nav />, <MyTotals />]} />

        <Route path="/work-tracker" element={[<Nav />, <WorkHoursTracker />]} />

        <Route
          path="/calories-for-the-day"
          element={[<Nav />, <CaloriesForTheDay />]}
        />

        <Route path="/" element={[<Nav />, <MainPage />]} />
      </Routes>
    </I18nextProvider>,
  ];
}
