import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../Register/Register.css';
import './Login.css';
import logo from '../../images/logo.svg';
import useForm from "../../hooks/useForm";

function Login({onLogin, errorMessage, resetError}) {
  const {values, handleChange, errors, isValid} = useForm({});


  useEffect(() => {
    resetError();
  },[])

  function handleSubmit(event) {
    event.preventDefault()
    if(values.email && values.password) {
      onLogin(values);
    }
  }

  return (
    <div className="login" onSubmit={handleSubmit} noValidate>
      <form className="form">
        <Link to="/" className="form__logo hover-link"><img src={logo} alt="Иконка"/></Link>
        <h1 className="form__title">Рады видеть!</h1>
        <div className="form__container">
          <h2 className="form__subtitle">E-mail</h2>
          <input
            autoComplete="off"
            type="email"
            name="email"
            id="input-email-login"
            className="form__input"
            required
            onChange={handleChange}
            value={values.email || ""}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            title="Формат почты: example@example.com"
          />
          {!isValid && <span className="form__input-error">{errors.email}</span>}
        </div>
        <div className="form__container">
          <h2 className="form__subtitle">Пароль</h2>
          <input
            autoComplete="off"
            type="password"
            name="password"
            id="input-password-login"
            className="form__input"
            required
            onChange={handleChange}
            value={values.password || ""}
          />
          {!isValid && <span className="form__input-error">{errors.password}</span>}
        </div>
        {!!errorMessage && <span className="form__server-error">{errorMessage}</span>}
        <button type="submit" className="form__button form__button_login hover-button" disabled={!isValid}>Войти</button>
        <div className="form__comment">
            Ещё не зарегистрированы?&nbsp;<Link to="/signup" className="form__link hover-link">Регистрация</Link>
        </div>
      </form>
    </div>
  )
};

export default Login;