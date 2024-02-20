// Login.tsx
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import "../auth.scss";
import { Link } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // Ваша логика для входа
    console.log(data);
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email" {...register("email")} />
      <TextField label="Password" type="password" {...register("password")} />
      <div className="authSwitch">
        <Link to="/register">Еще нет аккаунта? Зарегистрироваться</Link>
        <Button type="submit">ВОЙТИ</Button>
      </div>
    </form>
  );
};

export default Login;
