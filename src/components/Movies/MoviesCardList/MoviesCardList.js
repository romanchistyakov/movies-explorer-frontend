import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, children}) {
  return (
    <section className="moviescard-list">
      <ul className="moviescard-list__grid">
        {movies.map((item) => {
          return (
            <MoviesCard
              key={item._id}
              movie={item}
              children={children}
            />
          )
        })}
      </ul>
      <button className="moviescard-list__button hover-button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;