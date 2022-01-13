import { ADD_LOGIN, GET_TOKEN } from '../reducers/login';

export const loginAction = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

export const tokenAction = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export function fetchToken() {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => dispatch(tokenAction(data)))
    .catch((error) => console.log(error));
}
