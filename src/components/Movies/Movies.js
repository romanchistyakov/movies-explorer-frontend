import {React, useState, useEffect} from "react";
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import useForm from "../../hooks/useForm";
import Preloader from './Preloader/Preloader';

function Movies({loggedIn, onLikeClick, searchError, isLoading, movies, findMovies, onClickMoreButton, isMoreButtonVisible, isShortFilmEnabled, onSwitchClick}) {
  // const errorType = {
  //   notFound : "Ничего не найдено",
  //   error : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  // }

  // const [searchError, setSearchError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  // const [movies, setMovies] = useState([]);
  // const [moviesToList, setMoviesToList] = useState([]);
  // const [secondIndex, setSecondIndex] = useState(12);
  // const [cardsStep, setCardsStep] = useState(3);
  // const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const {values, handleChange, setValues} = useForm({});
  // const [isShortFilmEnabled, setIsShortFilmEnabled] = useState(false);

  // function onSwitchClick() {
  //   setIsShortFilmEnabled(!isShortFilmEnabled);
  //   localStorage.setItem('switchShort', !isShortFilmEnabled);
  // }

  function handleSaving() {
    setIsMovieSaved(!isMovieSaved);
  }

  // function resizeMovieList() {
  //   if (window.innerWidth < 1280) {
  //     setSecondIndex(8);
  //     setCardsStep(2);
  //   } else {
  //     setSecondIndex(12);
  //     setCardsStep(3);
  //   }
  //   if (window.innerWidth < 769) {
  //     setSecondIndex(5);
  //   }
  // }

  useEffect(() => {
    if (localStorage.getItem('searchString')) {
      setValues({searchString: localStorage.getItem('searchString')});
    }
    // if (localStorage.getItem('switchShort')) {
    //   setIsShortFilmEnabled(localStorage.getItem('switchShort') === 'true');
    // }
    // resizeMovieList()
  }, [])

  // useEffect(() => {

  //   const filteredMovies = (isShortFilmEnabled ? movies.filter(movie => movie.duration <= 40) : movies);

  //   setMoviesToList(filteredMovies.slice(0, secondIndex));

  //   if(filteredMovies.length && secondIndex < filteredMovies.length) {
  //     setIsMoreButtonVisible(true)
  //   } else {
  //     setIsMoreButtonVisible(false)
  //   }

  // }, [movies, secondIndex, isShortFilmEnabled])

  // function onClickMoreButton() {
  //   setSecondIndex(secondIndex + cardsStep);
  // }

  function handleSubmit(e) {
    e.preventDefault()

    findMovies(values.searchString)

    // resizeMovieList()
    // localStorage.setItem('searchString', values.searchString);

    // setSearchError('');
    // setIsLoading(true);
    // setMovies([]);

    // getMoviesList()
    // .then((movies) => movies.filter(movie => movie.nameRU.toLowerCase().includes(values.searchString.toLowerCase())))
    // .then((movies) => {
    //   if(movies.length){
    //     setMovies(movies);
    //     localStorage.setItem('movies', JSON.stringify(movies));
    //   } else {
    //     setSearchError(errorType.notFound);
    //     localStorage.removeItem('movies');
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    //   setSearchError(errorType.error);
    // })
    // .finally(() => setIsLoading(false))
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
      />
      {isLoading && <Preloader/>}
      {searchError && <p className="movies__error">{searchError}</p>}
      {!!movies.length && <MoviesCardList
        movies={movies}
        onClick={onClickMoreButton}
        isMoreButtonVisible={isMoreButtonVisible}
        onLikeClick={onLikeClick}
      />}
        {/* <button type="button" className={`moviescard__saved ${isMovieSaved  && "saved"}`} onClick={onLikeClick}>
            {isMovieSaved ? <img src={savedIcon} alt="Иконка"/> : "Сохранить"}
        </button> */}

      <Footer/>
    </div>
  )
}
export default Movies;