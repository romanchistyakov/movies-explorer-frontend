import {React, useRef, useState, useEffect} from 'react';
import {Route, Link, NavLink } from 'react-router-dom';
import './Header.css'
import logo from '../../images/logo.svg'
import profile from '../../images/profile.svg';
import menu from '../../images/menu.svg'
import cross from '../../images/cross.svg'
import useOnClickOutside from '../../hooks/useOnClickOutside';

function Header({isMain, isLogged}) {
  const [isNavbarOpen, setIsNavbarOpen] = useState();
  const ref = useRef();

  function handleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  function closeNavbar() {
    setIsNavbarOpen(false);
  }

  useOnClickOutside(ref, closeNavbar);

  useEffect(() => {
    function closeByEscape(e) {
      if(e.key === 'Escape') {
        closeNavbar();
      }
    }
    if(isNavbarOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isNavbarOpen])

  return (
    <header className={`header ${isMain && "header__style_main"}`}>

      <Link to="/" className="header__logo hover-link">
        <img src={logo} alt="Иконка"/>
      </Link>

      {isLogged && <Route>
        <div className='header__container'>
          <NavLink to="/movies" className="header__movies hover-link" activeClassName="current-page">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="header__saved hover-link" activeClassName="current-page">Сохранённые фильмы</NavLink>
        </div>
        <div className='header__container'>
          <Link to="/profile" className="header__profile hover-link">Аккаунт</Link>
          <Link to="/profile" className="header__icon hover-link">
            <img src={profile} alt="Иконка профиля"/>
          </Link>
        </div>
        <button className="header__vertical-menu-button hover-button" onClick={handleNavbar}>
          <img src={menu} alt="Иконка"/>
        </button>
      </Route>}

      {!isLogged && <Route>
        <Link to="/signup" className="header__link hover-link">Регистрация</Link>
        <Link to="/signin" className="header__link hover-button"><button className="header__button">Войти</button></Link>
      </Route>}


      <div className={`header__navbar-popup ${isNavbarOpen && "header__navbar_opened"}`}>
        <div className="header__navbar" ref={ref}>
          <img src={cross} alt="Иконка закрыть меню" className="header__navbar-cross hover-button" onClick={closeNavbar}/>
          <Link to="/" className="header__navlink">Главная</Link>
          <NavLink to="/movies" className="header__navlink" activeClassName="current-page">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="header__navlink" activeClassName="current-page">Сохранённые фильмы</NavLink>
          <div className='header__navbar-container'>
            <Link to="/profile" className="header__profile hover-link">Аккаунт</Link>
            <Link to="/profile" className="header__icon hover-link"><img src={profile} alt="Иконка профиля" /></Link>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header;