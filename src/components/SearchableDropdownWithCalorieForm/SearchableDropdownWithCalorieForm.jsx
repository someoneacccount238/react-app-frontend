import { useEffect } from "react";
import React, { useState, useRef } from "react";
import "./SearchableDropdownWithCalorieForm.css";
import AddingNewItemModal from "../AddingNewItemModal/AddingNewItemModal.jsx";
import CalorieForm from "../CalorieForm/CalorieForm.jsx";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { jwtDecode } from "jwt-decode";
import "../CalorieForm/CalorieForm.css";
import axios from "../../axios.js";
import { useTranslation } from "react-i18next";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const SearchableDropdownWithCalorieForm = ({
  options,
  id,
  selectedVal,
  handleChange,
}) => {
  const [t, i18n] = useTranslation("global");

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[0]);
    setIsOpen((isOpen) => !isOpen);
    setClicked(true);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) {
      return query;
    }
    if (selectedVal) {
      return selectedVal;
    }

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option[0].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 3,
    },
    calculateBtn: {
      backgroundColor: "#65558f",
      color: "white",
      // top: "41vw",
      // left: "35vw",
      // position: "fixed",
      height: "3vw !important",
    },
    addBtn: {
      width: "200px",
      backgroundColor: "#65558f",
      color: "white",
      // display: "inline-block",
      // position: "fixed",
      // top: "40vw",
      // left: "45vw",
    },
    addedBtn: {
      width: "200px",
      backgroundColor: "#d5d5d5",
      color: "white",
      // display: "inline-block",
      // position: "fixed",
      // top: "40vw",
      // left: "45vw",
    },
  }));
  const classes = useStyles();

  const [bannerSeen, hideBanner] = useState(true);
  const [calculateBlock, setCalculateBlock] = useState(false);
  const [btnName, changeBtnName] = useState(t("food_calculator.add_btn"));

  const [sum, setSum] = useState(0);

  const child1 = useRef();
  const child2 = useRef();

  const [isActive, setActive] = useState(false);

  const submit = () => {
    changeBtnName(t("food_calculator.added_btn"));
    makeBtnUnactive();
    onSubmit();
    saveTotalCalories();
  };
  const makeBtnUnactive = () => {
    setActive(!isActive);
  };

  const crossSignClose = () => {
    hideBanner(false);
    setClicked(false);
    setCalculateBlock(false);
    changeBtnName(t("food_calculator.add_btn"));
    makeBtnUnactive();
  };
  const onSubmit = () => {
    const foodName = getDisplayValue();
    const foodWeight = child2.current.value;
    const caloriesString = String(child1.current.textContent);
    const foodCalories = Math.round(
      (Number(caloriesString.substring(0, 3)) * foodWeight) / 100
    );

    var milisecondsTime = new Date().getTime();
    var getItems = window.localStorage.getItem("MY_TOTALS_FOOD_ENTRIES");
    if (getItems)
      var obj = {
        id: getItems.length + 1,
        foodName: foodName,
        foodCalories: foodCalories,
        foodWeight: foodWeight,
        date: milisecondsTime,
      };
    else
      var obj = {
        id: 1,
        foodName: foodName,
        foodCalories: foodCalories,
        foodWeight: foodWeight,
        date: milisecondsTime,
      };
    if (foodCalories != null)
      if (getItems != null) {
        const jsonArray = JSON.parse(getItems);

        jsonArray.push(obj);
        window.localStorage.setItem(
          "MY_TOTALS_FOOD_ENTRIES",
          JSON.stringify(jsonArray)
        );
      } else {
        window.localStorage.setItem(
          "MY_TOTALS_FOOD_ENTRIES",
          JSON.stringify([obj])
        );
      }
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
      // console.log("data");

      // console.log(data);

      if (data) {
        // for (let item in data) {
        //update
        const { data2 } = await axios.post(`/calendar/${now}`, fields);
        // console.log(data2);
      }

      //if entries are found, find entries of today, and update them
    }
  };

  const countCalories = (e) => {
    e.preventDefault();
    const caloriesString = String(child1.current.textContent);
    const calories = caloriesString.substring(0, 3);

    const grams = child2.current.value;
    if (calories != null) setSum((Number(calories) * Number(grams)) / 100);
    setCalculateBlock(true);
  };

  function iterateJson(el) {
    for (var item in options) {
      if (options[item][0] == el) return options[item][1];
    }
  }

  if (!clicked)
    return (
      <div className="dropdown">
        <h3>{t("food_calculator.task")}</h3>
        <div className="control">
          <div className="selected-value">
            <input
              ref={inputRef}
              type="text"
              value={getDisplayValue()}
              name="searchTerm"
              onChange={(e) => {
                setQuery(e.target.value);
                handleChange(null);
              }}
              onClick={toggle}
            />
          </div>
          <div className={`arrow ${isOpen ? "open" : ""}`}></div>
        </div>
        {/* dropdown */}
        <div className={`options ${isOpen ? "open" : ""}`}>
          {filter(options).map((option, index) => {
            return (
              <div
                onClick={() => selectOption(option)}
                className={`option ${
                  option[0] === selectedVal ? "selected" : ""
                }`}
                key={`${id}-${index}`}
              >
                <h4>{option[0]}</h4>
                <p>{option[1]} Calories | 100 grams </p>
                <hr className="new3" />{" "}
              </div>
            );
          })}
          <AddingNewItemModal></AddingNewItemModal>
        </div>
        {/* карточка */}
      </div>
    );
  else if (clicked) {
    return (
      <div className="container15">
        <div className="box22">
          <h3>{t("food_calculator.food")}</h3>
        </div>
        <div className="card">
          <p>{getDisplayValue()} </p>
          <div className="twoPTags">
            <p ref={child1}>
              {iterateJson(getDisplayValue())} {t("food_calculator.portion")}
            </p>
          </div>
          <div className="crossSign" onClick={crossSignClose}>
            <span>&#10006;</span>
          </div>
        </div>
        <div className="box33">
          <h3 className="sideDiv-second">{t("food_calculator.amount")}</h3>
        </div>
        <div className="box44">
          <div>
            <input className="inpt" type="number" ref={child2} />
          </div>
          <div>
            <p className="grams">{t("food_calculator.grams")}</p>
          </div>
          <img src={require("../images/hand.jpg")} className="icon" />
        </div>
        {!calculateBlock && (
          <div className="box55">
            <Button
              variant="contained"
              className={classes.calculateBtn}
              onClick={countCalories}
            >
              {t("food_calculator.calculate_btn")}
            </Button>
          </div>
        )}
        {/* <hr className="new3" />  */}

        {calculateBlock && [
          <div className="box555">
            <h3 className="consumed"> {t("food_calculator.youve_consumed")}</h3>
          </div>,

          <div className="calorieDiv">
            <p>
              {Math.round(sum)}{" "}
              <p className="calories">{t("food_calculator.calories")}</p>
            </p>
          </div>,

          <div className="box77">
            {/* <Link to="/my-totals"> */}
            <Button
              variant="contained"
              className={!isActive ? classes.addBtn : classes.addedBtn}
              onClick={submit}
              disabled={isActive}
            >
              {btnName}
            </Button>
            <a>{t("food_calculator.view")}</a>
          </div>,
        ]}
      </div>
    );
  }
};
export default SearchableDropdownWithCalorieForm;
