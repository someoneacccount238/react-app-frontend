import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
 

export default function Table(props) {
  return (
    <React.Fragment>
      <tr>
        <td>{props.meal.text}</td>
      <td>   {props.meal.calorie} </td>
        <td>
          <FaTrash onClick={props.onDelete} className="mr-4" />
          <FaEdit />
        </td>
      </tr>
    </React.Fragment>
  );
}
