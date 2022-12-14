import React from "react";
import './SearchForm.css';
import switchOn from '../../../images/switch-on.svg';
import switchOff from '../../../images/switch-off.svg';

function SearchForm({onChange, onSubmit, values, isShortFilmEnabled, onSwitchClick, isValid, errors}) {

  return (
    <section className="search-form">
      <form className="serch-form__form" onSubmit={onSubmit} noValidate>
        <input
          autoComplete="off"
          type="text"
          name="searchString"
          id="input-search-string"
          className="search-form__input"
          placeholder="Фильм"
          required
          minLength="1"
          value={values.searchString || ""}
          onChange={onChange}
        />
        {!isValid && <span className="search-form__input-error">{errors.searchString}</span>}
        <button type="submit" className="search-form__button hover-button">Найти</button>
      </form>
      <div className="search-form__container">
        <button className="search-from__switch-short" onClick={onSwitchClick}>
          <img src={isShortFilmEnabled ? switchOn : switchOff} alt="Иконка"/>
        </button>
        <p className="search-form__subtitle">Короткометражки</p>
      </div>
      <div className="search-form__border"></div>
    </section>
  )
}

export default SearchForm;