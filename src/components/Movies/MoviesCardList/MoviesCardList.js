import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, onClick, isMoreButtonVisible, onLikeClick, savedMovies}) {

  return (
    <section className="moviescard-list">
      <ul className="moviescard-list__grid">
        {movies.map((item) => {
            return (
              <MoviesCard
                key={item.id || item.movieId}
                movie={item}
                onLikeClick={onLikeClick}
                savedMovies={savedMovies}
              />
            )
        })}
      </ul>
      {isMoreButtonVisible && <button className="moviescard-list__button hover-button" onClick={onClick}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;