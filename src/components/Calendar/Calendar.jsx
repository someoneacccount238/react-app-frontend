import "./Calendar.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import JumpingBanner from "../JumpingBanner/JumpingBanner";
import { Routes, Route } from "react-router-dom";
import CaloriesForTheDay from "../CaloriesForTheDay/CaloriesForTheDay.jsx";
import Nav from "../Nav.js";
import InputModal from "../InputModal/InputModal.jsx";
import { fetchDateEntries } from "../../redux/slices/calendar.js";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../../axios";

export default function Calendar() {
  const styles = {
    disabledButton: {
      backgroundColor: "gray",
      color: "white",
      cursor: "not-allowed",
    },
    enabledButton: {
      display: "block",
      height: "70px",
      width: "70px",
      borderRadius: "50%",
    },
  };
  let emptyWeek = [];
  let curr = new Date();
  //is displayed when no data entries present
  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - 1 - curr.getDay() + 1 + i;

    let day = new Date(curr.setDate(first));
    emptyWeek = [...emptyWeek, day];
  }

  const [object1, setObject] = useState([]);
  let week = [];

  const getDateEntries = async () => {
    let curr = new Date();
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - 1 - curr.getDay() + 1 + i;

      let day = new Date(curr.setDate(first));
      week = [...week, day];
    }

    if (window.localStorage.getItem("token")) {
      const obj = jwtDecode(window.localStorage.getItem("token"));
      const userId = obj._id;

      let { data } = await axios.get(`/calendar/${userId}`);
      console.log(data)

      // console.log(data);
      if (data.length > 0) {
        var now = new Date();
        var sortedDates = [];
        let myArray = [];
        var yearAgo = new Date("2023-11-04");

        data = data.filter((item) => {
          return (
            new Date(item.date).getTime() >= yearAgo.getTime() &&
            new Date(item.date).getTime() <= now.getTime()
          );
        });

        data.sort((a, b) => a.date - b.date); // b - a for reverse sort
        // console.log(data);

        var d = new Date(data[0].date);

        for (d; d <= now; d.setDate(d.getDate() + 1)) {
          sortedDates.push(new Date(d));
        }

        const eventsMap = new Map();

        for (var item in week) {
          for (var item2 in data) {
            var j = new Date(week[item].setHours(0, 0, 0, 0));
            var i = new Date(new Date(data[item2].date).setHours(0, 0, 0, 0));

            if (String(j) === String(i))
              eventsMap.set(String(i), data[item2].calories);

            if (eventsMap.has(String(j))) continue;
            else eventsMap.set(String(j), 0);
          }
        }
        // var weekAgo = new Date("2024-11-01");
        // eventsMap.set(String(weekAgo), 500);

        // console.log(eventsMap);

        for (let [key, value] of eventsMap) {
          var newObj = { calories: value, date: key };
          myArray.push(newObj);
        }
        // console.log(myArray);
        setObject(myArray);
      }
    }
  };
  var now = new Date().setHours(0, 0, 0, 0);

  React.useEffect(() => getDateEntries(), []);

 

  return object1.length > 0 ? (
    <div className="stripe">
      <Header name="Calorie Tracker"/>
      <hr class="double" />
      <h3 className="label">
        Track calories every day and see your progress! Click “+” to count
        calories for the day.
      </h3>
      <div className="container7">
        {object1.map((a) => (
          <div className="dayAndCalories">
            <h3>
              {String(a.date).slice(0, 3)} {String(a.date).slice(8, 10)}
            </h3>
            {String(new Date(a.date).setHours(0, 0, 0, 0)) === String(now) ? (
              <Link to="/food-calculator">
                <button className="circleBtn">
                  {a.calories == 0 ? "+" : a.calories}
                  {/* find today entry if no entrie is found -- +  */}
                </button>
              </Link>
            ) : (
              <button
                className="circleBtn"
                style={
                  String(new Date(a.date).setHours(0, 0, 0, 0)) > String(now)
                    ? styles.disabledButton
                    : styles.enabledButton
                }
              >
                <InputModal
                  calories={a.calories}
                  date={a.date}
                  disabled={
                    String(new Date(a.date).setHours(0, 0, 0, 0)) > String(now)
                  }
                ></InputModal>
              </button>
            )}
          </div>
        ))}
      </div>
      {/* <JumpingBanner /> */}
    </div>
  ) : (
    <div className="stripe">
      <Header />
      <hr class="double" />
      <h3 className="label">
        Track calories every day and see your progress! Click “+” to count
        calories for the day.
      </h3>
      <div className="container7">
        {emptyWeek.map((a) => (
          <div className="dayAndCalories">
            <h3>
              {String(a).substring(0, 3)} {String(a).substring(8, 10)}
            </h3>

            {String(new Date(a).setHours(0, 0, 0, 0)) === String(now) ? (
              <Link to="/food-calculator">
                <button className="circleBtn">
                  {" "}
                  +{/* find today entry if no entrie is found -- +  */}
                </button>
              </Link>
            ) : (
              <button
                className="circleBtn"
                style={
                  String(new Date(a).setHours(0, 0, 0, 0)) > String(now)
                    ? styles.disabledButton
                    : styles.enabledButton
                }
              >
                <InputModal
                  calories=" "
                  date={a}
                  disabled={
                    String(new Date(a).setHours(0, 0, 0, 0)) > String(now)
                  }
                ></InputModal>
              </button>
            )}
          </div>
        ))}
      </div>
      {/* <JumpingBanner /> */}
    </div>
  );
}
