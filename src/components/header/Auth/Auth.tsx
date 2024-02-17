// Auth.tsx
import React, { FC } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import "./auth.scss";

type RegistrationLoginFormProps = {
  formType: "registration" | "login";
};

interface FormData {
  name?: string;
  login: string;
  password: string;
  confirmPassword?: string;
}

const Auth: FC<RegistrationLoginFormProps> = ({ formType }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  const isRegistration = formType === "registration";

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Добавьте здесь логику обработки формы регистрации или входа
    if (isRegistration) {
      // Логика для регистрации
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Пароли не совпадают",
        });
        return;
      }
      console.log("Регистрация:", data);
    } else {
      // Логика для входа
      console.log("Вход:", data);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        {isRegistration && (
          <div className="auth-form-group">
            <label htmlFor="name">Имя:</label>
            <input type="text" id="name" {...register("name", { required: "Пожалуйста, введите имя" })} />
          </div>
        )}

        <div className="auth-form-group">
          <label htmlFor="login">Логин:</label>
          <input type="text" id="login" {...register("login", { required: "Пожалуйста, введите логин" })} />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Пароль:</label>
          <input type="password" id="password" {...register("password", { required: "Пожалуйста, введите пароль" })} />
        </div>

        {isRegistration && (
          <div className="auth-form-group">
            <label htmlFor="confirmPassword">Подтверждение пароля:</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Пожалуйста, введите подтверждение пароля",
              })}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
        )}

        <button type="submit">{isRegistration ? "Зарегистрироваться" : "Войти"}</button>
        <p className="auth-switch">{isRegistration ? "Уже есть аккаунт? Войти" : "Еще нет аккаунта? Зарегистрироваться"}</p>  
      </form>
    </div>
  );
};

export default Auth;
