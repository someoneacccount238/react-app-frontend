import { useEffect, useLayoutEffect } from "react";
import { useState, useRef } from "react";

import "./MyTotals.css";
import * as ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import axios from "../../axios.js";

import { fetchEntries } from "../../redux/slices/totals.js";
import { selectIsAuth } from "../../redux/slices/auth.js";

import Entry from "../Entry/Entry.jsx";
import { tooltipClasses } from "@mui/material";

const MyTotals = () => {
  const [jsonArray, setJsonArray] = useState([]);

  useEffect(() => {
    getAllEntries();
  }, jsonArray);

  const getAllEntries = () => {
    var arrayOfObjects = JSON.parse(
      window.localStorage.getItem("MY_TOTALS_FOOD_ENTRIES")
    );
    // console.log("arrayOfObjects")
    // console.log(arrayOfObjects)
    var now = new Date();

    for (var item in arrayOfObjects) {
      // console.log("--------");
      // console.log(new Date(arrayOfObjects[item].date).getDate())
      if (arrayOfObjects[item])
        if (new Date(arrayOfObjects[item].date).getDate() < now.getDate()) {
          item = null;
        }
    }

    setJsonArray(arrayOfObjects);
  };
  const parseNulls = () => {
    var getItems = window.localStorage.getItem("MY_TOTALS_FOOD_ENTRIES");

    let jsonArray3 = JSON.parse(getItems);
    // console.log("running");
    if (jsonArray3) {
      let len = jsonArray3.length;

      for (let i = 0; i < len; i++)
        jsonArray3[i] && jsonArray3.push(jsonArray3[i]); // copy non-empty values to the end of the array

      jsonArray3.splice(0, len); // cut the array and leave only the non-empty values

      // console.log(jsonArray);

      window.localStorage.setItem(
        "MY_TOTALS_FOOD_ENTRIES",
        JSON.stringify(jsonArray3)
      );
    }
  };

  useEffect(() => {
    parseNulls();
  }, []);

  const deleteEntry = (id) => {
    // hideEntry(true)

    var getItems = window.localStorage.getItem("MY_TOTALS_FOOD_ENTRIES");

    let jsonArray = JSON.parse(getItems);

    if (jsonArray != null) {
      for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i]) if (id == jsonArray[i].id) delete jsonArray[i];
      }
      jsonArray.filter(Number);

      window.localStorage.setItem(
        "MY_TOTALS_FOOD_ENTRIES",
        JSON.stringify(jsonArray)
      );
    }
    saveTotalCalories();
  };
  React.useEffect(() => saveTotalCalories(), []);

  const saveTotalCalories = async () => {
    let sum = 0;
    var getItems = window.localStorage.getItem("MY_TOTALS_FOOD_ENTRIES");

    let jsonArray1 = JSON.parse(getItems);

    for (let i = 0; i < jsonArray1.length; i++)
      sum += Number(jsonArray1[i].foodCalories);

    var now = new Date();
    //update calories
    if (window.localStorage.getItem("token")) {
      const obj = jwtDecode(window.localStorage.getItem("token"));
      const userId = obj._id;

      //get all entries sorted by current id
      let { data } = await axios.get(`/calendar/${userId}`);

      const fields = {
        calories: parseInt(sum),
        date: now.setHours(0, 0, 0, 0),
        user_id: userId,
      };

      //if no entries is found, make an entry
      if (data.length == 0) {
        const { data } = await axios.post("/calendar/add", fields);
      }
      if (data) {
        for (let item in data) {
          if (
            new Date(data[item].date).setHours(0, 0, 0, 0) ==
            now.setHours(0, 0, 0, 0)
          ) {
            //update

            const { data } = await axios.post(`/calendar/${now}`, fields);
          } else {
            const { data } = await axios.post("/calendar/add", fields);
          }
        }
      }

      //if entries are found, find entries of today, and update them
    }
  };

  const child = useRef();

  return (
    <Paper className="root">
      <Typography className="title" variant="h5">
        My Totals
      </Typography>
      <form>
        <div className="container6">
          {jsonArray != null
            ? jsonArray.map(function (item, i) {
                if (item) {
                  return (
                    <li key={item.id} className="list">
                      {item.foodName}

                      <span className="calories" ref={child}>
                        {item.foodCalories}
                      </span>

                      <button
                        type="submit"
                        className="deleteBtn2"
                        onClick={() => deleteEntry(item.id)}
                      >
                        <img
                          src={require("../images/delete.jpg")}
                          className="deleteImg2"
                        />
                      </button>

                      <p className="greyText">{item.foodWeight} grams</p>
                    </li>
                  );
                }
              })
            : ""}
        </div>
      </form>
    </Paper>
  );
};

export default MyTotals;
