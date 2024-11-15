import React from "react";
import{useDispatch, useSelector} from 'react-redux'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.css";
import { fetchAuth, selectIsAuth} from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  //авторизован или не авторизован
  const isAuth = useSelector(selectIsAuth)
  const dispatch= useDispatch()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
      password: "123456",
    } 
  }); 

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload){
      return alert("Login failed")
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } 
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper className="root">
      <Typography className="title" variant="h5">
        <h5>Log in</h5>
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
          Log in
        </Button>
        <a>
          <p> Don't have an account? Sign up</p>
        </a>
      </form>
    </Paper>
  );
};

export default Login;
