import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";

//Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import { selectIsAuth, logout } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../redux/slices/auth";

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
  loginBtn: {
    color: "white",
    width:"150px"
  },
  loginBtnErr: {
    color: "white",
    backgroundColor: "red",
  },
  push: {
    marginLeft: "auto",
  },
  nav: {
    backgroundSize: "100vh",
  },
}));

export default function Nav() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) dispatch(logout());
    window.localStorage.removeItem("token");
  };

  
  window.onload = () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };

  window.onload();
  
  
  return (
    <div className={classes.nav}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/calendar">
              <Button className={classes.loginBtn} color="inherit">
                Calorie Tracker
              </Button>
            </Link>
            <Link to="/food-calculator">
              <Button className={classes.loginBtn} color="inherit">
                Food Calculator
              </Button>
            </Link>
            <Link to="/my-totals">
              <Button className={classes.loginBtn} color="inherit">
                Day Totals{" "}
              </Button>
            </Link>
            {isAuth && <a className={classes.push} label={""} />}
            {isAuth && (
              <Link to="/">
                <Button
                  className={classes.loginBtnErr}
                  color="error"
                  onClick={onClickLogout}
                >
                  Logout
                </Button>
              </Link>
            )}
            {!isAuth && (
              <Link className={classes.push} to="/register">
                <Button className={classes.loginBtn} color="inherit">
                  Sign Up
                </Button>
              </Link>
            )}
            {!isAuth && (
              <Link to="/login">
                {" "}
                <a href="/login">
                  <Button className={classes.loginBtn} color="inherit">
                    Login
                  </Button>{" "}
                </a>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
