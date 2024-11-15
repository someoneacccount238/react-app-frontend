import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../FoodDiary/FoodDiary.css";


export default function Meal(props) {
  return (
    <React.Fragment>
      <div className="meal">
      <tr>
        <td>{props.meal.text}</td>
        <td>{props.meal.calorie}</td>
        <td>
          <FaTrash onClick={props.onDelete} className="mr-4" />
          <FaEdit />
        </td>
      </tr></div>
    </React.Fragment>
  );
}
