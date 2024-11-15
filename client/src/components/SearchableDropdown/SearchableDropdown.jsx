import { useEffect } from "react";
import React, { useState, useRef } from "react";

import Button from "@material-ui/core/Button";
import "./SearchableDropdown.css";
import * as ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios.js";
import InputModal2 from "../InputModal2/InputModal2.jsx";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SearchableDropdown = ({ options, id, selectedVal, handleChange }) => {
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
      top: "41vw",
      left: "35vw",
      position: "fixed",
    },
    addBtn: {
      width: "200px",
      backgroundColor: "#65558f",
      color: "white",
      display: "inline-block",
      position: "fixed",
      top: "40vw",
      left: "45vw",
    },
    addedBtn: {
      width: "200px",
      backgroundColor: "#d5d5d5",
      color: "white",
      display: "inline-block",
      position: "fixed",
      top: "40vw",
      left: "45vw",
    },
  }));
  const classes = useStyles();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [bannerSeen, hideBanner] = useState(true);

  const [calculateBlock, setCalculateBlock] = useState(false);
  const [sum, setSum] = useState(0);

  const [btnName, changeBtnName] = useState("+ Add to My Totals");
  const child1 = useRef();
  const child2 = useRef();
  const child3 = useRef();

  const [isActive, setActive] = useState(false);

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
 
  const crossSignClose = () => {
    hideBanner(false);
    setClicked(false);
    setCalculateBlock(false);
    changeBtnName("+ Add to My Totals");
    // makeBtnUnactive();
  };

  function iterateJson(el) {
    for (var item in options) {
      if (options[item][0] == el) return options[item][1];
    }
  }

  

  const countCalories = (e) => {
    e.preventDefault();
    const caloriesString = String(child1.current.textContent);
      const calories = caloriesString.substring(0,4);

    const grams = child2.current.value;
    if (calories != null) setSum((calories * grams) / 100);
    setCalculateBlock(true);
  };


  const changeBtnName1 = () => {
    changeBtnName("✔ Added to My Totals");
    makeBtnUnactive();
    onSubmit();
    saveTotalCalories();
  };


  const makeBtnUnactive = () => {
    setActive(!isActive);
  };
  const onSubmit = () => {
    const foodName = getDisplayValue();
    const foodWeight = child2.current.value;

    const caloriesString = String(child1.current.textContent); 

    const foodCalories =
       ( caloriesString.substring(0,4) * foodWeight) / 100;

    var milisecondsTime = new Date().getTime();

    // console.log("new" + new Date().getTime());

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

        // console.log(jsonArray);
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
      // console.log(new Date(data[item].date).setHours(0, 0, 0, 0));

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

  if (!clicked)
    return (
      <div className="dropdown">
        <h3>Search Food</h3>
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
          <InputModal2></InputModal2>
        </div>
        {/* карточка */}
      </div>
    );
  else if (clicked) {
    return (
      <div className="container">
        <div>
          <h3 className="sideDiv3">Select Food</h3>
        </div>
        <h3 className="sideDiv">Your Food</h3>
        <div className="card">
          <p>{getDisplayValue()} </p>
          <div className="twoPTags">
            <p ref={child1}  >{iterateJson(getDisplayValue())} calories | 100 grams</p>
          </div>
          <div className="crossSign" onClick={crossSignClose}>
            <span>&#10006;</span>
          </div>
        </div>
        <h3 className="sideDiv-second">Amount</h3>

        <input className="inpt" type="text" ref={child2} />
        <p className="grams">grams</p>
        <img src={require("../images/hand.jpg")} className="icon" />
        {!calculateBlock && (
          <Button
            variant="contained"
            className={classes.calculateBtn}
            onClick={countCalories}
          >
            Calculate
          </Button>
        )}
        {/* <hr className="new3" />  */}

        {calculateBlock && (
          <div>
            <div className="box5">
              <h3 className="consumed"> You've Consumed</h3>
            </div>

            <div className="box6">
              <div className="calorieDiv">
                <p className="calories" ref={child3}>
                  CALORIES
                </p>
                <h1> {Math.round(sum)}</h1>
              </div>
            </div>

            <div className="box7">
              <Link to="/my-totals">
                <Button
                  variant="contained"
                  className={!isActive ? classes.addBtn : classes.addedBtn}
                  onClick={changeBtnName1}
                  disabled={isActive}
                >
                  {btnName}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
};
export default SearchableDropdown;
