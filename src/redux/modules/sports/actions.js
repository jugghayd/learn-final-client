import 'isomorphic-fetch';
import { reset, SubmissionError } from 'redux-form';

/* action creators */

const API_URL = process.env.REACT_APP_API_URL;

export const getSportsSuccess = sports => {
  return {
    type: 'GET_SPORTS_SUCCESS',
    sports: sports
  }
}


// Async actions - connect to Rails API

export const getSports = () => {
  return dispatch => {
    return fetch(`${API_URL}/sports`)
      .then(response => response.json())
      .then(sports => dispatch(getSportsSuccess(sports)))
      .catch(error => console.log(error));
  }
}

export const addSport = (sportDetails) => {
  return dispatch => {
    return fetch(`${API_URL}/sports`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer: " + localStorage.getItem('team.schedule.token')
      },
      body: JSON.stringify({sport: sportDetails})
    })
      .then(response => response.json())
      .then(sports => {
        dispatch(getSportsSuccess(sports));
        dispatch(reset('addSport'));
      })
      .catch(err => {
        throw new SubmissionError(err);
      })
  }
}

export const deleteSport = (sportId) => {
  return dispatch => {
    return fetch(`${API_URL}/sports/${sportId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer: " + localStorage.getItem('team.schedule.token')
      }
    })
      .then(response => response.json())
      .then(sports => dispatch(getSportsSuccess(sports)))
      .catch(error => console.log(error))
  }
}