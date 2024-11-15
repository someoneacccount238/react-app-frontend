import { React, useState } from "react";

import data1 from "./food.json";
import data2 from "./foodList.json";

import "./List.css";

function List(props) {
  const foodsArray = [];
  for (var item in data1)
    foodsArray.push([
      data1[item].name,
      Math.round(data1[item].nutrition.energy / 4.18),
    ]);
  for (var item2 in data2)
    foodsArray.push([data2[item2].name, data2[item2].energy]);
  foodsArray.sort((a, b) => a[0] - b[0]);
  const filteredData = foodsArray.filter((el) => {
    //if no input the return the original

    if (props.input === "") {
      return el;
    } else {
      return el[0].toLowerCase().includes(props.input);
    }
  });
  return (
    <ul>
      {filteredData.map((item, index) => [
        <hr className="new3" />,

        <li key={index}>
          {item[0]}
          {item[1]} calories
        </li>,
      ])}
    </ul>
  );
}

export default List;
