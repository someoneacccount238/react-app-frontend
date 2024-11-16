import { useEffect, useLayoutEffect } from "react";
import { useState, useRef } from "react";

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

import "./Entry.css";

const Entry = ({ item, i }) => {
  const [entry, hideEntry] = useState(false);

  const deleteEntry = () => {
    hideEntry(true)
  };
}
 

export default Entry;
