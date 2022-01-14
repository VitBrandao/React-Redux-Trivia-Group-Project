import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    // assertions: '',
    // score: '',
    gravatarEmail: '',
  },
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN:
    return {
      ...state,
      player: {
        ...action.payload,
      },
    };
  default:
    return state;
  }
};

export default login;
