import { React, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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

function App() {
  const history = useHistory();
  const ref = useRef();

  function handleExitProfileClick() {
    history.push('/');
  }

  function handleProfilePageTemporary() {
    history.push('/profile');
  }

  function scrollToSection () {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth"
    })
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/signin">
          <Login
            onEnterClick={handleProfilePageTemporary}
          />
        </Route>

        <Route path="/signup">
          <Register
            onEnterClick={handleProfilePageTemporary}
          />
        </Route>

        <Route exact path="/">
          <Header isMain={true}/>
          <Promo clickAbout={scrollToSection}/>
          <AboutProject ref={ref}/>
          <Techs/>
          <AboutMe/>
          <Portfolio/>
          <Footer/>
        </Route>

        <Route path="/profile">
          <Profile
            name="Роман"
            email="pochta@yandex.ru"
            onExitClick={handleExitProfileClick}
          />
        </Route>

        <Route path="/movies">
          <Movies/>
        </Route>

        <Route path="/saved-movies">
          <SavedMovies/>
        </Route>

        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
