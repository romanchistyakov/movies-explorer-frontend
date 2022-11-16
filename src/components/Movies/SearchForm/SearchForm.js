import { React, useState } from "react";
import './SearchForm.css';
import switchOn from '../../../images/switch-on.svg';
import switchOff from '../../../images/switch-off.svg';

function SearchForm() {

  const [isShortFilmEnabled, setIsShortFilmEnabled] = useState(false);

  function handleSwitch() {
    setIsShortFilmEnabled(!isShortFilmEnabled);
  }

  return (
    <section className="search-form">
      <form className="serch-form__form">
        <input
          autoComplete="off"
          type="text"
          name="movie"
          id="input-movie"
          className="search-form__input"
          placeholder="Фильм"
        />
        <button type="submit" className="search-form__button hover-button">Найти</button>
      </form>
      <div className="search-form__container">
        <button className="search-from__switch-short" onClick={handleSwitch}>
          <img src={isShortFilmEnabled ? switchOn : switchOff} alt="Иконка"/>
        </button>
        <p className="search-form__subtitle">Короткометражки</p>
      </div>
      <div className="search-form__border"></div>
    </section>
  )
}

export default SearchForm;