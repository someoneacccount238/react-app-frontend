import "./FoodCalculator.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import SearchWithCalorieForm from "../SearchWithCalorieForm/SearchWithCalorieForm";
import { useTranslation } from "react-i18next";


export default function FoodCalculator() {
  const [t, i18n] = useTranslation("global");
  return [
    <div className="stripe">
      <Header name="Food Calculator" />
      <hr className="double" />
      <h3 className="label">
      {t("food_calculator.description")}
      </h3>
       
      <SearchWithCalorieForm />
    </div>,
  ];
}
