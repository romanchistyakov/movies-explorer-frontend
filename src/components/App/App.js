import { React, useRef, useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Promo from '../Main/Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import * as mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import Preloader from '../Movies/Preloader/Preloader';
import {MOVIES_URL} from '../../utils/MoviesApi';
import {getMoviesList} from '../../utils/MoviesApi';

function App() {
  const history = useHistory();
  const ref = useRef();
  const location = useLocation();
  const [messageError, setMessageError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [editorOpen, setEditorOpen] = useState(false);
  const [movies, setMovies] = useState(() => {
    if (localStorage.getItem('movies')) {
      return JSON.parse(localStorage.getItem('movies'));
    } else {return []}
  });
  const [moviesFiltered, setMoviesFiltered] = useState(() => {
    if (localStorage.getItem('moviesFiltered')) {
      return JSON.parse(localStorage.getItem('moviesFiltered'));
    } else {return []}
  });
  const [moviesFilteredToList, setMoviesFilteredToList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([]);
  const [savedMoviesFilteredToList, setSavedMoviesFilteredToList] = useState([]);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [secondIndex, setSecondIndex] = useState(12);
  const [cardsStep, setCardsStep] = useState(3);
  const [isShortFilmEnabled, setIsShortFilmEnabled] = useState(false);
  const [isShortFilmSavedPageEnabled, setIsShortFilmSavedPageEnabled] = useState(false);
  const errorType = {
    notFound : "Ничего не найдено",
    error : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  }

  useEffect(() => {
    setSearchError('');
  },[location.pathname])

  function handleEditor() {
    setEditorOpen(!editorOpen);
  }

  function resetError() {
    setMessageError('');
  }

  function scrollToSection () {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth"
    })
  }

  function handleRegister(data) {
    mainApi.register(data.name, data.email, data.password)
    .then(() => {
      handleLogin(data);
    })
    .catch((error) => {
      if(error.status === 409) {
        setMessageError('Пользователь с таким email уже существует');
      } else {
        setMessageError('При регистрации пользователя произошла ошибка');
      }
    })
  }

  function handleLogin(data) {
    mainApi.login(data.email, data.password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        return res;
      }
    })
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        setCurrentUser(res);
        history.push('/movies');
      }
    })
    .catch((error) => {
      if (error.status === 401) {
        setMessageError('Вы ввели неправильный email или пароль');
      } else if (error.status === 400) {
        setMessageError('При авторизации произошла ошибка. Неверный формат email или пароля');
      } else {
        setMessageError('При авторизации произошла ошибка');
      }
    })
  }

  function handleEdit(data) {
    mainApi.edit(data.name, data.email)
    .then((res) => {
      if(res) {
        setCurrentUser(res);
      }
    })
    .then(() => setEditorOpen(false))
    .catch((error) => {
      if(error.status === 409) {
        setMessageError('Пользователь с таким email уже существует');
      } else {
        setMessageError('При обновлении профиля произошла ошибка');
      }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (loggedIn && token) {

      mainApi.authorize(token)
      .then((res) => {
        setCurrentUser(res);
        setMessageError('');
      })
      .catch(console.log)

      mainApi.getMovies()
      .then((movies) => {
        if(movies.length) {
          setSavedMovies(movies);
        }
        // return movies;
      })
      // .then(setSavedMoviesFiltered)
      .catch(console.log)
    }
  },[loggedIn])

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.authorize(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
        }
      })
      .then(() => {
        if (location.pathname==='/signin' || location.pathname==='/signup') {
          history.push('/movies');
        }
      })
      .catch(console.log)
    }
  }

  useEffect(() => {
    tokenCheck();
    if (localStorage.getItem('switchShort')) {
      setIsShortFilmEnabled(localStorage.getItem('switchShort') === 'true');
    }
    resizeMovieList();
  },[])

  function tokenDelete() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('./');
  }

  function handleLikeClick(movie) {
    const isSaved = (savedMovies.some(element => element.movieId === movie.id) || movie._id)

    if (!isSaved) {
      mainApi.saveMovie({
        'country': movie.country,
        'director': movie.director,
        'duration': movie.duration,
        'year': movie.year,
        'description': movie.description,
        'image': `${MOVIES_URL}${movie.image.url}`,
        'trailerLink': movie.trailerLink,
        'nameRU': movie.nameRU,
        'nameEN': movie.nameEN,
        'thumbnail': `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
        'movieId': movie.id
      })
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch(console.log)
    } else {
      let savedElement = ''
      if (movie._id) {
        savedElement = movie;
      } else {
        savedElement = savedMovies.find(element => element.movieId === movie.id)
      }
      mainApi.deleteMovie(savedElement._id)
      .then(() => {
        setSavedMovies((state) => state.filter(c => c._id !== savedElement._id))
      })
      .catch(console.log)
    }
  }

  function resizeMovieList() {
    if (window.innerWidth < 1280) {
      setSecondIndex(8);
      setCardsStep(2);
    } else {
      setSecondIndex(12);
      setCardsStep(3);
    }
    if (window.innerWidth < 769) {
      setSecondIndex(5);
    }
  }

  function onClickMoreButton() {
    setSecondIndex(secondIndex + cardsStep);
  }

  function findMovies(searchString) {
    resizeMovieList()
    localStorage.setItem('searchString', searchString);
    localStorage.setItem('switchShort', isShortFilmEnabled);
    setSearchError('');
    setIsLoading(true);

    if(!movies.length) {
      getMoviesList()
      .then((movies) => {
        if (movies.length) {
          setMovies(movies);
          localStorage.setItem('movies', JSON.stringify(movies));
        }
      })
      .catch((error) => {
        console.log(error);
        setSearchError(errorType.error);
      })
      .finally(() => setIsLoading(false))
    }

    let filteredMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(searchString.toLowerCase()));
    if(filteredMovies.length) {
      filteredMovies = (isShortFilmEnabled ? filteredMovies.filter(movie => movie.duration <= 40) : filteredMovies);
      if (filteredMovies.length) {
        setMoviesFiltered(filteredMovies);
      } else {
        setSearchError(errorType.notFound);
        setMoviesFiltered([]);
      }
    } else {
      setSearchError(errorType.notFound);
      setMoviesFiltered([]);
    }
    setIsLoading(false);
  }

  function findSavedMovies(searchString) {
    resizeMovieList()
    setSearchError('');
    setIsLoading(true);
    let filteredMovies = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchString.toLowerCase()));
    if(filteredMovies.length) {
      filteredMovies = (isShortFilmSavedPageEnabled ? filteredMovies.filter(movie => movie.duration <= 40) : filteredMovies);
      if(filteredMovies.length) {
        setSavedMoviesFiltered(filteredMovies);
      } else {
        setSearchError(errorType.notFound);
        setSavedMoviesFiltered([])
      }
    } else {
      setSearchError(errorType.notFound);
      setSavedMoviesFiltered([])
    }
    setIsLoading(false);
  }

  useEffect(() => {
    localStorage.setItem('moviesFiltered', JSON.stringify(moviesFiltered));
    setMoviesFilteredToList(moviesFiltered.slice(0, secondIndex));
    if(moviesFiltered.length && secondIndex < moviesFiltered.length) {
      setIsMoreButtonVisible(true)
    } else {
      setIsMoreButtonVisible(false)
    }
  }, [moviesFiltered, secondIndex])

  useEffect(() => {
    setSavedMoviesFilteredToList(savedMoviesFiltered);
  },[savedMoviesFiltered])

  useEffect(() => {
    setSavedMoviesFilteredToList(savedMovies);
  }, [savedMovies])

  function onSwitchClick() {
    setIsShortFilmEnabled(!isShortFilmEnabled);
  }

  function onSwitchSavedPageClick() {
    console.log(isShortFilmSavedPageEnabled)
    setIsShortFilmSavedPageEnabled(!isShortFilmSavedPageEnabled)
  }

  function resetSwitch() {
    if (localStorage.getItem('switchShort')) {
      setIsShortFilmEnabled(localStorage.getItem('switchShort') === 'true');
    }
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>

        <Switch>

          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              errorMessage={messageError}
              resetError={resetError}
            />
          </Route>

          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              errorMessage={messageError}
              resetError={resetError}
            />
          </Route>

          <Route exact path="/">
            <Header
              isMain={true}
              isLogged={loggedIn}
            />
            <Promo clickAbout={scrollToSection}/>
            <AboutProject ref={ref}/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
            <Footer/>
          </Route>

          {loggedIn ? <ProtectedRoute
            exact path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onExitClick={tokenDelete}
            onEdit={handleEdit}
            errorMessage={messageError}
            resetError={resetError}
            onSave={handleEditor}
            isEditorOpen={editorOpen}
          /> : <Preloader/>}

          {loggedIn ? <ProtectedRoute
            exact path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={moviesFilteredToList}
            onLikeClick={handleLikeClick}
            searchError={searchError}
            isLoading={isLoading}
            findMovies={findMovies}
            onClickMoreButton={onClickMoreButton}
            isMoreButtonVisible={isMoreButtonVisible}
            isShortFilmEnabled={isShortFilmEnabled}
            onSwitchClick={onSwitchClick}
            resetSwitch={resetSwitch}
            savedMovies={savedMovies}
          /> : <Preloader/>}

          {loggedIn ? <ProtectedRoute
            exact path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            movies={savedMoviesFilteredToList}
            onLikeClick={handleLikeClick}
            searchError={searchError}
            isLoading={isLoading}
            findSavedMovies={findSavedMovies}
            isShortFilmSavedPageEnabled={isShortFilmSavedPageEnabled}
            onSwitchSavedPageClick={onSwitchSavedPageClick}
            resetSwitch={resetSwitch}
          /> : <Preloader/>}

          <Route path="*">
            <PageNotFound/>
          </Route>

        </Switch>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
