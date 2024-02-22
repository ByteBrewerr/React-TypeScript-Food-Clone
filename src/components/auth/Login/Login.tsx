// Login.tsx
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import "../auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import { loginUser } from "../../../services/authService";

export type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const success = await loginUser(data);
    if (success) {
      navigate("/");
    }
    reset();
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email" {...register("email")} />
      <TextField label="Password" type="password" {...register("password")} />
      <div className="authSwitch">
        <Link to="/register">Еще нет аккаунта? Зарегистрироваться</Link>
        <Button type="submit">{isSubmitting ? <CircularProgress /> : "ВОЙТИ"}</Button>
      </div>
    </form>
  );
};

export default observer(Login);
