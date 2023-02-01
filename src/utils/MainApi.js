export const BASE_URL = 'http://localhost:3001';

const _fetchRoutine = (res) => {
    if(res.ok) {
        return res.json();
    }
    else {
        return Promise.reject(res)
    }
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password})
    })
    .then(_fetchRoutine)
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(_fetchRoutine)
}

export const edit = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({name, email})
  })
  .then(_fetchRoutine)
}

export const authorize = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    }
  })
  .then(_fetchRoutine)
}

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(_fetchRoutine)
}

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(movie)
  })
  .then(_fetchRoutine)
}

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    },
  })
  .then(_fetchRoutine)
}