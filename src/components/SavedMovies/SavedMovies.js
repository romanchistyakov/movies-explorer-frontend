import React from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import deleteIcon from '../../images/delete.svg';

import temporaryMoviesList from '../../utils/temporaryMoviesList';

function SavedMovies() {
  return (
    <div className="saved-movies">
      <Header/>
      <SearchForm/>
      <MoviesCardList movies={temporaryMoviesList}>
        <button type="button" className="moviescard__delete"><img src={deleteIcon} alt="Иконка"/></button>
      </MoviesCardList>
      <Footer/>
    </div>
  )
}

export default SavedMovies;