import "./SearchWithCalorieForm.css";
import SearchableDropdownWithCalorieForm from "../SearchableDropdownWithCalorieForm/SearchableDropdownWithCalorieForm";

import axios from "axios";

import React, { useState } from "react";

let obj1 = await axios.get(`https://react-app-backend-2643b62b1d3c.herokuapp.com` + `/food`);
let obj2 = await axios.get(`https://react-app-backend-2643b62b1d3c.herokuapp.com` + `/food2`);
let obj3 = await axios.get(`https://react-app-backend-2643b62b1d3c.herokuapp.com` + `/food3`);
let obj4 = await axios.get(`https://react-app-backend-2643b62b1d3c.herokuapp.com` + `/food4`);

export default function SearchWithCalorieForm() {
  var data1, data2;
  function validate() {
    if (document.getElementById("checkbox")) {
      if (document.getElementById("checkbox").checked) {
        data1 = obj1.data;
        data2 = obj2.data;
      } else {
        data1 = obj3.data;
        data2 = obj4.data;
      }
    }
  }
  validate();
  const [value, setValue] = useState("");

  const foodsArray = [];

  for (var item in data1)
    foodsArray.push([
      data1[item].name,
      Math.round(data1[item].nutrition.energy / 4.18),
    ]);
  for (var item2 in data2)
    foodsArray.push([data2[item2].name, data2[item2].energy]);
  foodsArray.sort((a, b) => a[0] - b[0]);

  return (
    <div className="App">
      <SearchableDropdownWithCalorieForm
        options={foodsArray}
        id="id"
        selectedVal={value}
        handleChange={(val) => setValue(val)}
      />
    </div>
  );
}
