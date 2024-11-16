import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Registration.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
      password: "123456",
    },
  });

 
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data.payload)
     if (!data.payload){
      return alert("Signup failed")
    }
    if ('token' in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } 
  };

    // React.useEffect();
  console.log(isAuth, "isAuth");

  if (isAuth) {
    return <Navigate to="/" />;
  }
 
  return (
    <Paper className="root">
      <Typography className="title" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className="field"
          label="E-Mail *"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Enter email" })}
          fullWidth
          type="email"
        />
        <TextField
          className="field"
          label="Password *"
          error={Boolean(errors.password?.message)}
          {...register("password", { required: "Enter password" })}
          helperText={errors.password?.message}
          type="password"
          fullWidth
        />
        <Button size="large" variant="contained" type="submit" fullWidth>
          Sign up
        </Button>
      </form>
    </Paper>
  );
};

export default Registration;
