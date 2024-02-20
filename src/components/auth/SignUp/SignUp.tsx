// Register.tsx
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import "../auth.scss";
import { Link } from "react-router-dom";

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    reset();
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        {...register("name", {
          required: "Введите имя",
        })}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <TextField
        label="Email"
        {...register("email", {
          pattern: {
            value: emailPattern,
            message: "Введите действительный email",
          },
          required: "Введите почту",
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <TextField
        label="Password"
        type="password"
        {...register("password", {
          minLength: {
            value: 5,
            message: "Пароль должен содержать минимум 5 символов",
          },
          required: "Введите пароль",
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <TextField
        label="Confirm Password"
        type="password"
        {...register("confirmPassword", {
          required: "Подтвердите пароль",
          validate: (value) => value === getValues("password") || "Пароли должны совпадать",
        })}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <Link to="/login">Уже есть аккаунт? Войти</Link>
      <Button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
    </form>
  );
};

export default SignUp;
