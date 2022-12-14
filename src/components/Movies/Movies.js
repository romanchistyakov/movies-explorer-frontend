import {React, useEffect} from "react";
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import useForm from "../../hooks/useForm";
import Preloader from './Preloader/Preloader';

function Movies({
    loggedIn,
    onLikeClick,
    searchError,
    isLoading,
    movies,
    findMovies,
    onClickMoreButton,
    isMoreButtonVisible,
    isShortFilmEnabled,
    onSwitchClick,
    savedMovies
    })
    {
      const {values, handleChange, errors, isValid, setValues} = useForm({})

  useEffect(() => {
    if (localStorage.getItem('searchString')) {
      setValues({searchString: localStorage.getItem('searchString')});
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    findMovies(values.searchString)
  }

  return (
    <div className="movies">
      <Header isLogged={loggedIn}/>
      <SearchForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={values}
        isShortFilmEnabled={isShortFilmEnabled}
        onSwitchClick={onSwitchClick}
        isValid={isValid}
        errors={errors}
      />
      {isLoading && <Preloader/>}
      {searchError && <p className="movies__error">{searchError}</p>}
      {!!movies.length && <MoviesCardList
        movies={movies}
        onClick={onClickMoreButton}
        isMoreButtonVisible={isMoreButtonVisible}
        onLikeClick={onLikeClick}
        savedMovies={savedMovies}
      />}
      <Footer/>
    </div>
  )
}
export default Movies;