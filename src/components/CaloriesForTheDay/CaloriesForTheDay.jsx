import { useEffect, useLayoutEffect } from "react";
import { useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect,
  useSearchParams,
} from "react-router-dom";

import "./CaloriesForTheDay.css";
import * as ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { fetchEntries } from "../../redux/slices/totals.js";
import { selectIsAuth } from "../../redux/slices/auth.js";

const CaloriesForTheDay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date");

  return (
    <Paper className="root">
      <Typography className="title" variant="h5">
        Calories For {date}
      </Typography>
      <div className="container">
        <div className="box1">
          <input type="text" className="inpt" />
        </div>
        <p className="pTag"> calories </p>
        <Button
          size="large"
          variant="contained"
          type="submit"
          className="deleteBtn"
          // onClick={() => deleteEntry(item.id)}
        >
          Save
        </Button>
      </div>
    </Paper>
  );
};

export default CaloriesForTheDay;
