import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, onClick, isMoreButtonVisible, onLikeClick}) {

  return (
    <section className="moviescard-list">
      <ul className="moviescard-list__grid">
        {movies.map((item) => {
            return (
              <MoviesCard
                key={item.id}
                movie={item}
                onLikeClick={onLikeClick}
              />
            )
        })}
      </ul>
      {isMoreButtonVisible && <button className="moviescard-list__button hover-button" onClick={onClick}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;