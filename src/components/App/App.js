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
import {MOVIES_URL} from '../../utils/MoviesApi';
import {getMoviesList} from '../../utils/MoviesApi';

function App() {
  const history = useHistory();
  const ref = useRef();
  const location = useLocation();
  const [messageError, setMessageError] = useState('');
  const [loggedIn, setLoggedIn] = useState();
  const [currentUser, setCurrentUser] = useState({})
  const [editorOpen, setEditorOpen] = useState(false);
  const [movies, setMovies] = useState(() => {
    if (localStorage.getItem('movies')) {
      return JSON.parse(localStorage.getItem('movies'));
    } else {return []}
  });
  const [moviesFilteredAll, setMoviesFilteredAll] = useState(() => {
    if (localStorage.getItem('moviesFilteredAll')) {
      return JSON.parse(localStorage.getItem('moviesFilteredAll'));
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
    searchFormIsEmpty: "Нужно ввести ключевое слово",
    notFound : "Ничего не найдено",
    error : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  }

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    resizeMovieList();
  },[dimensions])

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
    .then(setMessageError('Данные успешно изменены'))
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
      .catch((error) => {
        console.log(error);
        tokenDelete();
      })
    } else {
      setLoggedIn(false);
    }
  }

  useEffect(() => {

    window.addEventListener("resize", handleResize, false);

    tokenCheck();

    if (localStorage.getItem('switchShort')) {
      setIsShortFilmEnabled(localStorage.getItem('switchShort') === 'true');
    }

    resizeMovieList();
  },[])

  function tokenDelete() {
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchString');
    localStorage.removeItem('switchShort');
    localStorage.removeItem('moviesFiltered');
    localStorage.removeItem('moviesFilteredAll');
    setMovies([]);
    setMoviesFiltered([]);
    setMoviesFilteredAll([]);
    setIsShortFilmEnabled([]);
    setSavedMoviesFiltered([]);
    setSavedMoviesFilteredToList([]);
    setIsShortFilmEnabled(false);
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
      .catch((error) => {
        console.log(error)
        if(error.statusCode === 401) {
          tokenDelete();
        }
      })
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
      .catch((error) => {
        console.log(error)
        if(error.statusCode === 401) {
          tokenDelete();
        }
      })
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
    setSearchError('');
    setMoviesFiltered([]);
    setMoviesFilteredToList([]);

    if(!searchString) {
      setSearchError(errorType.searchFormIsEmpty);
      setMoviesFiltered([]);
      setMoviesFilteredToList([]);
      return;
    }

    localStorage.setItem('searchString', searchString);
    localStorage.setItem('switchShort', isShortFilmEnabled);

    setIsLoading(true);

    if (!movies.length) {
      getMoviesList()
      .then((moviesFromServer) => {
        if (moviesFromServer) {
          setMovies(moviesFromServer);
          localStorage.setItem('movies', JSON.stringify(moviesFromServer));
          return moviesFromServer.filter(movie => movie.nameRU.toLowerCase().includes(searchString.toLowerCase()));
        } else {
          throw new Error(errorType.error)
        }
      })
      .then((moviesFromServer) => {
        if (moviesFromServer.length) {
          setMoviesFilteredAll(moviesFromServer);
          localStorage.setItem('moviesFilteredAll', JSON.stringify(moviesFromServer))
          return (isShortFilmEnabled ? moviesFromServer.filter(movie => movie.duration <= 40) : moviesFromServer);
        } else {
          throw new Error(errorType.notFound)
        }
      })
      .then((moviesFromServer) => {
        if (moviesFromServer.length) {
          setMoviesFiltered(moviesFromServer);
        } else {
          throw new Error(errorType.notFound)
        }
      })
      .catch((error) => {
        console.log(error);
        setSearchError(error.message);
      })
      .finally(() => setIsLoading(false))
    } else {
      let filteredMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(searchString.toLowerCase()));
      if (filteredMovies.length) {
        setMoviesFilteredAll(filteredMovies);
        localStorage.setItem('moviesFilteredAll', JSON.stringify(filteredMovies));
        filteredMovies = (isShortFilmEnabled ? filteredMovies.filter(movie => movie.duration <= 40) : filteredMovies);
        if (filteredMovies.length) {
          setMoviesFiltered(filteredMovies);
        } else {
          setSearchError(errorType.notFound);
        }
      } else {
        setSearchError(errorType.notFound);
      }
      setIsLoading(false);
    }
  }

  function findSavedMovies(searchString) {
    if(!searchString) {
      return;
    }
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

  useEffect(() => {
    if (isShortFilmEnabled) {
      setMoviesFiltered(moviesFilteredAll.filter(movie => movie.duration <= 40));
    } else {
      setMoviesFiltered(moviesFilteredAll);
    }
    resizeMovieList()
  },[isShortFilmEnabled])

  function onSwitchSavedPageClick() {
    setIsShortFilmSavedPageEnabled(!isShortFilmSavedPageEnabled)
  }

  function resetSwitchOnSavedMovies() {
    setIsShortFilmSavedPageEnabled(false)
  }

  useEffect(() => {
    setSavedMoviesFiltered(isShortFilmSavedPageEnabled ? savedMovies.filter(movie => movie.duration <= 40) : savedMovies)
    resizeMovieList()
  },[isShortFilmSavedPageEnabled])

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

          <ProtectedRoute
            exact path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onExitClick={tokenDelete}
            onEdit={handleEdit}
            errorMessage={messageError}
            resetError={resetError}
            onSave={handleEditor}
            isEditorOpen={editorOpen}
          />

          <ProtectedRoute
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
            savedMovies={savedMovies}
          />

          <ProtectedRoute
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
            resetSwitchOnSavedMovies={resetSwitchOnSavedMovies}
          />

          <Route path="*">
            <PageNotFound/>
          </Route>

        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
