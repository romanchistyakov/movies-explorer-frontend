import {React, useEffect, useContext } from "react";
import './Profile.css';
import Header from '../Header/Header';
import useForm from '../../hooks/useForm'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({onExitClick, loggedIn, onEdit, errorMessage, resetError, onSave, isEditorOpen}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useForm({});
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetError();
  },[])

  useEffect(() => {
    setValues(currentUser);
  }, [isEditorOpen]);

  function handleSaveClick(e) {
    e.preventDefault();
    if (values.email && values.name) {
      onEdit(values);
    }
  }

  return (
    <div className="profile">
      <Header isLogged={loggedIn}/>
      <h1 className="profile__title">{`Привет, ${currentUser.name}`}</h1>

      <form className="profile__form" onSubmit={handleSaveClick}>

        <div className="profile__container">
          <p className="profile__data">Имя</p>
          <p className={`profile__data ${isEditorOpen && "hide-element"}`}>{`${values.name || currentUser.name}`}</p>
          <input
            autoComplete="off"
            type="text"
            name="name"
            id="input-name"
            className={`profile__hidden-input ${!isEditorOpen && "hide-element"}`}
            required
            minLength="2"
            maxLength="30"
            value={values.name || ""}
            onChange={handleChange}
            pattern="[A-Za-zА-ЯЁа-яё -]+"
          />
          {!isValid && <span className="form__input-edit-error">{errors.name}</span>}
        </div>

        <div className="profile__border"></div>

        <div className="profile__container">
          <p className="profile__data">E-mail</p>
          <p className={`profile__data ${isEditorOpen && "hide-element"}`}>{`${values.email || currentUser.email}`}</p>
          <input
            autoComplete="off"
            type="email"
            name="email"
            id="input-email"
            className={`profile__hidden-input ${!isEditorOpen && "hide-element"}`}
            required minLength="2"
            maxLength="30"
            value={values.email || ""}
            onChange={handleChange}
          />
          {!isValid && <span className="form__input-edit-error">{errors.email}</span>}
        </div>

        {!!errorMessage && <span className="form__server-error">{errorMessage}</span>}
        <button type="submit" className={`form__button hover-button ${!isEditorOpen && "hide-element"}`} disabled={!isValid}>Сохранить</button>

      </form>

      <button className={`profile__edit hover-link ${isEditorOpen && "hide-element"}`} onClick={onSave}>Редактировать</button>
      <button className={`profile__exit hover-link ${isEditorOpen && "hide-element"}`} onClick={onExitClick}>Выйти из аккаунта</button>
    </div>
  )
};

export default Profile;