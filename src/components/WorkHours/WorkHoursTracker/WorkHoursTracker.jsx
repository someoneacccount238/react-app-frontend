import "./WorkHoursTracker.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Header/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Nav from "../../Nav.js";
import WorkHoursInputForm from "../WorkHoursInputForm/WorkHoursInputForm.jsx";
import { fetchDateEntries } from "../../../redux/slices/calendar.js";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../../../axios.js";
import { useTranslation } from "react-i18next";
import Loader from "../../Loader/Loader.jsx";

export default function WorkHoursTracker() {
  const [t, i18n] = useTranslation("global");
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
    //число = число - (понедельник) - день недели
    let first = curr.getDate() - 1 - curr.getDay() + 1 + i;

    let day = new Date(curr.setDate(first));

    //date
    emptyWeek = [...emptyWeek, day];
  }

  const [object1, setObject] = useState([]);
  let week = [];

  const getDateEntries = async () => {
    let curr = new Date();
    //last week
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - 1 - curr.getDay() + 1 + i;

      let day = new Date(curr.setDate(first));
      week = [...week, day];
    }

    if (window.localStorage.getItem("token")) {
      const obj = jwtDecode(window.localStorage.getItem("token"));
      const userId = obj._id;

      let { data } = await axios.get(`/work/${userId}`);
      console.log(data);

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

        let curr = sortedDates[0];
        var sortedArrayWithStartOfWeek = [];

        for (let i = 1; i <= 7; i++) {
          let first = curr.getDate() - 1 - curr.getDay() + 1 + i;

          let day = new Date(curr.setDate(first));
          sortedArrayWithStartOfWeek = [...sortedArrayWithStartOfWeek, day];
        }

        // console.log(sortedArrayWithStartOfWeek)

        // обьединить week и sortedDates
        const merge = (a, b, predicate = (a, b) => a === b) => {
          const c = [...a]; // copy to avoid side effects
          // add all items from B to copy C if they're not already present
          b.forEach((bItem) =>
            c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
          );
          return c;
        };

        const combinedArr = merge(week, sortedArrayWithStartOfWeek);

        combinedArr.sort((a, b) => a - b); // b - a for reverse sort

        const eventsMap = new Map();

        for (var item in combinedArr) {
          for (var item2 in data) {
            var j = new Date(combinedArr[item].setHours(0, 0, 0, 0));
            var i = new Date(new Date(data[item2].date).setHours(0, 0, 0, 0));

            if (String(j) === String(i))
              eventsMap.set(String(i), data[item2].workHours);

            if (eventsMap.has(String(j))) continue;
            else eventsMap.set(String(j), 0);
          }
        }
        // var weekAgo = new Date("2024-11-01");
        // eventsMap.set(String(weekAgo), 500);

        //  console.log(eventsMap);

        for (let [key, value] of eventsMap) {
          var newObj = { workHours: value, date: key };
          myArray.push(newObj);
        }
        // console.log(myArray);
        setObject(myArray);
      }
    }
  };
  var now = new Date().setHours(0, 0, 0, 0);

  React.useEffect(() => getDateEntries(), []);

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return !isLoading ? (
    object1.length > 0 ? (
      <div className="stripe stripe5">
        <Header name="Work Tracker" />
        <hr className="double" />

        <div className="container7">
          {object1.map((a) => (
            <div className="dayAndCalories">
              <h3>
                {String(a.date).slice(0, 3)} {String(a.date).slice(8, 10)}
              </h3>

              <button
                className="circleBtn"
                style={
                  String(new Date(a.date).setHours(0, 0, 0, 0)) > String(now)
                    ? styles.disabledButton
                    : styles.enabledButton
                }
              >
                <WorkHoursInputForm
                  workHours={a.workHours}
                  date={a.date}
                  disabled={
                    String(new Date(a.date).setHours(0, 0, 0, 0)) > String(now)
                  }
                ></WorkHoursInputForm>
              </button>
            </div>
          ))}
        </div>
        {/* <JumpingBanner /> */}
      </div>
    ) : (
      <div className="stripe">
        <Header />
        <hr className="double" />
        <h3 className="label">
          Track workHours every day and see your progress! Click “+” to count
          workHours for the day.
        </h3>
        <div className="container7">
          {emptyWeek.map((a) => (
            <div className="dayAndCalories">
              <h3>
                {String(a).substring(0, 3)} {String(a).substring(8, 10)}
              </h3>

              <button
                className="circleBtn"
                style={
                  String(new Date(a).setHours(0, 0, 0, 0)) > String(now)
                    ? styles.disabledButton
                    : styles.enabledButton
                }
              >
                <WorkHoursInputForm
                  workHours=" "
                  date={a}
                  disabled={
                    String(new Date(a).setHours(0, 0, 0, 0)) > String(now)
                  }
                ></WorkHoursInputForm>
              </button>
            </div>
          ))}
        </div>
        {/* <JumpingBanner /> */}
      </div>
    )
  ) : (
    <Loader />
  );
}
