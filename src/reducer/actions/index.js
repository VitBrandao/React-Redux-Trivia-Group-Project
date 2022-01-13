import { ADD_LOGIN } from '../reducers/login';

const loginAction = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

export default loginAction;
