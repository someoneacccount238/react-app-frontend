import React, { Component, createRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import "./AddingNewItemForm.css";
import { jwtDecode } from "jwt-decode";
import axios from "../../axios.js";
 
import "./AddingNewItemForm.css";

const shortid = require("shortid");
 
// let obj1 = await axios.get(`https://react-app-backend-ten.vercel.app` + `/food`);
// let obj2 = await axios.get(`https://react-app-backend-ten.vercel.app` + `/food2`);

export default class Form extends Component {
  state = {
    showform: false,
    text: "",
    calorie: "",
    foodName: "",
  };
  
  inputRef = createRef();
  inputRef2 = createRef();

  // data1 = obj1.data;
  // data2 = obj2.data;

  writeToJson = () => {
    const fields = {
      name: this.inputRef.current.value,
      energy: this.inputRef2.current.value,
    };

    // this.data2.push(fields);

    var newFoodItem = window.localStorage.getItem("NEW_FOOD_ITEMS");

    let jsonArray = JSON.parse(newFoodItem);

    if (jsonArray) {
      if (!Array.isArray(jsonArray)) {
        var newArr = new Array(jsonArray, fields);
      } else {
        var newArr = new Array(...jsonArray, fields);
      }
    } else var newArr = fields;

    // console.log(newArr)

    window.localStorage.setItem("NEW_FOOD_ITEMS", JSON.stringify(newArr));
  };

  // fetchData = () => {
  //   this.writeToJson();
  //   fetch(`https://react-app-backend-ten.vercel.app`+`/api/json`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(this.data2),
  //   });
  // };

  toggleChange = () => {
    this.setState({
      showform: !this.state.showform,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onsubmit({
      id: shortid.generate(),
      text: this.state.text,
      calorie: parseInt(this.state.calorie),
    });

    // this.fetchData();

    this.writeToJson();

    this.setState({
      text: "",
      calorie: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <table className="table">
            <tr>
              <td>
                <h3 className="foodLabel">Имя продукта:</h3>
              </td>
              <td>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  ref={this.inputRef}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="caloriesLabel">Calories:</h3>
              </td>
              <td>
                <input
                  name="calorie"
                  value={this.state.calorie}
                  ref={this.inputRef2}
                  onChange={this.handleChange}
                  type="number"
                  className="form-control2"
                  id="pwd"
                />
              </td>
            </tr>
          </table>
          <div className="buttons">
            <button onSubmit={this.handleSubmit} className="btnSave">
              Сохранить
            </button>
            <button onClick={this.toggleChange} className="btnCancel1">
             Отменить
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
