import {React, useState, useEffect } from "react";
import './Profile.css';
import Header from '../Header/Header';
import useForm from '../../hooks/useForm';

function Profile({name, email, onExitClick}) {
  const [isEditorHidden, setIsEditorHidden] = useState(false);
  const {values, handleChange, setValues} = useForm({});

  useEffect(() => {
    setValues({name : values.name, email : values.email});
    }, [isEditorHidden]
  );

  function hadleHiddenElement() {
    setIsEditorHidden(!isEditorHidden);
  }

  function handleSaveClick(e) {
    e.preventDefault();
    hadleHiddenElement();
  }

  return (
    <div className="profile">
      <Header isMain={false}/>
      <h1 className="profile__title">{`Привет, ${name}`}</h1>

      <form className="profile__form" onSubmit={handleSaveClick}>
        <div className="profile__container">
          <p className="profile__data">Имя</p>
          <p className={`profile__data ${isEditorHidden && "hide-element"}`}>{`${values.name || name}`}</p>
          <input
            autoComplete="off"
            type="text"
            name="name"
            id="input-name"
            className={`profile__hidden-input ${!isEditorHidden && "hide-element"}`}
            placeholder={name}
            required minLength="2"
            maxLength="30"
            value={values.name || name}
            onChange={handleChange}
          />
        </div>
        <div className="profile__border"></div>
        <div className="profile__container">
          <p className="profile__data">E-mail</p>
          <p className={`profile__data ${isEditorHidden && "hide-element"}`}>{`${values.email || email}`}</p>
          <input
            autoComplete="off"
            type="email"
            name="email"
            id="input-email"
            className={`profile__hidden-input ${!isEditorHidden && "hide-element"}`}
            placeholder={email}
            required minLength="2"
            maxLength="30"
            value={values.email || email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={`form__button hover-button ${!isEditorHidden && "hide-element"}`}>Сохранить</button>
      </form>

      <button className={`profile__edit hover-link ${isEditorHidden && "hide-element"}`} onClick={hadleHiddenElement}>Редактировать</button>
      <button className={`profile__exit hover-link ${isEditorHidden && "hide-element"}`} onClick={onExitClick}>Выйти из аккаунта</button>
    </div>
  )
};

export default Profile;