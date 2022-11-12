import React from "react";
import { Link } from "react-router-dom";
import '../Register/Register.css';
import './Login.css';
import logo from '../../images/logo.svg';

function Login({onEnterClick}) {
  return (
    <div className="login">
      <form className="form">
        <Link to="/" className="form__logo hover-link"><img src={logo} alt="Иконка"/></Link>
        <h1 className="form__title">Рады видеть!</h1>
        <h2 className="form__subtitle">E-mail</h2>
        <input
          autoComplete="off"
          type="email"
          name="email"
          id="input-email-login"
          className="form__input"
          required minLength="2"
          maxLength="30"
        />
        <h2 className="form__subtitle">Пароль</h2>
        <input
          autoComplete="off"
          type="text"
          name="password"
          id="input-password-login"
          className="form__input"
          required minLength="2"
          maxLength="30"
        />
        <button type="submit" className="form__button form__button_login hover-button" onClick={onEnterClick}>Войти</button>
        <div className="form__comment">
            Ещё не зарегистрированы?&nbsp;<Link to="/signup" className="form__link hover-link">Регистрация</Link>
        </div>
      </form>
    </div>
  )
};

export default Login;