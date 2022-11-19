export const MOVIES_URL = 'https://api.nomoreparties.co';

const _fetchRoutine = (res) => {
  if(res.ok) {
      return res.json();
  }
  else {
      return Promise.reject(`Ошибка: ${res.status}`)
  }
}

export const getMoviesList = () => {
  return fetch(`${MOVIES_URL}/beatfilm-movies`)
  .then(_fetchRoutine)
}