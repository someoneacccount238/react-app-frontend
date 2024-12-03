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

import { tooltipClasses } from "@mui/material";
import { useTranslation } from "react-i18next";

const MyTotals = () => {
  const [t, i18n] = useTranslation("global");

  const [jsonArray, setJsonArray] = useState([]);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    getAllEntries();
  }, jsonArray);

  const getAllEntries = () => {
    var arrayOfObjects = JSON.parse(
      window.localStorage.getItem("MY_TOTALS_FOOD_ENTRIES")
    );
    var now = new Date();

    for (var item in arrayOfObjects) {
      if (arrayOfObjects[item])
        if (
          new Date(arrayOfObjects[item].date).setHours(0, 0, 0, 0) <
          now.setHours(0, 0, 0, 0)
        ) {
          item = null;
        }
    }
    setJsonArray(arrayOfObjects);
  };
  const parseNulls = () => {
    var getItems = window.localStorage.getItem("MY_TOTALS_FOOD_ENTRIES");

    let jsonArray3 = JSON.parse(getItems);

    if (jsonArray3) {
      var filtered = jsonArray3.filter(function (el) {
        return el != null;
      });

      window.localStorage.setItem(
        "MY_TOTALS_FOOD_ENTRIES",
        JSON.stringify(filtered)
      );
    }
  };

  const deleteEntry = (event, id) => {
    event.preventDefault();

    var getItems = window.localStorage.getItem("MY_TOTALS_FOOD_ENTRIES");

    let jsonArray = JSON.parse(getItems);
    var indexToDelete;

    if (jsonArray != null) {
      for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i])
          if (id == jsonArray[i].id) {
            indexToDelete = i;
            delete jsonArray[i];
          }
      }

      window.localStorage.setItem(
        "MY_TOTALS_FOOD_ENTRIES",
        JSON.stringify(jsonArray)
      );
    }
    parseNulls();
    saveTotalCalories();
    handleClickDelete(indexToDelete);
    // window.location.reload(false);
  };

  useEffect(() => {
    saveTotalCalories();
  }, sum);

  const handleClickDelete = (index) => {
    const newJsonArray = [...jsonArray];
    newJsonArray.splice(index, 1); // To remove the index
    setJsonArray(() => newJsonArray);
  };

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
      let { data } = await axios.get(
        `/calendar/${userId}:${now.setHours(0, 0, 0, 0)}`
      );

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
        // for (let item in data) {
        //update
        const { data2 } = await axios.post(`/calendar/${now}`, fields);
      }

      //if entries are found, find entries of today, and update them
    }
    setSum(sum);
  };
  const child = useRef();

  return (
    <Paper className="root">
      <Typography className="title" variant="h5">
        {t("day_totals.title")}
      </Typography>
      <form>
        <div className="container6">
          {jsonArray != null
            ? jsonArray.map(function (item, i) {
                if (item) {
                  return (
                    <li key={item.id} className="list">
                      <div className="container12">
                        <div className="box1">
                          <p>{item.foodName}</p>
                        </div>
                        <div className="box2">
                          <p className="caloriesPTag" ref={child}>
                            {item.foodCalories} {t("day_totals.calories")}
                          </p>
                        </div>
                        <div className="box4">
                          <button
                            type="submit"
                            className="deleteBtn2"
                            onClick={(e) => deleteEntry(e, item.id)}
                          >
                            <img
                              src={require("../images/delete.jpg")}
                              className="deleteImg2"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="container13">
                        <div className="box3">
                          <p className="greyText">
                            {item.foodWeight} {t("day_totals.grams")}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                }
              })
            : ""}
        </div>
        <hr className="double" />
        <div className="container14">
          <div className="box5">
            <p>
              <b>Total:</b>
            </p>
          </div>
          <div className="box6">
            <p>
              <b>{sum + " calories"}</b>
            </p>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default MyTotals;
