import React, { Component } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import "./MealForm.css";
import { jwtDecode } from "jwt-decode";
import axios from "../../axios.js";

const shortid = require("shortid");

export default class Form extends Component {
  state = {
    showform: false,
    text: "",
    calorie: "",
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.onsubmit({
      id: shortid.generate(),
      text: this.state.text,
      calorie: parseInt(this.state.calorie),
    });

    if (window.localStorage.getItem("token")) {
      const obj = jwtDecode(String(window.localStorage.getItem("token")));
      const userId = obj._id;

      const fields = {
        calories: parseInt(this.state.calorie),
        date: this.props.date,
        user_id: userId,
      };

      const { data } = await axios.post("/calendar/add", fields);

      this.setState({
        text: "",
        calorie: "",
      });
    }
  };

  render() {
  //   if (this.state.showform === false) {
  //     return (
  //       <React.Fragment>
  //         <form onClick={this.toggleChange}>
  //           <Button type="button" className="btn btn-success">
  //             Add Meal
  //           </Button>
  //         </form>
  //       </React.Fragment>
  //     );
  //   } else {
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group"></div>
            <div className="form-group">
              <h3 className="caloriesLabel">Calories:</h3>
              <input
                name="calorie"
                value={this.state.calorie}
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
