import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo.svg';
import useForm from "../../hooks/useForm";

function Register({onRegister, errorMessage, resetError}) {
  const {values, handleChange, errors, isValid} = useForm({})

  useEffect(() => {
    resetError();
  },[])

  function handleSubmit(event) {
    event.preventDefault()
    if(values.name && values.email && values.password) {
      onRegister(values);
    }
  }

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <Link to="/" className="form__logo hover-link"><img src={logo} alt="Иконка"/></Link>
        <h1 className="form__title">Добро пожаловать!</h1>
        <div className="form__container">
          <h2 className="form__subtitle">Имя</h2>
          <input
            autoComplete="off"
            type="text"
            name="name"
            id="input-name-register"
            className="form__input"
            required
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            value={values.name || ""}
            pattern="[A-Za-zА-ЯЁа-яё -]+"
            title="Имя может содержать только латиницу, кириллицу, пробел или дефис, от 2 до 30 символов"
          />
          {!isValid && <span className="form__input-error">{errors.name}</span>}
        </div>
        <div className="form__container">
          <h2 className="form__subtitle">E-mail</h2>
          <input
            autoComplete="off"
            type="text"
            name="email"
            id="input-email-register"
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
            id="input-password-register"
            className="form__input"
            required
            onChange={handleChange}
            value={values.password || ""}
          />
          {!isValid && <span className="form__input-error">{errors.password}</span>}
        </div>
        {!!errorMessage && <span className="form__server-error">{errorMessage}</span>}
        <button type="submit" className="form__button hover-button" disabled={!isValid}>Зарегистрироваться</button>
        <div className="form__comment">
            Уже зарегистрированы?&nbsp;<Link to="/signin" className="form__link hover-link">Войти</Link>
        </div>
      </form>
    </div>
  )
};

export default Register;