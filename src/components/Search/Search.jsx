import "./Search.css";
import SearchableDropdown from "../SearchableDropdown/SearchableDropdown";
 
import axios from "axios";

import { useState } from "react"; 

let  obj1  = await axios.get(`https://react-app-backend-ten.vercel.app`+ `/food`);
let   obj2   = await axios.get(`https://react-app-backend-ten.vercel.app`+ `/food2`);

export default function Search() {
  // console.log("data1")

  const data1 =obj1.data
  const data2 =obj2.data
  // console.log(data1)

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
      <SearchableDropdown
        options={foodsArray}
        id="id"
        selectedVal={value}
        handleChange={(val) => setValue(val)}
      />
    </div>
  );
}
