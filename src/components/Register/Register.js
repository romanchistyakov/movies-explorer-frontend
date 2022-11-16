import React from "react";
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo.svg';

function Register({onEnterClick}) {
  return (
    <div className="register">
      <form className="form">
        <Link to="/" className="form__logo hover-link"><img src={logo} alt="Иконка"/></Link>
        <h1 className="form__title">Добро пожаловать!</h1>
        <h2 className="form__subtitle">Имя</h2>
        <input
          autoComplete="off"
          type="text"
          name="name"
          id="input-name-register"
          className="form__input"
          required minLength="2"
          maxLength="30"
        />
        <h2 className="form__subtitle">E-mail</h2>
        <input
          autoComplete="off"
          type="email"
          name="email"
          id="input-email-register"
          className="form__input"
          required minLength="2"
          maxLength="30"
        />
        <h2 className="form__subtitle">Пароль</h2>
        <input
          autoComplete="off"
          type="text"
          name="password"
          id="input-password-register"
          className="form__input"
          required minLength="2"
          maxLength="30"
        />
        <button type="submit" className="form__button hover-button" onClick={onEnterClick}>Зарегистрироваться</button>
        <div className="form__comment">
            Уже зарегистрированы?&nbsp;<Link to="/signin" className="form__link hover-link">Войти</Link>
        </div>
      </form>
    </div>
  )
};

export default Register;