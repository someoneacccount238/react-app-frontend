import React, { Component, createRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import "./MealForm.css";
import { jwtDecode } from "jwt-decode";
import axios from "../../axios.js"; 
const shortid = require("shortid");

let obj1 = await axios.get(`https://react-app-backend-ten.vercel.app`+ `/food`);
let obj2 = await axios.get(`https://react-app-backend-ten.vercel.app`+ `/food2`);

export default class Form extends Component {
  state = {
    showform: false,
    text: "",
    calorie: "",
    foodName: "",
  };

  inputRef = createRef();

  inputRef2 = createRef();

  data1 = obj1.data;
  data2 = obj2.data;

  writeToJson = () => {
    const fields = {
      name: this.inputRef.current.value,
      energy: this.inputRef2.current.value,
    };

    this.data2.push(fields);
  };

  fetchData = () => {
    this.writeToJson(); 
    fetch("https://react-app-backend-ten.vercel.app/api/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.data2),
    });
  };
 

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
  handleSubmit =  (event) => {
    event.preventDefault();
    this.props.onsubmit({
      id: shortid.generate(),
      text: this.state.text,
      calorie: parseInt(this.state.calorie),
    });
    try {
      this.fetchData();
    } catch (e) {}

    this.setState({
      text: "",
      calorie: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group"></div>
          <div className="form-group">
            <h3 className="foodLabel">Food name:</h3>
            <input
              type="text"
              id="fname"
              name="fname"
              ref={this.inputRef}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <h3 className="caloriesLabel">Calories:</h3>
            <input
              name="calorie"
              value={this.state.calorie}
              ref={this.inputRef2}
              onChange={this.handleChange}
              type="number"
              className="form-control"
              id="pwd"
            />
          </div>
          <button onSubmit={this.handleSubmit} className="btnSave">
            Save
          </button>
          <button onClick={this.toggleChange} className="btnCancel">
            Cancel
          </button>
        </form>
      </React.Fragment>
    );
  }
}
