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
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [secondIndex, setSecondIndex] = useState(12);
  const [cardsStep, setCardsStep] = useState(3);
  const [isShortFilmEnabled, setIsShortFilmEnabled] = useState(false);
  const [moviesToList, setMoviesToList] = useState([]);
  const errorType = {
    notFound : "Ничего не найдено",
    error : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  }

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

    if (localStorage.getItem('movies')) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }

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

  function findMovies(searchString) {
    resizeMovieList()
    localStorage.setItem('searchString', searchString);

    setSearchError('');
    setIsLoading(true);
    setMovies([]);

    getMoviesList()
    .then((movies) => movies.filter(movie => movie.nameRU.toLowerCase().includes(searchString.toLowerCase())))
    .then((movies) => {
      if(movies.length){
        setMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      } else {
        setSearchError(errorType.notFound);
        localStorage.removeItem('movies');
      }
    })
    .catch((error) => {
      console.log(error);
      setSearchError(errorType.error);
    })
    .finally(() => setIsLoading(false))
  }

  function onClickMoreButton() {
    setSecondIndex(secondIndex + cardsStep);
  }

  useEffect(() => {

    const filteredMovies = (isShortFilmEnabled ? movies.filter(movie => movie.duration <= 40) : movies);

    setMoviesToList(filteredMovies.slice(0, secondIndex));

    if(filteredMovies.length && secondIndex < filteredMovies.length) {
      setIsMoreButtonVisible(true)
    } else {
      setIsMoreButtonVisible(false)
    }

  }, [movies, secondIndex, isShortFilmEnabled])

  function onSwitchClick() {
    setIsShortFilmEnabled(!isShortFilmEnabled);
    localStorage.setItem('switchShort', !isShortFilmEnabled);
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
            movies={moviesToList}
            onLikeClick={handleLikeClick}
            searchError={searchError}
            isLoading={isLoading}
            findMovies={findMovies}
            onClickMoreButton={onClickMoreButton}
            isMoreButtonVisible={isMoreButtonVisible}
            isShortFilmEnabled={isShortFilmEnabled}
            onSwitchClick={onSwitchClick}
          /> : <Preloader/>}

          {loggedIn ? <ProtectedRoute
            exact path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            movies={savedMovies}
            onLikeClick={handleLikeClick}
            searchError={searchError}
            isLoading={isLoading}
            findMovies={findMovies}
            onClickMoreButton={onClickMoreButton}
            isMoreButtonVisible={isMoreButtonVisible}
            isShortFilmEnabled={isShortFilmEnabled}
            onSwitchClick={onSwitchClick}
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
