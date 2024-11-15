import "./FoodCalculator.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import Search from "../Search/Search";

export default function FoodCalculator() {
  return [
    <div className="stripe">
      <Header name="Food Calculator" />
      <hr class="double" />
      <h3 className="label">
        Get the calories for over 37,000 foods and drinks. Then add them to your
        Daily Totals to see how your calories add up!
      </h3>
       
      <Search />
    </div>,
  ];
}
