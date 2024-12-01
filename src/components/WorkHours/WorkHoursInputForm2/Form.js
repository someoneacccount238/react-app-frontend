import React, { Component } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import "./WorkHoursInputForm2.css";
import { jwtDecode } from "jwt-decode";
import axios from "../../../axios.js";

const shortid = require("shortid");

export default class Form extends Component {
  state = {
    showform: false,
    text: "",
    workHours: "",
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
      workHours: Number(this.state.workHours),
    });

    if (window.localStorage.getItem("token")) {
      const obj = jwtDecode(String(window.localStorage.getItem("token")));
      const userId = obj._id;

      const fields = {
        workHours: Number(this.state.workHours),
        date: this.props.date,
        user_id: userId,
      };
      const { data } = await axios.post("/work/add", fields);

      this.setState({
        text: "",
        workHours: "",
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group3"></div>
          <div className="form-group3">
            <h3 className="caloriesLabel2">workHours:</h3>
            <input
              name="workHours"
              value={this.state.workHours}
              onChange={this.handleChange}
              type="number"
              className="form-control2"
              id="pwd"
            />
          </div>
          <button onSubmit={this.handleSubmit} className="btnSave2">
            Save
          </button>
          <button onClick={this.toggleChange} className="btnCancel2">
            Cancel
          </button>
        </form>
      </React.Fragment>
    );
  }
}
