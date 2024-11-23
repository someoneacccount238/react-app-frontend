import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.css";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [t, i18n] = useTranslation("global");

  //авторизован или не авторизован
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
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert(t("login.no-success"));
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
        <h5>{t("login.title")}</h5>
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
          label={t("login.pwd")}
          error={Boolean(errors.password?.message)}
          {...register("password", { required: "Enter password" })}
          helperText={errors.password?.message}
          type="password"
          fullWidth
        />
        <Button size="large" variant="contained" type="submit" fullWidth>
          {t("login.title")}
        </Button>
        <a href="/register"> {t("login.question")}</a>
      </form>
    </Paper>
  );
};

export default Login;
