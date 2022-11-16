import {React, useState} from "react";
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import savedIcon from '../../images/saved.svg';

import temporaryMoviesList from '../../utils/temporaryMoviesList';

function Movies() {
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function handleSaving() {
    setIsMovieSaved(!isMovieSaved);
  }

  return (
    <div className="movies">
      <Header/>
      <SearchForm/>
      <MoviesCardList movies={temporaryMoviesList}>
        <button type="button" className={`moviescard__saved ${isMovieSaved  && "saved"}`} onClick={handleSaving}>
            {isMovieSaved ? <img src={savedIcon} alt="Иконка"/> : "Сохранить"}
        </button>
      </MoviesCardList>
      <Footer/>
    </div>
  )
}
export default Movies;