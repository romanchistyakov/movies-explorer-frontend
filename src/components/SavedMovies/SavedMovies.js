import React, { useEffect } from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import useForm from "../../hooks/useForm";
import Preloader from '../Movies/Preloader/Preloader';

function SavedMovies({
  loggedIn,
  onLikeClick,
  searchError,
  isLoading,
  movies,
  findSavedMovies,
  isShortFilmSavedPageEnabled,
  onSwitchSavedPageClick,
  resetSwitch}) {

    const {values, handleChange, errors, isValid} = useForm({})

    function handleSubmit(e) {
      e.preventDefault();
      findSavedMovies(values.searchString)
    }

    useEffect(() => {
      resetSwitch();
    },[])

  return (
    <div className="saved-movies">
      <Header isLogged={loggedIn}/>
      <SearchForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={values}
        isShortFilmEnabled={isShortFilmSavedPageEnabled}
        onSwitchClick={onSwitchSavedPageClick}
        isValid={isValid}
        errors={errors}
      />
      {isLoading && <Preloader/>}
      {searchError && <p className="movies__error">{searchError}</p>}
      {!!movies.length && <MoviesCardList
        movies={movies}
        isMoreButtonVisible={false}
        onLikeClick={onLikeClick}
      >
      </MoviesCardList>}
      <Footer/>
    </div>
  )
}

export default SavedMovies;