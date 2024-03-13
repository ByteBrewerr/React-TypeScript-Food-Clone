import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import "../auth.scss";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../../../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { observer } from "mobx-react-lite";
import { registerUser } from "../../../services/authService";

export type SignUpFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  number: string;
};

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+\d{11}$/;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    const success = await registerUser(data);
    if (success) {
      navigate("/");
    }
    reset();
  };

  if (auth.currentUser) {
    return <Navigate to="/" />;
  }

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
        label="Number"
        {...register("number", {
          required: "Введите номер телефона",
          pattern: {
            value: phonePattern,
            message: "Введите действительный номер телефона в формате +12345678900",
          },
        })}
      />
      {errors.number && <p>{errors.number.message}</p>}
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
      {isSubmitting ? (
        <Button disabled>
          <CircularProgress />
        </Button>
      ) : (
        <Button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
      )}
    </form>
  );
};

export default observer(SignUp);
