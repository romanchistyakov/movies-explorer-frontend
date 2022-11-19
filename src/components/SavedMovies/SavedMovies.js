import React from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import deleteIcon from '../../images/delete.svg';
import useForm from "../../hooks/useForm";
import Preloader from '../Movies/Preloader/Preloader';

function SavedMovies({loggedIn, onLikeClick, searchError, isLoading, movies, findMovies, onClickMoreButton, isMoreButtonVisible, isShortFilmEnabled, onSwitchClick}) {
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();

    findMovies(values.searchString);
  }

  return (
    <div className="saved-movies">
      <Header isLogged={loggedIn}/>
      <SearchForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={values}
        isShortFilmEnabled={isShortFilmEnabled}
        onSwitchClick={onSwitchClick}
      />
      {isLoading && <Preloader/>}
      {searchError && <p className="movies__error">{searchError}</p>}
      {!!movies.length && <MoviesCardList
        movies={movies}
        onClick={onClickMoreButton}
        isMoreButtonVisible={isMoreButtonVisible}
        onLikeClick={onLikeClick}
      >
      </MoviesCardList>}
      <Footer/>
    </div>
  )
}

export default SavedMovies;