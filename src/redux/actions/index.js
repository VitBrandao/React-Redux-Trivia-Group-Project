import { ADD_LOGIN } from '../reducers/login';
import { GET_TOKEN } from '../reducers/token';

export const loginAction = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

export const tokenAction = (token) => ({
  type: GET_TOKEN,
  token,
});

export function fetchToken() {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => dispatch(tokenAction(data.token)))
    .catch((error) => console.log(error));
}
