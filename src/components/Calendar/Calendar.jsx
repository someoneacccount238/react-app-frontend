import "./Calendar.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
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
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader.jsx";

export default function Calendar() {
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

  for (let i = 1, n = 7; i <= 7 && n >= 1; i++, n--) {
    let first;
    if (curr.getDay() == 0) {
      first = curr.getDate() - n + i;
    } else {
      first = curr.getDate() - curr.getDay() + i;
    }

    let day = new Date(curr.setDate(first));
    emptyWeek = [...emptyWeek, day];
  }

  const [object1, setObject] = useState([]);
  let week = [];

  const getDateEntries = async () => {
    let curr = new Date();
    //current week
    for (let i = 1, n = 7; i <= 7 && n >= 1; i++, n--) {
      let first;
      if (curr.getDay() == 0) {
        first = curr.getDate() - n + i;
      } else {
        first = curr.getDate() - curr.getDay() + i;
      }

      let day = new Date(curr.setDate(first));

      week = [...week, day];
    }

    if (window.localStorage.getItem("token")) {
      const obj = jwtDecode(window.localStorage.getItem("token"));
      const userId = obj._id;

      let { data } = await axios.get(`/calendar/${userId}`);

      if (data.length > 0) {
        var now = new Date();
        var sortedDates = [];
        let myArray = [];

        data.sort((a, b) => a.date - b.date);

        var d = new Date(data[0].date);

        for (d; d <= now; d.setDate(d.getDate() + 1)) {
          sortedDates.push(new Date(d));
        }

        let curr = sortedDates[0];
        var sortedArrayWithStartOfWeek = [];

        //остаток от деления на 7 -- кол-во i

        let k = 1;
        let n = 7;

        while (k <= 7 && n >= 1) {
          let first;

          if (curr.getDay() == 0) {
            first = curr.getDate() - n + k;
          } else {
            first = curr.getDate() - curr.getDay() + k;
          }

          let day = new Date(curr.setDate(first));

          sortedArrayWithStartOfWeek = [...sortedArrayWithStartOfWeek, day];

          console.log("curr.setDate(sortedDates[sortedDates.length - 1])");

          console.log(new Date(curr.setDate(curr.getDate() - curr.getDay() + k)));
          if (
            k % 7 == 0 &&
            curr.setDate(curr.getDate() - curr.getDay() + k) <
              sortedDates[sortedDates.length - 2]
          ) {
            k += 7;
            n = 7;
            console.log(k);
          }
          //то увеличить i на остаток от деления на 7

          k++;
          n--;
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
              eventsMap.set(String(i), data[item2].calories);

            if (eventsMap.has(String(j))) continue;
            else eventsMap.set(String(j), 0);
          }
        }
        // var weekAgo = new Date("2024-11-01");
        // eventsMap.set(String(weekAgo), 500);

        //  console.log(eventsMap);

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

  // const [isLoading, setIsLoading] = React.useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 7000);
  // }, []);

  // return !isLoading ? (

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  

  return object1.length > 0 ? (
    <div className="stripe stripe5">
      <Header name={t("calendar.title")} />

      <hr className="double" />
      <h3 className="label">{t("calendar.description")}</h3>
      <div className="container7">
        {object1.map((a, index) => (
          <div className="dayAndCalories">
            <h3>
              {days[index % 7] + " "}
              {String(a.date).slice(8, 10)}
            </h3>
            {String(new Date(a.date).setHours(0, 0, 0, 0)) === String(now) ? (
              <Link to="/food-calculator" className="link">
                <button className="circleBtn">
                  <p className="bigPlusSign">
                    {" "}
                    {a.calories == 0 ? "+" : a.calories}
                  </p>
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
      <Header name={t("calendar.title")} />
      <hr className="double" />
      <h3 className="label">{t("calendar.description")}</h3>
      <div className="container7">
        {emptyWeek.map((a, index) => (
          <div className="dayAndCalories">
            <h3>
              {days[index % 7] + " "}
              {String(a).substring(8, 10)}
            </h3>

            {String(new Date(a).setHours(0, 0, 0, 0)) === String(now) ? (
              <Link to="/food-calculator">
                <button className="circleBtn">
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
  //   <Loader />
  // );
}
