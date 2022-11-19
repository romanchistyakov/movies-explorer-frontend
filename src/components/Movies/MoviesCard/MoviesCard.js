import React from "react";
import './MoviesCard.css';
import {MOVIES_URL} from '../../../utils/MoviesApi';
import { useLocation } from 'react-router-dom';
import savedIcon from '../../../images/saved.svg';
import deleteIcon from '../../../images/delete.svg';

function MoviesCard({movie, children, onLikeClick, isMovieSaved}) {
  const location = useLocation();

  const isMoviesPage = (location.pathname === '/movies')

  const durationHours = Math.trunc(movie.duration/60);
  const durationMinuts = movie.duration%60;

  function handleLikeClick() {
    onLikeClick(movie);
  }

  return (
    <li className="moviescard">
      {isMoviesPage
      ? <button type="button" className={`moviescard__saved ${isMovieSaved  && "saved"}`} onClick={handleLikeClick}>
          {isMovieSaved ? <img src={savedIcon} alt="Иконка"/> : "Сохранить"}
        </button>
      : <button type="button" className="moviescard__delete" onClick={handleLikeClick}>
          <img src={deleteIcon} alt="Иконка"/>
        </button>
      }
      <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img src={`${MOVIES_URL}${movie.image.url}`} alt={movie.nameRU} className="moviescard__image"/>
      </a>
      <h2 className="moviescard__name">{movie.nameRU}</h2>
      <p className="moviescard__time">{`${durationHours!==0 ? `${durationHours}ч ` : ""}${durationMinuts}м`}</p>
    </li>
  )
}

export default MoviesCard;