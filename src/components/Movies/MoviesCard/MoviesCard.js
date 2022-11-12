import React from "react";
import './MoviesCard.css';

function MoviesCard({movie, children}) {
  return (
    <li className="moviescard">
      {children}
      <img src={movie.image} alt={movie.nameRU} className="moviescard__image"/>
      <h2 className="moviescard__name">{movie.nameRU}</h2>
      <p className="moviescard__time">{movie.duration}</p>
    </li>
  )
}

export default MoviesCard;